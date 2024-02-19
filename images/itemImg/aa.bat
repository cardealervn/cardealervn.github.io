@echo off
setlocal enabledelayedexpansion

set "outputFile=output.txt"

echo Listing all files and folders:

(
    for /r "%~dp0" %%i in (*) do (
        if not "%%~ni"=="" (
            set "currentFolder=%%~dpi"
            set "currentFolder=!currentFolder:%CD%\=!"
            echo !currentFolder:~0,-1!/%%~ni
        )
    )
) > "%outputFile%"

echo Results exported to "%outputFile%"
pause
