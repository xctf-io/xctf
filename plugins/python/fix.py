import os

def add_init_files(directory):
    for root, dirs, files in os.walk(directory):
        # Add '__init__.py' in each directory
        for d in dirs:
            init_file = os.path.join(root, d, '__init__.py')
            if not os.path.exists(init_file):
                open(init_file, 'a').close()
        # Ensure that current directory also gets '__init__.py'
        init_current_dir = os.path.join(root, '__init__.py')
        if not os.path.exists(init_current_dir):
            open(init_current_dir, 'a').close()

directory_path = './gen'
add_init_files(directory_path)
