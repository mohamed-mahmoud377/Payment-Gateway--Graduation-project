#
# @author Mahmoud Mohamed (Ozil)  <https://github.com/mmsaeed509>
#

<# Variables & Array #>

$WORKING_DIR = pwd # to work in right directory #

<# Array to store the needed directories to update their packages #>
$DIRECTORIES = @("apikey-manager","auth","checkout","customer","emailing","kms","manage-business","payment","tokenization")

Write-Host ""
Write-Host "##########################" -ForegroundColor DarkBlue
Write-Host "# Update Packages Script #" -ForegroundColor DarkBlue
Write-Host "##########################" -ForegroundColor DarkBlue
Write-Host ""

<# here we loop in all directories one by one and update their packages #>
foreach ($PACKAGES in $DIRECTORIES) {
    
    Write-Host " updating packages in $PACKAGES " -ForegroundColor Red
    cd $WORKING_DIR/$PACKAGES
    npm run update:common
    Write-Host "$PACKAGES packages updated successfully!" -ForegroundColor Green
    Write-Host ""

}


cd $WORKING_DIR # Return to working directory #

Write-Host ""
Write-Host "#####################" -ForegroundColor Green
Write-Host "#      D O N E      #" -ForegroundColor Green
Write-Host "#####################" -ForegroundColor Green