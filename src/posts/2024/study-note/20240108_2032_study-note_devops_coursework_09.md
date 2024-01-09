---
title: "[Study Note] Coursework: DevOps and Software Engineering - BDD"
date: 2024-01-08T20:32
thumb: "devops.jpg"
tags: 
    - ❮Study Note❯
    - DevOps
    - software engineering
    - behavior-driven development
---

# 9. Behavior-driven Development

## 9-1. BDD Introduction
- Behavior driven development, or BDD, focuses on the system's behavior as observed from the outside in.
    - It's not concerned with the internal workings of the system like test driven development, or TDD.
    - It is observing how the system behaves just like a user of the system would.
	    - This makes BDD great for integration testing to see if all of the components are behaving together.
	    - It forces you to think "from the outside in."
- In other words, you implement those behaviors that contribute most directly to business outcomes.
    - One advantage of BDD is that it describes behaviors in a single syntax that domain experts, testers, developers, and customers can easily understand.
	    - This improves communication across the team.

### BDD vs TDD
- In TDD, you test the system's functions from the inside out or the bottom up.
  - It's testing the inner workings of the functions.
  - For TDD, you care about the call.
    - Did it get the right return code?
    - Did it bring back the right data in the right format?
  - We use TDD for unit testing.
- In BDD, you're observing how the system behaves just like a user of the system would experience it.
  - BDD tests the behavior of the system from the outside in and considers how the system should behave.
    - BDD is a test-first approach for development too, like TDD.
      - However, BDD is a higher level of testing.
  - It's not concerned with the internal workings of the system like TDD.
- e.g. Think of your virtual shopping cart when ordering items online.
  - For BDD, you might ask "When I add something to my shopping cart, does it appear in my shopping cart?"
    - I don't care what API was called, and I don't care about the data that was transferred.
	  - I just care that what I expect to appear in my shopping cart does appear there.
    - Likewise, when you remove something from your cart, the observed behavior should be that the item no longer shows up in your cart.
      - Again, you're not concerned with the API calls in the background that make this happen.
      - You're concerned with the outward behavior of the system.
        - That is, when you click the button labeled "remove from cart," you expect the item to be removed from your cart and, therefore, no longer present.

### BDD in Software Testing Process
1. Unit testing
    - At this level of the software testing process, you test individual units or components of a software system.
    - The purpose is to validate that each unit is performing as designed.
2. Integration testing.
    - At this level, you're combining individual units and testing them as a group, and the purpose of this is to expose faults in the interactions between the units.
3. System testing
    - At this level, you're testing the complete system end to end.
    - The purpose is to evaluate the system's compliance with the specified high-level requirements and make sure the whole system is working together.
4. User acceptance testing
    - At this level, the user tests the system for acceptability.
- So where does BDD fit into the process?
    - Usually, you perform BDD at the integration, system, or acceptance test levels.
    - At those levels, enough of the system is running that you can evaluate its behavior.

### Benefits of BDD
- BDD describes behaviors in a single syntax.
  - The single syntax that domain experts, testers, developers, and stakeholders can easily understand.
    - Domain experts can talk in their own language and you can document it in that same language.
    - So the domain experts can be really specific about what they need and you can express this easily.
  - It is beneficial to be able to describe behaviors in a single syntax that is directly accessible to everyone.
    - It significantly improves communications across all involved parties.
- Notations originating in the BDD approach - particularly the given-when-then syntax - are closer to everyday language than the notations in the TDD tools.
  - The language is very natural, and they have a shallower learning curve, making BDD very approachable.
  - The most commonly used syntax in BDD is called Gherkin.
    - It got the name Gherkin because one of the first BDD tools was called Cucumber.
- In the BDD specification, it describes how the system should behave in a situation.
  - Tools targeting the BDD approach generally afford automatic generation of technical and user documentation from the BDD specification.
    - This automatic generation means that the documentation is always in sync with what you're building.
- You can generate tests directly from the BDD specification to confirm that the behavior was implemented.
  - So you use the specification to test the system and prove to your stakeholders that the delivered behavior is exactly they asked for.

### BDD Workflow
1. The developers, testers, and stakeholders explore the problem domain to make sure that everyone understands it,
    - and they collaborate to produce concrete examples, or scenarios, that describe the behavior they want.
    - You document these examples in the Gherkin syntax.
	    - The result is a specification of the behavior of the system that you will build.
2. The team uses a BDD test runner like Behave to run those examples in that specification as automated test cases.
    - Behave parses the Gherkin syntax and looks for test steps that it can use to confirm that the system behaves as expected.
        - Running these examples with Behave tells you what test steps are missing.
    - You'll get a report that says, "Here are the test steps that you need to write to prove the behavior of the system."
        - Then you write those steps and you make everything work.
3. As the team works on the solution, Behave tells you which examples are implemented and working and warns you about the ones that aren't.
    - Before you know it, you have one document that acts as both specification and tests for your software.
        - It represents exactly how the system should work. 
        - This document is not some Word document in some library that somebody forgets about, and then later you find out that the system doesn't even work that way because you've made changes and you forgot to update the documentation.
            - This is a living document checked into your source control system, and you run test cases against it.
        - Nobody ever forgets about this document because every time you run your test suite, the document is used to confirm the way the system should behave.
            - It's almost like the documentation drives the system instead of the other way around. 

