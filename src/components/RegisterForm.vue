<template>
  <div>
    <div class="text-white text-center font-bold p-5 mb-4" v-if="reg_show_alert" :class="reg_alert_varinat">
      {{ reg_alert_msg }}
    </div>
    <VeeForm :validation-schema="schema" @submit="register" :initial-values="userData">
      <!-- Name -->
      <div class="mb-3">
        <label class="inline-block mb-2">Name</label>
        <VeeField
          name="name"
          type="text"
          class="
            block
            w-full
            py-1.5
            px-3
            text-gray-800
            border border-gray-300
            transition
            duration-500
            focus:outline-none focus:border-black
            rounded
          "
          placeholder="Enter Name"
        />
        <ErrorMessage class="text-red-600" name="name" />
      </div>
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <VeeField
          name="email"
          type="email"
          class="
            block
            w-full
            py-1.5
            px-3
            text-gray-800
            border border-gray-300
            transition
            duration-500
            focus:outline-none focus:border-black
            rounded
          "
          placeholder="Enter Email"
        />
        <ErrorMessage class="text-red-600" name="email" />
      </div>
      <!-- Age -->
      <div class="mb-3">
        <label class="inline-block mb-2">Age</label>
        <VeeField
          name="age"
          type="number"
          class="
            block
            w-full
            py-1.5
            px-3
            text-gray-800
            border border-gray-300
            transition
            duration-500
            focus:outline-none focus:border-black
            rounded
          "
        />
        <ErrorMessage class="text-red-600" name="age" />
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <VeeField name="password" :bails="false" v-slot="{ field, errors }">
          <input
            type="password"
            class="
              block
              w-full
              py-1.5
              px-3
              text-gray-800
              border border-gray-300
              transition
              duration-500
              focus:outline-none focus:border-black
              rounded
            "
            placeholder="Password"
            v-bind="field"
          />
          <div class="text-red-600" v-for="error in errors" :key="error">
            {{ error }}
          </div>
        </VeeField>
        <ErrorMessage class="text-red-600" name="password" />
      </div>
      <!-- Confirm Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Confirm Password</label>
        <VeeField
          name="confirm_password"
          type="password"
          class="
            block
            w-full
            py-1.5
            px-3
            text-gray-800
            border border-gray-300
            transition
            duration-500
            focus:outline-none focus:border-black
            rounded
          "
          placeholder="Confirm Password"
        />
        <ErrorMessage class="text-red-600" name="confirm_password" />
      </div>
      <!-- Country -->
      <div class="mb-3">
        <label class="inline-block mb-2">Country</label>
        <VeeField
          as="select"
          name="country"
          class="
            block
            w-full
            py-1.5
            px-3
            text-gray-800
            border border-gray-300
            transition
            duration-500
            focus:outline-none focus:border-black
            rounded
          "
        >
          <option value="USA">USA</option>
          <option value="Mexico">Mexico</option>
          <option value="Poland">Poland</option>
        </VeeField>
        <ErrorMessage class="text-red-600" name="country" />
      </div>
      <!-- TOS -->
      <div class="mb-3 pl-6">
        <VeeField name="tos" value="1" type="checkbox" class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
        <label class="inline-block">Accept terms of service</label>
        <ErrorMessage class="text-red-600" name="tos" />
      </div>
      <button
        type="submit"
        :disabled="reg_in_submission"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      >
        Submit
      </button>
    </VeeForm>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      tab: "login",
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        age: "required|min_value:0|max_value:100",
        password: "required|min:3|max:64",
        confirm_password: "required|passwords_mismatch:@password",
        country: "required",
        tos: "tos",
      },
      userData: {
        country: "Poland",
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_varinat: "bg-blue-500",
      reg_alert_msg: "Please wait! your account is being created.",
    };
  },
  methods: {
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_varinat = "bg-blue-500";
      this.reg_alert_msg = "Please wait! your account is being created.";

      try {
        await this.$store.dispatch("register", values);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_varinat = "bg-red-500";
        this.reg_alert_msg = "An unexpected error occured. Please try again later.";
        return;
      }

      this.reg_alert_varinat = "bg-green-500";
      this.reg_alert_msg = "Success! your account has been created.";
      window.location.reload();
    },
  },
};
</script>
