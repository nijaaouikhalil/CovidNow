# **Acceptance Tests <br>


# **Acceptance Tests For Our 4 Core Features** :white_check_mark: <br>


## :one: &nbsp; Account Creation and Log in


**_Scenario #1_**

Given I am `NOT a Registered User`,
When I can click on the button "Create Account" in order to register and I enter an invalid email,
Then I get an error that says "Invalid email".


**_Scenario #2_**

Given I am `NOT a Registered User`,
When I can click on the button "Create an Account" in order to register and I enter a valid email and password,
Then I get a message saying "Account successfully created. If you wish to log in, head to the log in page".



**_Scenario #4_**

Given I am `NOT a Registered User`,
When I can click on the "Login" button in order to attempt to sign in,
Then I will get an error message saying "Wrong credentials".



**_Scenario #5_**

Given that I am `NOT a Logged-in User`,
When I can click on the "Login" button in order to sign in and I enter an invalid email or password,
Then I get an error message saying "Wrong credentials".
 
 

**_Scenario #6_**

Given that I am `NOT a Logged-in User`,
When I can click on the "Login" button in order to sign in and I enter the correct login credentials associated with my account,
Then I will be forwarded to my account.