### Gherkin Syntax
- In Gherkin syntax, every example has at least three lines, referred to as steps, and each step must start with a keyword.
- Gherkin syntax is commonly referred to as Given, When, Then for the three required keywords.
  - Given
    - Given a set of preconditions. 
    - These are the conditions required to put the system into the state it needs to be to perform the tests.
      - e.g. an e-commerce application
        - "Given I have two items in my shopping cart."
        - This tells the test system that we need to make sure that there are two items in the shopping cart before we proceed.
  - When
    - When an event occurs.
    - These events are the actions that the user takes to interact with the system under test.
      - e.g. "When I remove an item from my cart."
      - This tells the test system that it needs to remove an item from the cart under test.
  - Then
    - Then some testable outcome is observed.
    - This is the expected outcome of the action that the user performs.
      - e.g. "Then I should only have one item in my shopping cart."
      - This step tells the test system to check that an item is actually removed from the cart by the When event.
- To improve readability, you can also use the And and But keywords.
  - And
    - Say you have a series of steps, and each step begins with the same keyword,
      - "Given this, Given that, Given some other thing." - That's three Givens in a row.
      - To make a series more readable and more fluid, you could use And keywords to replace each repeated keyword after the first step in the series.
        - e.g. "Given this, And that, And some other thing."
          - It reads a lot nicer.
    - You can also write, 
      - "When this happens, And that happens," or,
      - "Then this is observed, And that is observed."
        - "And" will always take on the meaning of the previous Given, When, or Then that comes before it.
  - But
    - For steps that state what should not occur, you could also replace the keyword with But instead of And.
      - e.g. "But that is not observed."
    - You can still use And, but the But keyword is just an extra option to improve readability.
- Summary
  - Given some precondition,
  - When some event happens,
  - Then some testable outcome is observed.
  - If you have more than one Given, When, or Then,
    - you can substitute it for an And or a But to make the reading easier.
  - With these keywords, you can create sentences that will both express and test the system's expected and actual behavior.

### BDD Specification
- A specification is made up of one or more features, which represent user stories.
  - Feature is a high-level description of a user story.
    - You can have as many features as needed.
    - Place each feature in its own specification file,
      - or you could certainly place them all in one file or group them however you like.
  - Scenario is a situation that describes a single behavior of a feature.
    - Each scenario formulates a complete test case for the behavior.
  - To build the BDD specification, you write a feature, and then write scenarios using the Given, When, Then syntax.
- In a Gherkin document, the first keyword is usually Feature, followed by a colon and the title.
```
Feature: <title>

As a <role>
I want <functionality>
So that <benefit>
```
- From there, features use the standard user-story syntax:
  - "As some role, I want some functionality, So that I gain some benefit."
    - This is a syntax that most agile teams are using when they define their user stories, so you should recognize this if you follow agile practices.
  - If you write your stories this way on your Kanban board, you can simply cut and paste them into your BDD spec.
- Each feature contains one or more concrete examples, or scenarios.
  - A scenario is a situation that describes a single behavior of a feature, and you use the Given, When, Then syntax to write that description.
    - Each scenario formulates a complete test case for the behavior.
  - You'll run tests against these scenarios when you use the Behave test tool in the labs.
  - Write as many scenarios as you need to describe the various behaviors of the feature.
- What's great about the BDD specification is that this document is exactly what you build together with your stakeholders,
  - and this is the document that you use with a BDD tool like Behave to run your BDD tests.
  - You have one document that everyone can understand, including your test tools.

### BDD Spec Example - Retail Industry
```
Feature: Returns go to stock

As a store owner
I want to add items back to stock when they're returned
So that I can keep track of stock

Scenario 1: Refunded items should be returned to stock
  Given that a customer previously bought a black sweater from me 
  And I have 3 black sweaters in stock
  When they return the black sweater for a refund
  Then I should have 4 black sweaters in stock

Scenario 2: Exchanged items should be returned to stock
  Given that a customer previously bought a blue shirt from me
  And I have 2 blue shirts in stock
  And I have 3 black shirts in stock
  When they return the blue shirt for a replacement in black
  Then I should have 3 blue shirts in stock
  And I should have 2 black shirts in stock
```
1. You start the document with the keyword Feature followed by a colon and then the title.
    - The title should express what this feature is about.
            - It will be displayed by the tool when you run the test cases so that you know which feature the tests are reporting on.
    - This feature's title is "Returns go to stock," so now you know the scope of this feature.
            - It is for handling returns, specifically the expected behavior for returning items to stock.
2. Then below the feature line you have the user story:
    - "As a store owner, I want to add items back to stock when they're returned, So that I can keep track of the stock."
    - The BDD tools do not parse this user story in any way.
        - They just display these lines when executing the tests so that you know the user story for this feature.
3. Next, you have the first scenario.
    - This also has a title that appears when you run this scenario: "Refunded items should be returned to stock."
        - This title lets you know that this scenario is dealing with refunds.
        - A refund is when a customer returns an item and requests to receive their money back.
    - The BDD tool will parse the rest of this scenario.
        - Remember: this scenario is not only for the humans to read but also for the computer to process.
4. Each line will fire a step that executes part of a test case.
    - "part of a test case" because the test case is the entire scenario.
    - The first step in the scenario specifies a precondition: "Given that a customer previously bought a black sweater from me."
        - This sets up the context, which is the initial state of the test.
        - It says that before you run the test, you need a customer, and that customer needs an order for a black sweater.
    - The second step specifies another precondition: "And I have three black sweaters in stock."
        - Remember that the keyword And will take on the meaning of the previous keyword.
            - In this case, the previous keyword was Given, so this step is equivalent to "Given I have three black sweaters in stock."
        - Again, it tells you that before you can evaluate this test, you need to ensure that there are three black sweaters in stock.
    - The third step is "When they return the black sweater for a refund."
        - This is the event that causes something to happen.
        - This step will invoke a return of the black sweater and request a refund from the system under test.
    - Finally, the last step is "Then I should have four black sweaters in stock."
        - This is the test assertion of what the observed outcome should be.
        - In this step, the BDD tool checks to see that the stock actually contains four black sweaters.
            - If it does, the scenario passes.
            - If it does not, the scenario fails.
