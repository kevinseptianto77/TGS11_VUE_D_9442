<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-8 mt-10>
        <v-card-actions class="justify-center">
         <!--<img src="../assets/lawak.png" style="height:250px;width:200px" />-->
        </v-card-actions>
        <h1 class="text-md-center">Login Page - JWT</h1>
        <h5 class="text-md-center">(JSON WEB TOKEN)</h5>
        <v-layout row wrap style="margin:10px" justify="center">
          <v-row>
            <v-col cols="12">
              <v-text-field label="Email*" v-model="form.email" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Password*" v-model="form.password" type="password" required></v-text-field>
            </v-col>
            <v-btn @click="login()" block color="green" height="40" width="10">LOGIN</v-btn>
          </v-row>
        </v-layout>
      </v-container>
    </v-card>
    <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="7000">
      {{ text }}
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>



<script>
export default {
  data() {
    return {
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        email: "",
        password: ""
      },
      user: new FormData()
    };
  },
  methods: {
    login() {
      var url = this.$apiUrl + "/Auth";
      this.user = new FormData();
      this.user.append("email", this.form.email);
      this.user.append("password", this.form.password);
      this.$http.post(url, this.user).then(response => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          this.$router.push({ name: "UserController" });
        } else {
          this.snackbar = true;
          this.text = "Invalid Username or Password!";
          this.color = "red";
          this.load = false;
        }
      });
    }
  }
};
</script>