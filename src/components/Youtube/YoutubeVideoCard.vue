<script>
export default {
  props: {
    data: Object
  },
  setup(props) {
    return {
      url: props.data?.snippet?.thumbnails?.medium?.url,
      href: `https://www.youtube.com/watch?v=${props.data.id.videoId}`,
      title: props.data.snippet.title
    };
  }
};
</script>
<template>
  <div class="videoCardRoot">
    <a :href="href">
      <img :src="url" alt="youtube-card" />
    </a>
    <p :title="title">
      {{ title }}
    </p>
  </div>
</template>
<style lang="scss">
.videoCardRoot {
  border-radius: 8px;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  p {
    padding: 8px;
  }
}
</style>
