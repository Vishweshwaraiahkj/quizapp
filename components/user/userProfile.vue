<template>
  <b-row>
    <!--  
    <b-col sm="2">
       <b-card no-body 
            img-src="/img/avatars/6.png"
            img-alt="Image"
            img-top>
        <h4 slot="header">{{user.firstName}} </h4>
    </b-card>
    </b-col>
    -->
    <b-col sm="12">
      <b-card>
         <b-alert
          v-bind:variant="alert.variantType"
          dismissible
          :show="alert.showDismissibleAlert"
          @dismissed="alert.showDismissibleAlert=false">{{alert.mgs}}</b-alert>

        <b-row>
          <b-col sm="6">
            <h3>
              <i class="fa fa-user"></i> ABOUT
            </h3>
          </b-col>
          <b-col sm="6">
            <b-btn class="pull-right" @click="showModal" variant="primary">
              <i class="fa fa-pencil"></i>Edit
            </b-btn>
          </b-col>
        </b-row>
        <b-card>
          <b-row>
            <b-col>First Name: {{user.firstName}}</b-col>
          </b-row>
          <b-row>
            <b-col>Last Name: {{user.lastName}}</b-col>
          </b-row>
          <b-row>
            <b-col>E-mail: {{user.email}}</b-col>
          </b-row>
          <b-row>
            <b-col>Mobile: {{user.mobile}}</b-col>
          </b-row>
        </b-card>
        <b-card>
        <b-row>
          <b-col>
            <h5>
              <b-btn @click="showChangePasswordModal" variant="primary">
                Change Password
                <i class="fa fa-pencil"></i>
              </b-btn>
            </h5>
          </b-col>
        </b-row>
        </b-card>
      </b-card>
    
          <b-card>
            <!--
            <b-row>
                <b-col sm="6"><h3><i class="fa fa-trophy"></i> EDUCATION</h3></b-col>
                <b-col sm="6"><b-btn class="pull-right" @click="showAddEducationModal" variant="primary">
                  <i class="fa fa-plus"></i> Add Education</b-btn></b-col>
            </b-row>
            -->
            <b-card v-for="edu in user.education" :key="edu.id">
             <b-row>
              <b-col>
                  <div>{{edu.college}}</div>
                 <div>{{edu.degree}}, {{edu.fieldOfStudy}}</div>
                  <b-row> 
                    <b-col sm="9"><b>{{edu.fromYear}} - {{edu.toYear}}</b></b-col>
                    <b-col sm="3">
                      <div class="pull-right">
                      <a @click="showAddEducationModal(edu)" style="cursor: pointer;padding:16px"><i class="fa fa-pencil"></i> Edit</a> 
                      <a @click="deleteUserEducation(edu.id)" style="cursor: pointer;padding:16px"><i class="fa fa-trash"></i> Delete</a>
                      </div>
                    </b-col>
                  </b-row>
              </b-col>              
             </b-row>
            </b-card>
          </b-card>
    </b-col>
    <div>
      <b-modal
        id="modalEditProfile"
        ref="modalEditProfile"
        title="Edit Profile"
        :no-close-on-backdrop="true"
        hide-footer
      >
        <form @submit.stop.prevent="UpdateUserProfile">
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>First Name</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              type="text"
              class="form-control"
              placeholder="FirstName"
              v-model="user.firstName"
              autocomplete="firstName"
              required
            />
          </b-input-group>
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>Last Name</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              type="text"
              class="form-control"
              placeholder="LastName"
              v-model="user.lastName"
              autocomplete="lastName"
            />
          </b-input-group>
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>Mobile</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              type="text"
              class="form-control"
              placeholder="Mobile"
              pattern="[1-9]{1}[0-9]{9}"
              maxlength="10"
              v-model="user.mobile"
              oninvalid="this.setCustomValidity('Please Enter valid 10 digit Mobile Number')"
              oninput="setCustomValidity('')"
            />
          </b-input-group>
          <b-row>
            <b-col cols="6">
              <b-button block @click="hideModal">Cancel</b-button>
            </b-col>
            <b-col cols="6">
              <b-button type="submit" variant="success" block>Save</b-button>
            </b-col>
          </b-row>
        </form>
      </b-modal>
    </div>
    <div>
      <b-modal
        id="modalChangePassword"
        ref="modalChangePassword"
        title="Change Password"
        :no-close-on-backdrop="true"
        hide-footer
      >
        <form @submit.stop.prevent="submitChangePassword">
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>Old Password</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              type="password"
              class="form-control"
              placeholder="Enter old password"
              v-model="changePassword.oldPassword"
              required
            />
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>New Password</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              type="password"
              class="form-control"
              placeholder="Enter new password"
              v-model="changePassword.newPassword"
              required
            />
          </b-input-group>

          <b-input-group class="mb-4">
            <b-input-group-prepend>
              <b-input-group-text>Confirm</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              id="confirm_password"
              type="password"
              v-on:change="validatePassword"
              class="form-control"
              placeholder="Confirm new password"
              v-model="repPassword"
              required
            />
          </b-input-group>
          <b-row>
            <b-col cols="6">
              <b-button block @click="hideChangePasswordModal">Cancel</b-button>
            </b-col>
            <b-col cols="6">
              <b-button type="submit" variant="success" block>Save</b-button>
            </b-col>
          </b-row>
        </form>
      </b-modal>
    </div>
    <div>
      <b-modal
        id="addEducationModal"
        ref="addEducationModal"
        title="Add/Edit Education"
        size="lg"
        :no-close-on-backdrop="true"
        hide-footer
      >
        <form @submit.stop.prevent="saveUserEducation">
          <b-form-group id="edGrp1" label="College/School:" label-for="aadEducationCollege">
            <b-form-input
              id="aadEducationCollege"
              type="text"
              v-model="userEducation.college"
              required
              placeholder="Ex: National College Bengaluru/Kuvempu University"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="edGrp2" label="Degree:" label-for="aadEducationDegree">
            <b-form-input
              id="aadEducationdegree"
              type="text"
              v-model="userEducation.degree"
              required
              placeholder="Ex: Bachelor of Arts - BA"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="edGrp3" label="Field of study:" label-for="aadEducationFieldofstudy">
            <b-form-input
              id="aadEducationFieldofstudy"
              type="text"
              v-model="userEducation.fieldOfStudy"
              required
              placeholder="Ex: History"
            ></b-form-input>
          </b-form-group>
          <b-row>
            <b-col cols="6">
              <b-form-group id="edGrp4" label="From Year:">
                <b-form-input
                  id="aadEducationfromYear"
                  type="number"
                  v-model="userEducation.fromYear"
                  required
                  placeholder="Ex: 2010"
                ></b-form-input>
                <!-- <b-form-select v-model="userEducation.fromYear">
                  <option :value="2018">2018</option>
                  <option :value="2017">2017</option>
                  <option :value="2016">2016</option>
                </b-form-select>-->
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group id="edGrp5" label="To Year:">
                <b-form-input
                  id="aadEducationToYear"
                  type="number"
                  v-model="userEducation.toYear"
                  required
                  placeholder="Ex: 2014"
                ></b-form-input>
                <!-- <b-form-select v-model="userEducation.toYear">
                  <option :value="2018">2018</option>
                  <option :value="2017">2017</option>
                  <option :value="2016">2016</option>
                </b-form-select>-->
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group id="edGrp7" label="Description:" label-for="aadEducationDescription">
            <textarea
              rows="5"
              style="width: 100%"
              id="aadEducationDescription"
              v-model="userEducation.discription"
            ></textarea>
          </b-form-group>
          <b-row>
            <b-col cols="6">
              <b-button block @click="hideAddEducationModal">Cancel</b-button>
            </b-col>
            <b-col cols="6">
              <b-button type="submit" variant="success" block>Save</b-button>
            </b-col>
          </b-row>
        </form>
      </b-modal>
    </div>
  </b-row>