5. The second scenario is "Exchanged items should be returned to stock."
    - Unlike the first scenario, this second scenario is not about refunds; it's about customers exchanging their purchased item for a different item.
    - "Given that a customer previously bought a blue shirt from me."
        - You know that Given refers to the initial state before running the test.
        - When the BDD tool sees this, it executes a step that ensures that you have a customer and that the customer has an order with a blue shirt in it.
    - "And I have two blue shirts in stock."
        - The And after the Given is like another Given, so the tool will execute a step to ensure that two blue shirts are in stock.
    - "And I have three black shirts in stock."
        - Again, the And is a Given, so the tool will execute a step that ensures that three black shirts are in stock.
        - At this point, you have the initial state with two blue shirts and three black shirts in stock.
    - "When they return a blue shirt for a replacement in black."
        - The When keyword designates the event.
        - This tests the return function to see if it's behaving as expected.
    - "Then I should have three blue shirts in stock."
        - The Then keyword indicates a behavior validation.
        - This step is a test assertion that asserts that, after the previous exchange, three blue shirts should be in stock because the returned blue shirt has gone back into stock.
    - "And I should have two black shirts in stock."
        - Once again, And takes on the meaning of the previous keyword, so this step is the same as "Then I should have two black shirts in stock."
        - Since the Then step measures the outcome, it checks that two black shirts are in stock because one black shirt was removed from stock to exchange it with the blue shirt.

### Tools for BDD
- Many popular programming languages have support from one or more BDD tools.
- The key to selecting one of these tools is starting with the tool that supports the programming language that you're using.
  - For example, if you choose Cucumber, you have to write your step files in Ruby.
  - So, if your project is in Python or another language, Cucumber won't be much help.
- The next important factor is the supported specification syntax.
  - That means, for example, the tool needs to support Gherkin.
    - Not all BDD tools support Gherkin, so you might want to look for the ones that do because Gherkin provides a simple syntax that both stakeholders and developers can easily write and understand.
- Ruby
  - Cucumber
    - Cucumber is probably the oldest tool on the list
    - It has a free and open source and a paid version.
    - It also uses plain text format that you can check into your version control.
    - Cucumber uses the Gherkin syntax for specifications.
      - Gherkin and Cucumber started together, so Gherkin is the syntax that most people will be familiar with for BDD.
    - In addition to Ruby, it also supports Java and .NET as well as web applications developed in any language.
- Python
  - Lettuce
  - Behave
    - If you check the Cucumber website for a Python version, it points you to the Behave website, so you could say that Behave is the Python version of Cucumber.
    - It also supports plain text files that you can check into version control.
    - It supports feature files written in Gherkin and steps written in Python.
    - It also supports environment setup and test fixtures to set up and tear down the environment at different stages, giving you tremendous control over the test environment.
- Java
  - JBehave
    - The Java version of Behave
  - Concordion
    - Concordion is an open source tool for the Java framework.
    - But instead of writing Gherkin files, you write your specifications using a normal language using paragraphs. 
    - It has been ported to other languages including C-sharp, Python, and Ruby.
- JavaScript
  - DaSpec
  - Jasmine/Yadda
- PHP
  - Behat
  - Kahlan
- .Net
  - SpecFlow
- Groovy
  - Spock


## 9-2. BDD using Behave

### Behave Overview
- Folder structure example
  ```
  - features
    - 1st.feature
    - 2nd.feature
    - 3rd.feature
    - 4th.feature
    - 5th.feature
    ...
    - steps
      - web_steps.py
      - load_steps.py
  ```
  - Behave looks for a folder named "features."
    - All of the files that control Behave must be under the top-level features folder.
    - Inside the features folder, Behave looks for files with an extension of .feature.
      - You can name those files whatever you want.
      - You can have multiple feature files or just one; it's up to you.
    - Behave will process each one it finds in the features folder.
  - The features folder also contains a subfolder called "steps."
    - Inside the steps folder is a collection of Python files that have the steps that match the Gherkin statements in the feature files.
      - It doesn't matter what you name these steps files, but most people use "_steps" in the name to signify that they're steps files.
    - Best practice suggests that you place all of the generic steps that manipulate the web interface, regardless of application, into a file called "web_steps.py."
      - This is a recommendation that started with Ruby on Rails and Cucumber, and Rails even generated this web file for you.
    - If you have additional Python files containing steps, you could store them in the steps folder as well.
      - Behave will load all of the steps in the Python files in this folder.
  - Note that there's not a one-to-one correlation between the feature files and the step files.
    - e.g. five feature files with only two step files.
    - As long as the Python steps cover all of the statements in the feature files, everything will work.
  - So to use Behave, first you need to set up your folder structure correctly.
    - You create your features folder and your feature files and your steps folder under that for your Python steps files.
    - Once your folders and files are set up, you run the Behave tool from within the parent of that features folder.
    - Behave reads the steps in each feature file, looks for a matching Python step in the steps files, and executes those functions.
