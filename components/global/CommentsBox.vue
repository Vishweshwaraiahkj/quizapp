<template>
  <footer id="comments_box">
    <div class="comments_input">
      <div class="container">
        <div class="row">
          <div class="user-name col-lg-12 col-md-12 col-sm-12">
            <label>User Name:</label>
            <b-input v-model="userName"></b-input>
          </div>
          <div class="user-email col-lg-12 col-md-12 col-sm-12">
            <label>User Email:</label>
            <b-input v-model="userEmail" type="email"></b-input>
          </div>
          <div class="user-comments col-lg-12 col-md-12 col-sm-12">
            <label>Comments:</label>
            <b-form-textarea
              id="comments-textarea"
              v-model="text"
              placeholder="Enter your comment here..."
              rows="4"
              max-rows="6"
            ></b-form-textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="mt-3 mb-0">{{ {'username': userName, 'useremail': userEmail, 'comment': comment} }}</div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'CommentsBox',
  data() {
    return {
      templateTitle: 'CommentsBox',
      userName: '',
      userEmail: '',
      comment: ''
    }
  }
}
</script>
<style scoped>
#comments_box {
  font-size: 20px;
}
</style>