</template>

<script>

export default {
  name: "userProfile",
  props: {
    caption: {
      type: String,
      default: "User id"
    }
  },
  data: () => {
    return { 
      alert: {
        showDismissibleAlert: false,
        variantType: "primary",
        mgs: ""
      },
      user: {},
      repPassword: "",
      changePassword: {},
      userEducation: {},
      educationModelTitle: "Add Education"
    };
  },
  
  methods: {
    
    getToken(){
             	var token= this.$auth.getToken('local');  
               token=token.replace("Bearer ", "");
               return token;
    },
    
    getUserProfile() {

      var userId=this.$auth.$storage.getUniversal('USER_DATA').userId
      
       this.$axios.$get('/comman/getUserProfile?user='+userId+'&access_token='+this.getToken())
        .then(response => {
          this.user = response;
        })
        .catch(e => {
          console.log(e);
        });
    },
    UpdateUserProfile() {
      this.$refs.modalEditProfile.hide();
      
      this.$axios.post("/comman/updateUserProfile?access_token="+this.getToken(),this.user)
        .then(response => {
          if (response.data.code === 900) {
            this.displayAlert(true, "success", "Profile Updated successfully.");
          } else if (response.data.code === 902) {
            this.displayAlert(true, "danger", "Update Profile Failed");
            this.getUserProfile();
          }
        })
        .catch(e => {
          this.displayAlert(true, "danger", "Update Profile Failed");
          this.getUserProfile();
        });
    },

    submitChangePassword() {
      this.changePassword.userId = this.user.userId;
      this.$refs.modalChangePassword.hide();
      this.$axios
        .post("/comman/changePassword?access_token="+this.getToken(), this.changePassword)
        .then(response => {
          if (response.data.code === 900) {
            this.displayAlert(true, "success", "Your Password changed successfully." );
          } else if (response.data.code === 902) {
            this.displayAlert(true, "danger", "Password update Failed");
          }else if (response.data.code === 903) {
            this.displayAlert(true, "danger", "Password update Failed :: Old Password is wrong");
          }
        })
        .catch(e => {
          this.displayAlert(true, "danger", "Update Profile Failed");
        });
    },
    saveUserEducation() {
      this.userEducation.userId = this.user.userId;
      this.$refs.addEducationModal.hide();
      this.$axios
        .post("/comman/saveUserEducation?access_token="+this.getToken(), this.userEducation)
        .then(response => {
          this.displayAlert(
            true,
            "success",
            "Your Education Saved successfully."
          );
          this.getUserProfile();
        })
        .catch(e => {
          this.displayAlert(true, "danger", "Failed, Please try again");
        });
    },
    deleteUserEducation(id) {
      this.$axios
        .post('/comman/deleteUserEducation?id=${id}')
        .then(response => {
          this.displayAlert(true, "success", "Deleted successfully.");
          this.getUserProfile();
        })
        .catch(e => {
          this.displayAlert(true, "danger", "Delete Failed");
        });
    },
    
    validatePassword() {
      var confirm_password = document.getElementById("confirm_password");
      if (this.repPassword !== this.changePassword.newPassword) {
        
        confirm_password.setCustomValidity("Passwords Don't Match.");
      } else {
        confirm_password.setCustomValidity("");
      }
    },
    showModal() {
      this.$refs.modalEditProfile.show();
    },
    hideModal() {
      this.$refs.modalEditProfile.hide();
    },
    showChangePasswordModal() {
      this.repPassword=null;
      this.changePassword={}
      this.$refs.modalChangePassword.show();
    },
    hideChangePasswordModal() {
      this.$refs.modalChangePassword.hide();
    },
    showAddEducationModal(education) {
      if (education == "undefined") {
        this.userEducation = {};
        this.educationModelTitle = "Add Education";
      } else {
        this.userEducation = education;
        this.educationModelTitle = "Edit Education";
      }
      this.$refs.addEducationModal.show();
    },
    hideAddEducationModal() {
      this.$refs.addEducationModal.hide();
    },

     displayAlert(showAlert, vt, mgs) {
      this.alert.showDismissibleAlert = showAlert;
      this.alert.variantType = vt;
      this.alert.mgs = mgs;
    },
  },
  mounted() {
    this.getUserProfile();
  }
};
</script>