- Step matching example
    - Feature file
        ```
        Feature: <description of feature>

        As a <stakeholder>
        I want <some function>
        So that <I can achieve some goal>

        Scenario: Test something

        Given some known state
        And some other known state
        When some action is taken
        Then some outcome is observed
        And some other outcome is observed
        ```
        - This file contains the scenarios that you built with your stakeholders.
    - Steps file
        ```
        # steps.py
        from behave import given, when, then

        @given('some known state')
        def step_impl(context):
            set_up(some, state)

        @when('some action is taken')
        def step_impl(context):
            perform(some, action)

        @given('some other known state')
        def step_impl(context):
            set_up(other, state)
        
        @then('some outcome is observed')
        def step_impl(context):
            assert(outcome, observed)
        
        @then('some other outcome is observed')
        def step_impl(context):
            assert(other_outcome, observed)
        ```
        - It contains the Python statements that Behave will match to the feature file.
            - Notice that all of the Python functions in this file have the same name: "step_impl."
                - Behave will ignore these function names.
                - It only looks for the Python decorators that wrap the functions.
    1. When Behave begins to execute, it scans the feature file to find the first scenario.
        - Then it processes the first sentence of that scenario: "Given some known state."
        - At this point, Behave looks for a Python step that starts with the Given keyword and has the text "some known state."
            - Behave finds the step in the steps.py file and executes it.
    2. Then Behave looks for the next sentence in the scenario: "And some other known state."
        - Because And comes after a Given, Behave will look in the steps file for a Python step that starts with the Given keyword and matches the string "some other known state."
        - Behave finds the step and executes it.
        - Notice the steps do not have to be in any particular order in the steps file.
            - Behave will find them regardless of the order of appearance in the file.
    3. The next sentence in the feature file is "When some action is taken."
        - This time, Behave looks in the steps file for the When keyword followed by "some action is taken."
        - It doesn't match the Given or Then steps even if they have the same text.
        - A When in the feature file will only match a When in the steps file.
            - Behave finds the step and executes it.
    4. Next, Behave processes "Then some outcome is observed."
        - It looks for a Then step with the text "some outcome is observed," and it executes that function.
    5. Finally, it processes "And some other outcome is observed."
        - Because the And keyword follows the Then, Behave looks for a Then step with the text "some other outcome is observed" and executes it.
- Behave reads through each scenario of a feature file, step by step.
    - It processes each step's keyword and text string, finds a matching keyword and text string pair in the Python steps file, and it executes that function.
    - It's simple yet eloquent.

### Behave Test Fixtures
- Behave has a set of test fixtures that you could run before or after feature scenarios, steps, or tags to control the test execution environment.
  ```
  before_all(context)
  after_all(context)
  ```
    - As their name implies, any code you place in these fixtures will execute once before all the features and then again after all the features.
    - This set is ideal for setting up web drivers from tools like Selenium. 
      - With Selenium drivers, you can use a real browser to perform your testing.
    - This set is also ideal for establishing the context values that all the steps can access and for shutting down any drivers after Behave processes all the features.
  ```
  before _feature(context, feature)
  after_feature(context, feature)
  ```
    - These functions run before and after each feature.
      - Every feature pass-in is an instance of the feature class.
    - If you use multiple features, this set can be ideal for setting up a clean environment before and after each feature runs.
  ```
  before_scenario(context, scenario)
  after_scenario(context, scenario)
  ```
    - These functions run before and after each scenario.
      - The scenario is passed in as an instance of the scenario class.
    - With these functions, you could have even more granular control over each scenario execution environment.
  ```
  before_step(context, step)
  after_step(context, step)
  ```
    - These run before and after every step.
      - The step passed in is an instance of the step class.
      - Very granular control
  ```
  before_tag(context, tag)
  after_tag(context, tag)
  ```
  - You can tag sections of your feature file with a name and then these functions run before and after the section tag with a given name.
    - Behave invokes tags by the order they're found in the feature file.

### Behave Environment Setup
- You set up your behave environment and a file called environment.py, and this is where you declare your test fixtures.
  - This one file environment.py controls the environment at whatever level of granularity you need.
```
# environment.py

from os import getenv
from selenium import webdriver

WAIT_SECONDS = int(getenv('WAIT_SECONDS', '60'))
BASE_URL = getenv('BASE_URL', 'http://localhost:8080')

def before_all(context):
    """ Executed once before all tests """
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")    # Bypass OS security model
    context.driver = webdriver.Chrome(options=options)
    context.wait_seconds = WAIT_SECONDS
    context.driver.implicitly_wait(context.wait_seconds)    # seconds
    context.base_url = BASE_URL

def after_all(context):
    """ Executed after all tests """
    context.driver.quit()
```
1. You start with your imports. You need to import any configuration parameters from the environment.
2. You should declare any global variables you want to get from the environment.
    - In this example, you get an environment variable called wait_seconds that controls how long Selenium waits for a response from the UI.
    - You will also get an environment variable called Base_URL that tells you the location of the system under test.
        - By changing the base URL environment variable, you can point Behave to your local computer or any remote computer that you want to test.
3. The first function you define is before_all, which will run before Behave processes any feature files.
    - Notice that this function has one parameter passed in the context.
        - This context will be passed to every step in your test suite. Therefore, anything you assign to this context will be available to all of the steps.
    - The first item you define in place in the context is the WebDriver.
        - You set the options to use Headless Chrome driver, but you could have used Firefox or Safari driver or any number of other drivers.
        - The only prerequisite is that web browser is installed in the test system that's running Behave.
    - You assign this driver to a variable called driver in the context.
        - Again, this context is parsed to each step, thus, all the steps will have access to the WebDriver by simply referencing context.driver and we'll use it to drive their actions on the UI.
    - Next, you save the wait_seconds global variable in the context.
        - That way, all the steps can access it to know how long to wait for the UI to respond.
    - You then set an attribute on the WebDriver to implicitly wait this number of seconds by default.
    - Finally, you create a variable called base_ URL in the context and set it to the global variable base_URL that you got from the environment.
        - This way every step, we'll know what URL to run the test against. 
    - All of these Python statements will execute once before Behave processes any of the feature files.
        - Together these statements set up the initial environment for running the BDD tests.
5. The last function that you define is, after_all, and it has one line of code, context.driver.quit.
    - This function tells the web browser to close down after all tests are complete, ensuring that you don't leave multiple web browsers running in memory afterwards.
    - Obviously, you could add more text fixtures to this file and you can have them execute before and after each feature, scenario, step, or tag.

