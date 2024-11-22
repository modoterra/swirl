# Exit immediately if a command exits with a non-zero status
set -e

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to run a command and show loading indicator
run_command() {
    local cmd=$1
    local status=0
    local output=""
    if [ $VERBOSE -eq 1 ]; then
        print_message muted "Running: $cmd"
        print_new_line
        $cmd
        status=$?
    else
        output=$(mktemp)
        $cmd &> "$output" &

        local pid=$!
        local delay=0.1
        local spinner='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
        local i=0

        tput civis
        while kill -0 "$pid" 2>/dev/null; do
            i=$(( (i+1) % ${#spinner} ))
            printf "\r%s" "${spinner:$i:1}"
            sleep $delay
        done
        printf "\r\033[K"
        tput cnorm

        if wait "$pid"; then
            status=0
        else
            status=$?
        fi
    fi
    if [ $status -ne 0 ]; then
        print_message error "An error occured during installation."
        print_new_line
        print_message muted "$cmd"
        print_new_line
        if [[ -n "$output" ]]; then
            local message=$(cat "$output")
            print_message muted "$message"
            print_new_line
        fi
        exit $status
    fi
}

# Function to print messages
print_message() {
    local type=$1
    local message=$2
    case $type in
        welcome) printf "\033[1;34m%s\033[0m" "$message" ;;
        info) printf "\033[1;36m%s\033[0m" "$message" ;;
        warning) printf "\033[1;33m%s\033[0m" "$message" ;;
        error) printf "\033[1;31m%s\033[0m" "$message" ;;
        success) printf "\033[1;32m%s\033[0m" "$message" ;;
        prompt) printf "\033[1;35m%s\033[0m" "$message" ;;
        muted) printf "\033[2m%s\033[0m" "$message" ;;
    esac
}

# Function to print a new line
print_new_line() {
    printf "\n"
}

# Function to prompt for yes or no
prompt_yes_no() {
    local default=$1
    local response

    while true; do
        # Read a single character without requiring Enter key
        read -n 1 -s response
        response=${response:-$default}

        case $response in
            [Yy]*) print_new_line; return 0 ;;
            [Nn]*) print_new_line; return 1 ;;
        esac

        # Emit an error sound
        printf "\a"
    done
}

# Function to prompt for a string input
prompt_string() {
    local default=$1
    local response

    read -p "" response
    response=${response:-$default}
    echo "$response"
}

# Function to display help message
show_help() {
    echo "Usage: ./install.sh [options] [directory]"
    echo ""
    echo "Options:"
    echo "  -f, --force      Force overwrite if the directory already exists"
    echo "  -d, --dry        Install without additional dependencies"
    echo "  -v, --verbose    Enable verbose output"
    echo "  -u, --url        Custom URL for the git repository"
    echo "  -b, --branch     Custom branch for the git repository"
    echo "  -h, --help       Display this help message"
}

# Parse command line arguments
FORCE=0
DRY=0
VERBOSE=0
REPO_URL="https://github.com/modoterra/swirl.git"
BRANCH="stable"
INSTALL_DIR=""
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -f|--force) FORCE=1 ;;
        -d|--dry) DRY=1 ;;
        -v|--verbose) VERBOSE=1 ;;
        -u|--url) REPO_URL="$2"; shift ;;
        -b|--branch) BRANCH="$2"; shift ;;
        -h|--help) show_help; exit 0 ;;
        *) INSTALL_DIR="$1" ;;
    esac
    shift
done

# Welcome message
print_message welcome "Welcome to SWIRL. Let us begin your installation."
print_new_line

# Check if the user is ready to begin the installation

print_message prompt "Are you ready to begin the installation?"
print_message muted " → (y/n) "
if ! prompt_yes_no "y"; then
    print_message info "Installation aborted."
    print_new_line
    exit 0
fi

# Check for required commands
for cmd in git composer php npm; do
    if (! command_exists "$cmd"); then
        print_message error "$cmd is not installed."
        print_new_line
        exit 1
    fi
done

# Prompt the user for the installation directory if not provided
if [ -z "$INSTALL_DIR" ]; then
    print_message prompt "Where should we install SWIRL?"
    print_message muted " → "
    INSTALL_DIR=$(prompt_string "")
fi

# Check if the directory already exists
if [ -d "$INSTALL_DIR" ]; then
    if [ $FORCE -eq 1 ]; then
        print_message warning "Directory $INSTALL_DIR already exists. Overwriting..."
        print_new_line
        rm -rf "$INSTALL_DIR"
    else
        print_message error "Directory $INSTALL_DIR already exists."
        print_new_line
        exit 1
    fi
fi

print_message "info" "Installing SWIRL in \"$INSTALL_DIR\"..."
print_new_line

# Create the directory if it doesn't exist
mkdir -p "$INSTALL_DIR"

# Clone the repository
print_message info "Cloning the repository from $REPO_URL (branch: $BRANCH)..."
print_new_line
run_command "git clone --depth=1 --branch $BRANCH $REPO_URL $INSTALL_DIR"
run_command "rm -rf $INSTALL_DIR/.git"

if [ $DRY -eq 0 ]; then
    # Change to the installation directory
    cd "$INSTALL_DIR"

    # Install composer dependencies
    print_message info "Installing composer dependencies..."
    print_new_line
    run_command "composer install"

    # Install npm dependencies
    print_message info "Installing npm dependencies..."
    print_new_line
    run_command "npm install"

    # Copy .env.example to .env
    print_message info "Setting up environment variables..."
    print_new_line
    run_command "cp .env.example .env"

    # Install FrankenPHP
    print_message info "Installing Octane server..."
    print_new_line
    run_command "php artisan octane:install --server frankenphp -n"

    # Generate application key
    print_message info "Generating application key..."
    print_new_line
    run_command "php artisan key:generate"
fi

print_message success "Installation complete. Use \"cd $INSTALL_DIR\" to enter the directory and open the README.md to get started or go to https://swirl.mdtrr.com."
print_new_line

exit 0
