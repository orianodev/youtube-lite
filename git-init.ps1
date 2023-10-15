param(
    [string]$MESSAGE,
    [string]$PROJECT
)

# Step 1: Initialize a Git repository
git init

# Step 2: Add all files to the repository
git add .

# Step 3: Commit with the provided message
git commit -m $MESSAGE

# Step 4: Rename the default branch to "main" (if needed)
git branch -M main

# Step 5: Add the remote repository
git remote add origin https://github.com/oriano-dev/$PROJECT.git

# Step 6: Push to the remote repository
git push -u origin main