### Tips for Writing Feature Files
- Strive for consistency.
  - Remember that Behave uses string matching to find the Python steps to execute.
  - Say you have the string "I see" in one Gherkin statement and "I should see" in another.
    - These are two different strings, so you will need to write two separate Python steps to match them, one for each string.
    - But if those strings are executing the same code, just choose one of the strings to use in your feature file.
  - Be consistent so that you don't need to write duplicate Python steps.
- Consider the user experience.
  - You're describing the behavior that you want the user to see.
  - If you have a field on the interface called "Customer ID," use that exact name in the feature file.
    - Some developers write feature files that might use a variable name like "customer_id" because that's the field behind the scenes that gets updated.
      - The problem is that your stakeholder isn't going to know what you're talking about because the field that they see on the screen is "Customer ID".
  - Always write the feature files as if you were explaining how to use the feature, not what the feature does under the covers.
- Build in cues that signal that the system has responded to a request.
  - These cues can help with latency issues when you're testing remotely.
  - For example, say you're checking that a Search/Submit button works when someone clicks it.
    - Make sure that you have an on-screen status that gets updated once the request is complete.
      - That way, you can tell the testing tools to wait for the status before checking the results.

### Feature File Example
- This pet shop wants to allow customers who come to their website to be able to search for pets by category.
```
Feature: Search for pets by category
As a pet shop customer
I need to be able to search for a pet by category
So that I only see the category of pet I'm interested in buying

Background:
    Given the following pets
        | name    | category  | available |
        | Fido    | dog       | True      |
        | Kitty   | cat       | True      |
        | Leo     | lion      | False     |

Scenario: Search for dogs
    Given I am on the "Home Page"
    When I set the "Category" to "dog"
    And I click the "Search" button
    Then I should see the message "Success"
    And I should see "Fido" in the results
    But I should not see "Kitty" in the results
    And I should not see "Leo" in the results
```
1. You start by writing your feature file with the keyword Feature, followed by the title "Search for pets by category."
2. Next, you add the user story: "As a pet shop customer, I need to be able to search for a pet by category, So that I only see the category of pet that I'm interested in buying."
3. Next, you use the keyword: "Background."
    - Sometimes several scenarios in the same feature start with the same context.
    - Background is a test fixture that you can use to specify the context once and then establish it before every scenario in the feature.
    - Typically, you use Background with one or more Given statements to set up the initial testing state, but you can use any keyword that fits.
        - In this example, you use, "Given the following pets."
            - This Given statement is just like any other. Behave will search all of the Python step files for a Given decorator followed by the string, "the following pets."
        - Under the Given statement, you create a data table.
            - You have to indent the table to associate it with the Given statement.
            - To set up a working table, you must delimit its columns with vertical bars and use its first row to designate the column names.
                - In this example, you have three column names: name, category, and available.
                - The other rows contain the data that you want the table to have at the beginning of every scenario.
            - Remember: since you included this table in the Background test fixture, its data will reload for each scenario.
                - So, for example, if one scenario deletes one of the pets, Behave will reload that table and that pet will be there for the next scenario.
4. Now you can write a scenario.
    - You want to describe what happens when a customer at the pet shop website's homepage enters "dog" into the category field and clicks the "Search" button.
    - You start with the Scenario keyword, followed by a title for this scenario: "Search for dogs."
    - Next, you set up the initial state with a Given keyword: "Given I am on the home page."
        - This will be your starting point.
    - Next, you add the event: "When I set the 'Category' to 'dog.'"
        - This statement does more than describe the action of the user.
            - It also tells the developers that on the home page, they need a field of some kind where the user can specify the text "dog" as the search criteria.
        - The second part of the event is "And I click the 'Search' button."
            - Now the developers know that in addition to a category field, they need to provide a search button.
        - These two sentences give a lot of information about what is needed on the home page for this scenario.
5. Now it's time for your measurable outcome. 
    - You start with "Then I should see the message 'Success.'"
        - It's easy to tell someone to look at a data table and notice if something has changed.
        - But it's harder to tell a web browser driver like Selenium to do that.
            - You need to be more specific.
            - For this reason, you should build in on-screen cues and a status like the "Success" message that signals that the results from taking the action have completed.
                - So you wait until you see the "Success" message, indicating that the search is complete.
6. Finally, you add a few assertions to ensure the user gets the correct results.
    - The first assertion indicates what the user is looking for: "And I should see 'Fido' in the results."
        - How do you know that Fido should be in the results?
            - You check the table in the background statement.
            - The table has a dog named Fido, a cat named Kitty, and a lion named Leo.
        - This situation shows why specifying the test data in the background statement is so helpful.
            - It lets everyone know what the initial state of the system is.
    - The next two assertions indicate what the user is not looking for.
        - One assertion is "But I should not see 'Kitty' in the results;"
        - the other is "And I should not see 'Leo' in the results."
            - Notice the consistency in the assertions:
                - You consistently use phrases like "I should see" and "I should not see."
                    - This way, you will have fewer Python steps to write. 

### Selenium
- Selenium is a collection of tools for automating web browser activity.
    - At its core, Selenium is a WebDriver, an interface to write instruction sets that you can run interchangeably across popular browsers like Chrome, Firefox, Safari, and Edge, just to name a few.
    - With only a few lines of code, you can control a web browser just like a real person would.
        - You can enter data into fields, read data back from fields, click links, click buttons…everything a real user can do.
        - This control makes Selenium perfect for integration testing of multiple microservices that share a common user interface.
    - Selenium saves hours of running these tests manually.
1. To initialize Selenium, first, you must have the web browser that you want to use installed on the test system.
    - If you want to test with Chrome, you need to have Chrome installed.
    - If you want to test with Firefox, you need to have Firefox installed.
    - Selenium uses a real web browser, not emulation, so you need to install the actual web browser software.
