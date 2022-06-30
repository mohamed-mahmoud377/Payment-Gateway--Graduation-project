#
# @author Mahmoud Mohamed (Ozil)  <https://github.com/mmsaeed509>
#

<# Variables & Array #>

$WORKING_DIR = pwd # to work in right directory #


<# Array to store the needed directories to update their packages #>
$DIRECTORIES = @("apikey-manager","auth","checkout","customer","emailing","kms","manage-business","payment","tokenization")


Write-Host ""
Write-Host "##########################"
Write-Host "# Update Packages Script #"
Write-Host "##########################"
Write-Host ""

<# here we loop in all directories one by one and update their packages #>
foreach ($DIR in $DIRECTORIES) {

    cd $WORKING_DIR/$DIR && npm run update:common

}


cd $WORKING_DIR # Return to working directory #

Write-Host ""
Write-Host "#####################"
Write-Host "#      D O N E      #"
Write-Host "#####################"