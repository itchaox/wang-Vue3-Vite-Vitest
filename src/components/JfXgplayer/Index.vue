<!--
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2023-06-28 20:09
 * @LastAuthor : wangchao
 * @LastTime   : 2023-07-21 11:37
 * @desc       : 西瓜播放器组件
-->

<script setup lang="ts">
  import { onMounted } from 'vue';
  import Player, { Events } from 'xgplayer';
  import FlvPlugin from 'xgplayer-flv';
  import HlsPlugin from 'xgplayer-hls';

  import 'xgplayer/dist/index.min.css';

  interface Props {
    videoList?: { id: string; url: string }[];
  }

  const props = defineProps<Props>();

  const playerList: any[] = [];

  onMounted(async () => {
    // 初始化所有播放器
    props.videoList?.forEach((video) => {
      const player = new Player({
        id: video.id,
        width: 850,
        height: 850,
        autoplay: true,
        autoplayMuted: true,
        url: video.url,
        screenShot: {
          disable: false,
          width: 20,
          height: 20,
        }, //显示截图按钮
        videoAttributes: {
          crossOrigin: 'anonymous',
        },
        lang: 'zh',
        ...getVideoConfig(video.url),
      });

      player.on(Events.SCREEN_SHOT, (url) => {
        console.log('screen shot success');
      });

      handleEvent(player);
      playerList.push(player);
    });

    // 监听事件;
    function handleEvent(player) {
      // 播放按钮
      player.on(Events.PLAY, () => {
        playerList.forEach((p) => {
          p.play();
        });
      });

      // 暂停按钮
      player.on(Events.PAUSE, () => {
        playerList.forEach((p) => {
          p.pause();
        });
      });

      // 音量控制
      player.on(Events.VOLUME_CHANGE, () => {
        playerList.forEach((p) => {
          p.muted = player.muted;
          p.volume = player.volume;
        });
      });

      // 倍速播放
      player.on(Events.RATE_CHANGE, () => {
        playerList.forEach((p) => {
          p.playbackRate = player.playbackRate;
        });
      });

      // 开始拖动
      player.usePluginHooks('progress', 'dragstart', (plugin, event, data) => {
        playerList.forEach((p) => {
          p.currentTime = player.currentTime;
        });
      });

      //  结束拖动
      player.usePluginHooks('progress', 'drag', (plugin, event, data) => {
        playerList.forEach((p) => {
          p.currentTime = player.currentTime;
        });
      });
    }
  });

  function getVideoConfig(url) {
    const extension = url.toLowerCase().split('.').pop();

    switch (extension) {
      case 'm3u8':
        return {
          plugins: [HlsPlugin],
          isLive: true,
        };
      case 'flv':
        return {
          plugins: [FlvPlugin],
          isLive: true,
        };
      case 'mp4':
        return {
          progress: {
            isPauseMoving: true,
          },
        };
    }
  }
</script>

<template>
  <div class="wc-xg">
    <div class="wc-list">
      <div
        class="wc-item"
        v-for="item in props.videoList"
        :key="item.id"
        :id="item.id"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .wc-xg {
    font-size: 14px;

    .wc-list {
      display: flex;
      flex-wrap: wrap;

      .wc-item {
        margin: 0 25px 20px 0;
      }
    }
  }
</style>