2. Next, you instantiate a driver of the same type: a driver for Chrome, Firefox, or whatever other browser you want to use.
    - In this example, I'm setting up some options for the Chrome driver.
        - One option is that the driver is headless, which means I don't want the browser GUI to show up.
        - Another option turns off security features like sandboxing that might interfere with testing.
    - Then I create a Chrome driver with those options.
4. To use Selenium, you must first tell it which element on the HTML page you want to interact with.
    - Selenium can find elements by class name, CSS selector, id, name, Xpath, links, partial links, text, tag names - that's a rich set of selectors to choose from.
    - Selenium for Python has function calls for each of these selectors.
        - Selenium also has a version, "find_by_elements" with an "s," that finds multiples of the elements on the web page. In this example, we'll keep it simple and only use find_element_by_id().
- Example: Initial setup
    ```
    from os import getenv
    from selenium import webdriver

    BASE_URL = getenv('BASE_URL', 'http://localhost:8080')

    def before_all(context):
        """ Executed once before all tests """
        options = webdriver.ChromeOptions()
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")    # Bypass OS security model
        context.driver = webdriver.Chrome(options=options)
        context.base_url = BASE_URL

    def after_all(context):
        """ Executed after all tests """
        context.driver.quit()
    ```
- Example: Find element by id
    ```
    def step_impl(context, text_string):
        """ Get the value of a text filed """
        element = context.driver.find_element_by_id('customer_id')
        assert text_string in element.get_attribute('value')
    ```
    1. You start with a function that is a step implementation for finding an element by its id.
        - This function has two parameters.
            - One is the context, which is passed into each Python step.
            - The other is a text string to look for, which is an additional parameter that you need for a selector method.
    2. Next, you create a variable called element and you assign it the results of calling find_element_by_id() on the driver, passing in the name of the element id that you're looking for: "customer_id."
    3. Then you specify what happens when Selenium finds this element.
        - You assert that the text string must be present in the element's value attribute.

- Example: Enter text into a field
    ```
    def step_impl(context, text_string):
        """ Update the value of a text field """
        element = context.driver.find_element_by_id('customer_id')
        element.clear()
        element.send_keys(text_string)
    ```
    1. When find_element_by_id() is called, the function will search the HTML for an element that has an id of "customer_id" and will return that text input element.
        - This element becomes the one that you are manipulating in your code.
        - You could have used a method to find elements by name, class, Xpath, or any other method.
            - Using the ids can be the most accurate because you can easily control their uniqueness and they don't change if you move elements around on the page.
    2. Once you find an element, you can do more with it than just inspect its contents.
        - You can clear that element and then type the text string into the input field using the send_keys() function.
        - This is most of what your test cases do; they look for text, enter text, and click buttons and links.
- Example: Wait for a value
  ```
  WAIT_SECONDS = 60

  def step_impl(context, text_string):
      """ Wait for the value of a text field """
      found = WebDriverWait(context.driver, WAIT_SECONDS).until(
          expected_conditions.text_to_be_present_in_element_value(
              By.ID, 'customer_id'), text_string
      )
      expect(found).to_be(True)
  ```
  - Often, you experience latency when testing in a web UI, so you need to wait for something to appear.
    - Luckily, the web driver has a WebDriverWait function to do just that.
      - It tells the driver to wait a certain number of seconds for something to appear.
  - It looks like a lot of code, but it's very helpful when making calls to remote applications that may involve latency.


### Writing Step Files
- Step files are Python files containing functions that match the Gherkin statements in the feature file.
- The Behave tool provides a set of Python decorators to use in matching Given, When, and Then.
- When Behave finds a Given statement in the feature file, it searches the step file for
a function annotated with the @given decorator, containing a matching string.
  - When Behave finds a match, it executes that function.
- Process
    1. You write a step for each Gherkin statement in your scenario.
    2. Implement the step in Python,
    3. And repeat until all of the statements have steps.
- Feature example
    ```
    Feature: The pet store catalog service
        As a Pet Store Owner
        I need a RESTful catalog service
        So that I can keep track of all my pets.

    Scenario: The website is up
        When I visit the "Home Page"
        Then I should see "Welcome to the Pet Shop" in the title
        And I should not see "404 Not Found"
    ```
- Step file example
    ```
    from behave import when, then

    @when('I visit the "Home Page"')
    def step_impl(context):
        """ Make a call to the base URL """
        context.driver.get(context.base_url)

    @then('I should see "Welcome to the Pet Shop" in the title')
    def step_impl(context):
        """ Check the title for Welcome message """
        assert "Welcome to the Pet Shop" in context.driver.title
    
    @then('I should not see "404 Not Found"')
    def step_impl(context):
        """ Check the body for error message """
        element = context.driver.find_element(by.TAG_NAME, 'body')
        assert "404 Not Found" not in element.text
    ```
    1. You start by importing the when and then decorators from Behave.
        - Since you don't use the Given keyword in the feature file, you don't need to import the Given keyword decorator here.
    2. Next, you have your first Python step.
        - You use the @when decorator with the string 'I visit the "Home Page"'.
            - This code indicates that Behave should invoke the function that follows when looking for a match for the statement "When I visit the home page."
        - To implement this step, first, you define a function inside it called step_impl(), passing in the context and adding the appropriate docstring.
            - You use step_impl() inside every step because Behave doesn't use the function names for matching; it only matches based on the text string in the decorators given, when, and then.
        - Let's think about how you should implement this step.
            - In the environment.py file, you added a web driver and a base URL to the context and called them context.driver and context.base_url, respectively.
            - Now it's time to use those variables. 
                - The WebDriver has the methods get, put, post, and delete to make the corresponding HTTP verb requests.
                - In this step, you want to get the home page, which is represented by the base_url. So you add the statement context.driver.get(context.base_url).
                    - This statement will make an HTTP GET request to call the base URL and return the home page.
        - Notice that you didn't make any assertions in this step.
            - In test driven development, every function is a test case and has an assertion.
            - But in BDD, each step is just one part of a test case; it's not an entire test case itself.
                - One step may be to set something up, like a state, and the following step asserts something about that state.
        - In this first step of this example, you implemented the action specified by the statement: to visit the home page.
            - In the following steps, you make assertions about the home page.
    3. For the next step, we use the decorator @then with the string 'I should see "Welcome to the Pet Shop" in the title'.
        - This step will match the second statement in your scenario.
        - Again, you define a step_impl() function, passing in the context, and adding the appropriate docstring.
        - Next, to finish this implementation step, you assert that the string "Welcome to the Pet Shop" is in the title of the web page that the web driver brings back.
            - This title is held in context.driver.title.
    4. For the last step, you use the @then decorator again.
        - You do this because in the feature, this statement has an And keyword and the statement before it has a Then.
        - You add the string 'I should not see "404 Not Found"'.
        - This step will match the third statement in your scenario.
        - You define a function for this, passing in the context and an appropriate docstring.
        - To finish implementing this step, first, you must find the body element of the web page's HTML.
            - You use the find_element() function on the web driver and specify that the function should look for the tag named 'body'.
                - You save that element as the variable called element.
            - Then you assert that the string "404 Not Found" is not in the element's text.

