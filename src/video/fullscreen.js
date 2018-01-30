document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen

function toggleFullScreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { 
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen()
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
}

function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
    }
}
function exitFullscreen(element) {
    if (element.exitFullscreen) {
        element.exitFullscreen()
    } else if (element.msExitFullscreen) {
        element.msExitFullscreen()
    } else if (element.mozCancelFullScreen) {
        element.mozCancelFullScreen()
    } else if (element.webkitExitFullscreen) {
        element.webkitExitFullscreen()
    }
}

(function () {
    var status = document.getElementById('status')
    status.innerText = navigator.onLine ? 'online' : 'offline'
    window.addEventListener('online', function () {
        status.innerText = 'ONLINE'
    }, false)

    window.addEventListener('offline', function () {
        status.innerText = 'OFFLINE'
    }, false)
})()

window.onload = () => {
    let gameVideo = document.getElementById('gameVideo')
    let J_play = document.getElementById('J_play')
    let J_fullscreen = document.getElementById('J_fullscreen')
    let isFullscreen = false

    function toggleFullscreen() {
        if (document.fullscreenEnabled) {
            if (isFullscreen) {
                isFullscreen = false
                exitFullscreen(gameVideo)
                J_fullscreen.innerText = '退出全屏'
            }
            else {
                isFullscreen = true
                requestFullscreen(gameVideo)
                J_fullscreen.innerText = '全屏'
            }
        }

    }

    J_fullscreen.addEventListener('click', () => {
        toggleFullscreen()
    })
    document.addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
            toggleFullscreen()
        }
    }, false)

    J_play.addEventListener('click', (e) => {
        if (gameVideo.paused) {
            gameVideo.play()
            J_play.innerText = '暂停'
        }
        else {
            gameVideo.pause()
            J_play.innerText = '播放'
        }
    })
}