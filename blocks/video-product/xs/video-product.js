export default function initVideoProduct() 
{ 
    (function () {

        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    })();

    (function () {
        let isMobile = $(window).width() < 567;
        window.onYouTubeIframeAPIReady = function () {

            $('.video-product').each(function () {
                const $parent = $(this);
                const $player = $parent.find('.video-product__video');

                creatorPlayer($player, $parent);
            });

        };

        let windowWidth = $(window).width();

        function creatorPlayer(player, parent) {
            const data = player.data('player');
            new YT.Player(data.id, {
                height: parent.find('.video-product__preview').height(),
                width: parent.find('.video-product__preview').width(),
                videoId: data.video,
                events: {
                    'onReady': onPlayerReady.bind(null, parent)
                },
                playerVars: {
                    disablekb: 1,
                    controls: 1,
                    loop: 1,
                    showinfo: 0,
                    modestbranding: 1,
                    rel: 0,
                    playlist: data.video
                }
            });

        }

        function onPlayerReady(parent, e) {
            const player = e.target;

            player.setPlaybackQuality('hd720');
            // player.mute();
            player.playVideo();
            player.pauseVideo();


            
            parent.on("click", function () {
                    // на данном этапе разработки видео на странице About скрыто на разрешениях <992px
                    // if(isMobile){
                    //     $(this).find('.videoBlock__video').css("position", "relative");
                    // }
                    $(this).find('.video-product__preview').hide();
                    $(this).find('.video-product__video').show();
                    player.playVideo();
                }
            );

        }

        $(window).on("resize", function () {

            windowWidth = $(this).width();

            $('.video-product .video-product__video').each(function () {
                const $this = $(this);
                const iframe = $this.find("iframe");
                const img = $this.prev();
                const height = img.height();
                const width = img.width();

                iframe.width(width);
                iframe.height(height);
            });

        });

    })();
}