### Loading Test Data
- Test cases often need test data. There’s a simple way to specify test data for Behave
directly in your feature file using the Background section.
  - In Background, you can specify the initial state and the data you want to start with.
  - The only problem is that the data doesn’t load itself; you need to load it manually.
    - You might ask, “How do I do that?”
  - Behave puts the data in a variable in the context called table.
    - That means you can iterate over context.table and extract the data.
- Example
    ```
    Feature: Search for pets by category
    As a pet shop customer
    I need to be able to search for a pet by category
    So that I only see the category of pet I'm interested in buying

    Background:
        Given the following pets
            | name    | category  | available |
            | Fido    | dog       | True      |
            | Kitty   | cat       | True      |
            | Leo     | lion      | False     |
    ```
    - Notice that it has a Background section that says, “Given the following pets” and includes a table of pets delimited by vertical bars.
        - The first row of this table contains the column names: name, category, and available.
        - When Behave loads these into context.table, each row will be a Python dictionary with a name key, category key, and available key.
            - Thus, you can pull the data from the table by using the column names.
        - The rest of the table is data that gets loaded into context.table.
            - Each row will be a dictionary with the data for that row.
- Loading data from context.table
    ```
    @given('the following pets')
    def step_impl(context):
        """ Load the database with new pets """
        for row in context.table:
            payload = {
                "name": row['name'],
                "category": row['category'],
                "available": row['available'] in ['True', 'true', '1']
            }
            context.resp = requests.post(
                f"{context.base_url}/pets",
                json=payload
            )
            assert context.resp.status_code is 201
    ```
    1. You start with the decorator given with the string “the following pets.”
        - This line will match the statement “Given the following pets” in the feature file.
    2. Next, you define a function to implement this step, pass in the context, and add an appropriate docstring.
    3. Now, you want to iterate over context.table using a for loop.
        - This loop will give you back every row in the table as a dictionary named row.
    4. Next, you create a variable called payload.
        - Payload is also a Python dictionary, and you will start to fill it with the columns from the table.
        - You start by making a key called name.
            - For the value, you assign the data from the current row that also has the key called name.
        - You take the same approach with category.
            - You create a key called category and assign it the data from the current row that has a key called category.
        - Available is a little different because it’s a Boolean: “True” if the pet is available, “False” if it is not.
            - So, you need to convert the table data from a string to a Boolean. 
                - You start by creating a key called available.
                - You then assign it the data from the current row that has a key called available, but you don’t stop there.
                - You evaluate this data to include strings of true with a capital T, true all lowercase, and the number one.
                        - In other words, data of either of those strings will evaluate to the Boolean True and set available to True.
    5. Now that you have your payload dictionary with the name, category, and available data, you need to create a pet from it.
        - Because you are remote from the server you are testing, you must make an HTTP request to the server’s REST API.
        - To do this, you make a post request to your service’s REST API to create a pet.
            - The first argument is a string composed of the base URL in the context followed by /pets.
                - You use /pets because it’s the endpoint for creating a pet in a RESTful API.
            - You specify a second argument as json=payload, which will send the Python dictionary called payload as a JSON string to the REST API.
                - Notice that you are saving the response from this post in the context so that other steps can examine it if needed.
    6. Finally, you assert that the status code in the response is a 201, which is the status code for a successful creation for a REST API.


### Generating Steps with Behave
- Something that’s great about the Behave tool is that it can generate steps for you.
  - They could be the initial steps when you’re just starting out or any steps that are missing as you’re working on your feature scenarios.
- Just run Behave against your feature file and it will show you the missing steps.
  - If you haven’t written any steps, then the first time you run Behave, all of the steps are missing.
    - If this is the case, Behave will actually seed your development efforts with a set of suggested steps.
      - With this code, you have the starting point for building your steps file.
- e.g. “search for dogs” scenario.
    1. You start with a feature file.
    2. Once you create this feature file, you run Behave.
    3. You get output.
        - Behave tells you, “You can implement step definitions for the undefined steps with these snippets.”
        - And then it gives you snippets of code that you can cut and paste into a steps file as a starting point.
            - Notice that each set has a proper decorator keyword indicating the type of step: Given, When, or Then.
            - The remainder of the sentence is passed in as the string to match.
            - Also, notice that each implementation simply raises a NotImplementedError exception.
    4. Obviously, you need to replace these with real steps code.
        - The important point is that you can create a steps file from this output to give you a starting point for your steps.
        - This way, you know that all of your scenarios are covered. 

