class VideoCanvas {
    constructor(video, canvas) {
        this.video = video
        this.width = video.videoWidth
        this.height = video.videoHeight
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.palyState = false
        this.delta = null


        video.addEventListener('play', (e) => {
            console.log(this)
            this.palyState = true
        }, false)

        video.addEventListener('pause', (e) => {
            console.log(this)
            this.palyState = false
        }, false)

        video.addEventListener('ended', (e) => {

        }, false)

        video.addEventListener('progress', (e) => {
            console.log(e)
        }, false)
    }

    play() {
        if (this.palyState) {
            this.ctx.drawImage(this.video, 0, 0, this.width, this.height)
            this.delta = requestAnimationFrame(this.play.bind(this))
        }
    }
    pause() {
        this.video.pause()
        this.palyState = false
    }
    toggle() {
        if (this.palyState) {
            this.pause()
            if (this.delta) {
                cancelAnimationFrame(this.delta)
            }
        }
        else {
            this.video.play()
            this.palyState = true
            this.play()
        }
    }

}

window.addEventListener('load', (e) => {
    const canvas = document.getElementById('videoCanvas')
    const videoCanvas = new VideoCanvas(document.getElementById('videoSource'), canvas)
    // videoCanvas.play()

    canvas.addEventListener('click', () => {
        videoCanvas.play()
    })
}, false)