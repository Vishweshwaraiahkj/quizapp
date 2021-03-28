<template>
  <b-row class="w-100 mainGrids">
    <div
      v-for="(item, index) in filteredData"
      :key="item.id"
      :class="item.newClass ? item.newClass : 'col'"
    >
      <nuxt-link v-if="!item.noData" :to="goTo(item.id)" class="black_anchor">
        <div
          :id="index"
          class="banner"
          :style="{ backgroundImage: 'url(' + item.examBgImageLoc + ')' }"
        ></div>
        <b-card header-tag="header" footer-tag="footer">
          <template #header>
            <div class="d-flex">
              <div class="headerImage">
                <b-img :src="item.examIconLoc" class="responsive"></b-img>
              </div>
              <div class="headerDetails">
                <h4>{{ item.examName }}</h4>
              </div>
            </div>
          </template>
          <b-card-text>
            <div v-if="item.examInfo.length < 100">
              <span v-html="item.examInfo"></span>
            </div>
            <div v-else>{{ item.examInfo.substring(0, 100) + '...' }}</div>
          </b-card-text>
          <template #footer>
            <span class="footer_text">Learn more</span>
          </template>
        </b-card>
      </nuxt-link>
    </div>
  </b-row>
</template>
<script>
export default {
  name: 'HomeGrids',
  props: {
    propsData: {
      type: Array,
      default: () => []
    },
    itemsPerRow: {
      type: Number,
      default: 3
    }
  },
  computed: {
    filteredData() {
      const data = this.propsData
      const rowItems = Number(this.itemsPerRow) + 1
      const filtered = []
      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          const a = i + 1
          if (a % rowItems === 0) {
            filtered.push({
              newClass: 'w-100',
              noData: true
            })
          }
          filtered.push(data[i])
        }
      }
      return filtered
    }
  },
  methods: {
    goTo(id) {
      return '/exam/details/' + id
    }
  }
}
</script>
<style lang="scss" scoped>
.mainGrids {
  margin: 2rem 0;

  .col {
    max-width: 23%;
    margin: 1%;
    float: left;
    padding: 0;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);

    .card {
      border: none;
      border-radius: 0;

      .card-body {
        padding: 0 1.25rem;
      }

      .card-header,
      .card-footer {
        background-color: initial;
        border-bottom: 0;
        border-top: 0;
      }
    }
  }

  .banner {
    height: 110px;
    width: 100%;
    border-radius: 3px 3px 0 0;
    background-size: cover;
    background-position: center center;
    background-color: rgba(0, 0, 0, 0.36);
  }

  .content {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);
    border-radius: 0 0 3px 3px;
  }

  .headerImage {
    width: 56px;
    height: 56px;
    border-radius: 3px;
    border: 1px solid #dadada;
    background: #fff;
    line-height: 1;
    text-align: center;
    flex: 2;

    img {
      max-width: 48px;
      max-height: 48px;
    }
  }

  .headerDetails {
    flex: 10;
    margin-left: 1rem;

    h5,
    span {
      font-size: 14px;
      margin: 0;
    }
  }
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.footer_text {
  font-size: 14px;
  font-weight: 600;
  color: #d7263d;
}

@media only screen and (max-width: 1024px) {
  /* For mobile phones: */
  .mainGrids {
    .col {
      max-width: 48%;
    }
  }
}

@media only screen and (max-width: 640px) {
  /* For mobile phones: */
  .mainGrids {
    .col {
      max-width: 98%;
    }
  }
}
</style>