### Implementing Initial Steps
1. You start by creating a steps file from the generated steps.
2. You run Behave and you observe that the first step fails - because all it does is raise an exception.
3. Then, you implement the first step to make it pass and you run Behave again to make sure that it passes.
4. You repeat this process for the remaining steps until they all pass.


### Working with Context
- The context variable is passed into every step definition, so all of the step functions that you write will have a variable called context as the first argument.
  - You can think of it as a container or a bag to put stuff in, take stuff out, and pass it around.
  - It exists for the duration of the entire feature file and all of the steps.
    - Every step called from the feature file will share the same context.
    - That lifespan makes context useful for passing information from one step to the next--or any future step that might need that information.
- Python Flask test client Example
    ```
    @given('the server is started')
    def step_impl(context):
        context.client = app.test_client()
    
    @when('I visit the "home page"')
    def step_impl(context):
        context.response = context.client.get('/')

    @then('I should see "{messsage}"')
    def step_impl(context, message):
        assert message in str(context.response.data)
    ```
    1. The first step in this file is “Given the server is started.”
        - This one line of code gets a test client from the Flask app and stores it in a context variable called context.client.
        - Now any future step can get the test client simply by referencing context.client.
    2. The next step does just that.
        - It calls a get() method on the context.client to get the root URL of the application under test.
        - It stores the results from that call in another context variable called context.response.
            - Now any other step that needs to inspect the response of this get() request can find it in context.response.
    3. The next step function does exactly that.
        - It references the data attribute of context.response and asserts that the message string passed into the function can be found somewhere in the data.

- Selenium clipboard example
    - Occasionally, you need to copy information from one field and paste it into another, but unfortunately, Selenium doesn’t support clipboards.
    ```
    @when('I copy the "{element_name}" field')
    def step_impl(context, element_name):
        element_id = element_name.lower().replace(' ', '_')
        element = context.driver.find_element_by_id(element_id)
        context.clipboard = element.get_attribute('value')

    @when('I paste the "{element_name}" field')
    def step_impl(context, element_name):
        element_id = element_name.lower().replace(' ', '_')
        element = context.driver.find_element_by_id(element_id)
        element.clear()
        element.send_keys(context.clipboard)
    ```
    1. The first step is “I copy the element_name field”.
        - This step uses a variable substitution, which is a way to pass in an element name that will be used as the source of the copy.
            - The first line in this step calculates the element ID for that name.
            - The second line makes a call to context.driver.find_element_by_ID, passing in the element ID to get the actual element.
            - The third line calls the get attribute on that element requesting the value, and here’s where the copy happens.
        - It stores that value in a variable called context.clipboard, "clipboard" here, you can call it anything.
            - Now, any future step can inspect context.clipboard and see if anything has been copied there.
    2. Next, we have a step that does the paste function: “I paste the ‘element_name’ field”.
        - Once again, it calculates the field’s name and then calls context.driver.find_element_by_ID, passing in the element ID to get the actual element.
            - Once the step has the element, it clears it in preparation for the paste.
        - This last line is where the paste happens.
            - It calls send_keys() on the element, passing in the context.clipboard variable, which contains whatever was stored there by the copy clipboard step.
            - Notice that these two steps are very generic.
                - They can take any element’s value, store it to the simulated clipboard, and then send that value to any element as keystrokes.

### Variable Substitution
- You can use variable substitution to make your Python steps more generic.
  - Often you have sentences in your feature file that only differ by a name field or a value, and they have identical implementations except for this name or data value.
  - By changing these words in the sentence to variables, you don’t need to write as many Python steps because one step can now match multiple sentences in your feature file.
    - This leads to greater reuse, and it’s always a good idea to make steps as generic as possible for maximum reuse.
- The rules for substituting a variable are simple.
  - You start with two curly braces.
  - When Behave sees an open curly brace in the step string, it knows that what comes after it until the closed curly brace will be a variable name.
  - Next, you create a variable name to replace the data in the string.
    - As usual with Python variable names, you can’t have spaces in them, but you can delimit them with underscores.
  - Then in the string, you substitute the variable name enclosed in curly braces.
  - Behave will take whatever text that shows up in the position and assign it to the variable by that name.
  - This variable then gets passed into your function as a parameter.
- Maximum reuse
  - Replace many steps with one generic step
  - Place generic steps in web_steps.py
  - Reuse them in all your applications
- e.g.
    ```
    When I set the "name" field to "Maxwell"
    And I set the "category" field to "Dog"
    And I set the "available" field to "True"

    @when('I set the "{element_name}" field to "{text_string}"')

    def step_impl(context, element_name, text_string):
        element_id = element_name.lower().replace(' ', '_')
        element = context.driver.find_element_by_id(element_id)
        element.clear()
        element.send_keys(text_string)
    ```
    1. You start with the @when decorator and the string with the two variables defined.
        - In your step implementation, you add two additional parameters with the same variable names as the variables in the step string.
        - You can now use these variable names in your function as substitutes for whatever strings are passed in from the feature file.
            - Remember that the element ID will be the lowercase version of the field name.
                - So you add a line of code that takes the lowercase version, and to ensure that you have a valid HTML ID, you replace any spaces with underscores.
            - You assign the ID to a variable called element_id.
    2. Then you call context.driver.find_element_by_ID and pass in that element ID to get the actual element.
    3. Once you have the element, you clear it to make sure that it has no data before you send new data.
    4. Lastly, you call send_keys() on that element and pass in the text_string variable.
        - That text_string variable will contain whatever text is enclosed in the double quotes in the feature file statement.
            - Using double quotes gives a helpful visual representation of how the string will be parsed.
    5. Now Behave can match all three of the feature file’s statements with just one step function, and all of them will manipulate the correct field and send the correct data.