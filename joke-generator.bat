@echo off
REM ============================================
REM Gerador de Piadas - Versão Windows Executável
REM ============================================

setlocal enabledelayedexpansion
color 0A
title Gerador de Piadas Aleatórias

:menu
cls
echo.
echo ====================================
echo   ^|^| GERADOR DE PIADAS ^|^|
echo ====================================
echo.
echo   1 - Piada Aleatória
echo   2 - Dad Joke (Piada de Pai)
echo   3 - 5 Piadas Aleatórias
echo   4 - Sair
echo.
echo ====================================
set /p choice="Escolha uma opcao (1-4): "

if "%choice%"=="1" goto random_joke
if "%choice%"=="2" goto dad_joke
if "%choice%"=="3" goto multiple_jokes
if "%choice%"=="4" exit
goto menu

:random_joke
cls
echo.
echo Carregando piada aleatória...
echo.
powershell -Command "$result = Invoke-WebRequest -Uri 'https://v2.jokeapi.dev/joke/Any?format=json&type=single' -UseBasicParsing; $joke = ($result.Content | ConvertFrom-Json).joke; Write-Host '📍 '$joke -ForegroundColor Cyan"
echo.
pause
goto menu

:dad_joke
cls
echo.
echo Carregando piada de pai...
echo.
powershell -Command "$result = Invoke-WebRequest -Uri 'https://icanhazdadjoke.com/?format=json' -UseBasicParsing; $joke = ($result.Content | ConvertFrom-Json).joke; Write-Host '😄 '$joke -ForegroundColor Magenta"
echo.
pause
goto menu

:multiple_jokes
cls
echo.
echo Carregando 5 piadas aleatórias...
echo.
powershell -Command "for($i=1; $i -le 5; $i++) { try { $result = Invoke-WebRequest -Uri 'https://v2.jokeapi.dev/joke/Any?format=json&type=single' -UseBasicParsing; $joke = ($result.Content | ConvertFrom-Json).joke; Write-Host "$i. $joke" -ForegroundColor Yellow; Write-Host '' } catch { Write-Host "$i. Piada de fallback" -ForegroundColor Red } }"
echo.
pause
goto menu
