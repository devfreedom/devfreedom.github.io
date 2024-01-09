---
title: "[Study Note] Coursework: DevOps and Software Engineering - TDD"
date: 2024-01-08T20:31
thumb: "devops.jpg"
tags: 
    - ❮Study Note❯
    - DevOps
    - software engineering
    - test-driven development
---

# 8. Test-driven Development

## 8-1. Testing
- Testing is important, and automated testing is critical for DevOps.
- It has to do with building your continuous integration and continuous deployment pipelines
  - and making sure that we can test the code that we are about to automatically deploy to production.
- Software engineering was born by Margaret Hamilton of NASA in 1969.
  - They developed the onboard guidance software for Apollo 11 mission and she coined the term "software engineering".
  - Principles
    - Use a high-level language
      - higher-level language that expressed algebraic formulas made calculating trajectories easier and less error-prone
    - Divide into jobs
      - e.g. routines, subroutines, macros
    - Restart on failure
      - e.g. automatic container refresh in k8s
    - Checkpoint good state
      - That way, if the job has to restart, it restarts from the last checkpoint and keeps going
      - e.g. stateless containers with states saved to external storage
    - Hardware monitors the software
      - We now have preemptive multitasking systems, which solves this problem today in mostly the same way.
    - Send telemetry
      - 1202 Program Restart alarm almost caused a mission to abort of the Lunar Module,
        - but because the telemetry data was still streaming back to Houston, they could determine that the Lunar Module was still on the correct flying trajectory and that it was OK to continue landing.
      - Today we stream logs from our software and collect real-time metrics to understand what is happening during runtime.
- You need to test software to know that it works.
- Testing leads to a system that is more robust and resilient to failure.
- You can only test what you know.

### Why Developers Don't and Should Test?
- Why developers don't test?
  - They already know the code works...
    - But think about others who work on your code in the future, including the future YOU.
  - They don't write broken code...
    - But the system is constantly churning underneath you.
      - Vulnerabilities are being patched and new libraries are being upgraded.
      - Unless you have test cases to test your code and make sure that it works with a new version of that library, you probably shouldn't update.
- Why do we need tests?
  - You never know where your code is going to show up.
    - You want to be sure that however your code is used, it will behave exactly as expected. 
    - Testing ensures that your code behaves as expected when others use it. 
  - Testing saves your time.
    - The time you spend writing a few test cases now is going to save you hours and hours of debugging later. 
  - You want to make sure your code is solid.
    - Testing prevents future code breaks and compatibility issues.

### Testing Levels
1. Unit testing
    - At this level of the software testing process, you test individual units or components of a software system.
        - You are passing in various inputs and expecting the proper outputs.    
        - The purpose of these tests is to validate that each unit performs as designed.    
            - "Is my module working?"
    - This is what a single developer does in their single module.
        - Unit testing requires intimate knowledge of how the module works.
        - You are completely aware of what's going on inside each module and you want to test both of what we call "happy" paths and "sad" paths.
            - The happy paths are where you pass in good data and everything works as expected.
            - The sad paths are where you pass in bad data or data that causes alternate paths; you do this to make sure the paths run correctly and to trap errors.
                - So if you know there is an if, then, else statement in the module, you want to write a test case that tests the "if" path and tests the "else" path.
                - If the module has code to catch an exception, you want to be sure that you write a test case that causes the exception so that you can test that the exception handlers work correctly.
    - If you are familiar with continuous integration (CI), these are the tests that run in the CI server when you integrate your code to let you know if you broke something.
    - This is the level at which you perform Test Driven Development. 
2. Integration testing
    - At this level of the software testing process, you're combining individual units and testing them as a group.
        - The purpose of this test is to expose flaws in the interaction between integrated units.
        - At this level, you are testing several modules to make sure that they work together and see how they behave with various inputs.
    - You probably don't know anything about the inner workings of these modules like you did with unit testing. But it's a good thing.
        - Maybe the modules work correctly on their own, but they don't talk to each other correctly.
        - "Are they calling each other's API correctly?"
    - This is the level at which you perform Behavior Driven Development.
        - You are testing the behavior of several modules that make up the system together.
3. System testing
    - At this level, the entire software process is tested: you test a complete, integrated system.
        - The purpose of this is to evaluate the system's compliance with the specific requirements and to make sure the whole system works together.
        - This is the level where you're putting the whole system together.
    - In integration testing, you're still probably in a development environment. 
        - But in system testing, you've probably moved into a staging or pre-production environment that looks more like production.
            - You're making sure that the whole system works together.
4. User acceptance testing
    - At this level of the software testing process, the system is tested for acceptability.
        - The purpose of this test is to evaluate the system's compliance with the business requirements and assess whether it is acceptable for delivery.
    - This test is often done by the end user before they can say, "Yes, I accept this system."
    - This testing is usually performed in the same or similar environment as the system testing, but it may be a special environment that only users have access to. 
 
### Traditional Release Cycle
1. Development environment
    - Unit testing
2. Source Code Management(SCM) system
    - e.g. Git, SVN
3. Build environment
    - Compiling code artifacts
    - Further unit testing
4. Package repository
    - e.g. Java jar files, Python wheels, Docker images
5. Testing environment
    - Component testing
    - Integration testing
    - Performance testing
6. Stage environment
    - Performance testing
    - User acceptance testing
7. Production environment
    - Performance testing
    - System testing

### Test-driven Development (TDD)
- TDD focuses on how the system works from the inside. 
- Your tests drive the design and development of your code.
  - You don't write code and then write tests. You write the tests first. 
    - You write the tests for the code you wish you had, then you write the code to make the tests pass. 
    - You describe how the code should behave and then you write code that behaves that way.
    - The test case describes the behavior that you want the code to have. 
- This keeps you focused on the purpose of the code.
  - You should absolutely be able to specify that before you start writing any code. 
- TDD is a lower level of testing
  - TDD is testing the functions inside the system.
    - e.g. "Did the right call get called?"
      - Did the right return come back?
      - Did it bring back the right data in the right format? 
    - TDD ensures that you are building the thing right.
      - It's making sure that each component is working correctly
        - "Does each feature perform the task that it was intended for?"

### Behavior-driven Development (BDD)
- BDD focuses on the behavior of the system as observed from the outside, not the minutia of how the system works from the inside
  - Great for integration testing to see if all of the components are behaving together
- It forces you to think "from the outside in."
  - In other words, you implement only those behaviors that contribute most directly to business outcomes. 
- It describes behaviors in a single syntax, a syntax that domain experts, testers, developers, and customers can easily understand.
  - This improves communication across the team. 
- BDD is a higher level of testing.
  - BDD is testing the outside behavior of the system while looking at the system from a consumer's perspective.
    - e.g.  "When I add something to my cart, does it appear in my cart?"
      - I don't care what API was called, and I don't care about the data that was transferred.
      - I just care that what I expect to appear in my cart does it appear in my cart. 
  - BDD makes sure that all functions and units work together at a higher level.
  - BDD ensures that you are building the right thing.
    - "Do you have the right set of capabilities and behaviors?"

### TDD and BDD 
- TDD is used for unit testing.
- BDD is used for integration and acceptance testing.
- When developing, you are going to cycle back and forth between TDD tests, BDD, and then TDD again.
  - They are coming from opposite directions, but you need both because they complement each other throughout the development lifecycle. 
    - TDD ensures that you are building the thing right. 
    - BDD ensures that you are building the right thing

### Testing is Important
- Developers use test cases to make sure their code works correctly.
- Robust testing is the difference between writing a line of code as a hobby and applying good
software engineering practices for developing code that you want to put into production.
  - In production, your function will be called and you don't know who's going to call it, or what's going to be passed in.
    - So you must code defensively and you must write test cases for as many possible outcomes as there are ways to break your code.
- "Code that hasn't been tested shouldn't be trusted."
    - If you can't prove to me with a test case that it works, then as far as I'm concerned it doesn't work.
    - It may look like it works, but if you throw some goofy data at it, it's going to blow up. You don't want that happening to your code.
- Test cases force us to think about what ways in which our code can break, and then write test cases to make the code break, and then write the code needed to make the code again, fail gracefully, and get the test cases to pass. 
  - Test cases help developers identify and fix parts of their code that can break. 

### Testing Case Study
- e.g. Triangle area calculator in Python
  ```
  def area_of_a_triangle(base, height):
      return (base / 2) * height
  ```
  - You will never know what's going to get passed in.
    - `TypeError: unsupported operand type(s) for divide`
    - What to do?
      - Type hinting
      - Input validation
          - Type check
          - Range check
  - Let's do testing.
    ```
    def area_of_a_triangle(base: float, height: float) -> float:
        """Calculates area of a triangle given non-negative numbers"""      # Type hinting

        # Check if we have the correct parameter types                      # Type check
        if type(base) not in [int, float]:
            raise TypeError("Base must be a number)
        if type(height) not in [int, float]:
            raise TypeError("Height must be a number")

        # Check if we have the correct parameter values                     # Range check
        if base < 0:
            raise ValueError("Base must be a positive number")
        if height < 0:
            raise ValueError("Height must be a positive number")
        
        return (base / 2) * height
    ```


## 8-2. Test-driven Development
- Test driven development means that your unit test cases drive the design of the code that you are developing.
  - This keeps you focused on how your code will be called and what the caller expects in return. 
  - e.g. Anecdote 1
    - "I was working deep in the API and I needed some data. So I added it as a parameter to the call. Then I needed some other data and I added that as a parameter. And then when I was done, I thought I had created this great API."
      - "But when I went to write the test case for it, I realized that as the caller, I didn't have half of the data that I needed to call my code. It was a horrible API, but I didn't know it until I took the consumer view of my code and tried to call it."
  - TDD requires you to think about what the consumer of your API is going to want to pass in, and what results they expect to get back out. It keeps you customer focused. 
- You can think of TDD as your design document. 
  - e.g. Anecdote 2
    - "When I first took a course on TDD, the professor gave us a test case and told us, "You need to write a program, but I'm not going to tell you what the program does. Here are the test cases. Write the program and then submit it." 
      - "I thought this guy was crazy! And then I started reading the test cases and understanding what they expected of the code. Then I started to write the code and meet those expectations. It was very similar to following a design document. Then it hit me, "TEST DRIVEN DESIGN." The test cases WERE the design!"
  - TDD keeps you focused on the purpose of the code.
    - What is it supposed to do?
    - What inputs does it need?
    - What are the outputs that should be produced?
  - You write test cases that document this behavior and then you write the code to exhibit that behavior and make the test case pass. 

### TDD Workflow
1. Red
    - Write a failing test case for the code you wish you had.
    - This expresses how to call the code and what you expect in return.
2. Green
    - Then you write just enough code to make that test case pass.
    - It doesn't have to be perfect. It doesn't have to be pretty.
        - However, it does have to make the test case pass.
3. Refactor
    - Then, now you refactor the code to improve the quality.
    - Maybe you initially returned a fixed value and now it's time to calculate the real value.
4. Finally, repeat the process.
    - This entire workflow is known as Red/Green/Refactor.
    - Many testing tools follow this scheme.
        - These tools output failing test cases in red and passing test cases in green.
            - This is how Red/Green/Refactor got its name. 

### TDD and DevOps
- TDD saves time for developers.
  - As you write the features of the code, you change existing features, your test cases will quickly let you know if something broke.
- TDD allows you to code faster because you are more confident.
  - You now don't have to worry about if you change something you might have broken something.
  - Because when you are refactoring code, you can move much faster because the test cases will catch any changes in the behavior.
- The tests ensure that the code is working as you expected.
  - If you write the test case first to define the behavior you want, you will know that you have achieved that behavior when the test case passes.
- The test cases also ensure that future changes don't break the code.
  - Failing test cases will instantly alert you that something has introduced something that broke the code.
- In order to create a DevOps pipeline, you need to automate all testing unless you want to push bugs to production faster.
  - A lot of companies don't understand this. They want to automate using Continuous Integration (CI) and Continuous Delivery (CD), without automating testing.
    - Unfortunately, you can't have a CI/CD pipeline without automating testing.

### Tools for TDD
- Unit testing is foundational to software development.
  - In the past, software developers or testers would manually test code for bugs.
  - This approach is not sustainable.
- Automated testing frees developers from manual testing and changes how they write tests using techniques like test driven development. 
- Tools
  - xUnit series
    - This series includes JUnit for Java, PyUnit for Python, NUnit for .Net platform, and Embunit for C and C++.
    - All versions of xUnit share a common syntax, so if you've learned one version for one language, learning the others is much easier.
      - This accessibility makes xUnit very popular.
  - Some other notable testing frameworks are Jasmine for JavaScript, Mocha for Node.js, SimpleTest for PHP, and a host of others.

### TDD Tools for Python
- PyUnit
  - Also known as the unittest package
  - It comes from the xUnit family of testing tools and it's the one that we are going to learn in this course.
  - It is built into Python so you can always rely on it being there.
    - Plus, more Python developers will be familiar with the built-in capabilities so it's easier to find a Python developer who know it. 
- Pytest
  - With other Python testing frameworks, you can use multiple levels of setups and teardowns.
    - Setups and teardowns are two Python methods together that allow you to define instructions to run before and after each of the tests.
  - But with Pytest, you can have nearly an infinite number of setups and teardowns.
    - However, using tons of these levels may be highly unstructured and hard to read the unit tests at times.
- Doctest
  - This tool actually allows you to write your test in the docstrings or your comments of your code.
    - It's OK for simple things, but it's limited and doesn't really scale for complex and highly interactive code.
- RSpec
  - which is an extremely popular framework for Ruby that is also available in Python.
  - If you're familiar with RSpec, this might not be a bad choice for you. 
- Nose
  - This is a test runner.
    - While PyUnit has its own test runner, Nose allows you to add color and formatting and other test output.
    - You actually get the Red/Green/Refactor.
      - Lines really do turn red as opposed to in PyUnit where everything is just black and white or whatever color scheme your terminal happens to be.
      - It makes the output easier to read.
  - Nose also has the ability to call the coverage tool.
    - This tool supports code coverage, which is the percentage of code that gets executed when you run automated testing.
    - You can get a code coverage report.
      - From this report, I can see if my coverage went up or my coverage went down or stayed the same.
    - The coverage tool also has options to report on the lines of code that have not been executed during a test run.
      - You can use this report to find those missing lines of code and know where to write more test cases.

### Anatomy of a Test Case in Python
- In this example, we're going to use a common programming construct know as a stack.
  - A stack is a data structure that implements a last in, first out (or LIFO) behavior.
    - That means when you add something to the stack it is placed on the top, and when you remove something from the stack it is removed from the top. 
      - So the last item added is the first item removed.
    - You can think of a stack like being a tube with tennis balls in it.
      - You can't take out the tennis ball at the bottom unless you first take out the tennis ball at the top. 
  - The command to add, or push, an item onto the stack is called push.
  - The command to remove something from the stack is called pop. 
  - The peek command will "peek" at the item at the top of the stack without removing it from the stack.

```
from unittest import TestCase
from stack import Stack

class StackTestCase(TestCase):
  def setUp(self):                            # Test fixture for initializing a new stack
    self.stack = stack()                      

  def tearDown(self):                         # Test fixture for making the stack un-reusable
    self.stack = None                         

  def test_push(self):                        # Test push() function
    self.stack.push(9)
    self.assertEqual(self.stack.peek(), 9)
  
  def test_pop(self):                         # Test pop() function
    self.stack.push(9)
    self.assertEqual(self.stack.pop(), 9)
    self.assertTrue(self.stack.isEmpty())
```

- Test fixture
  - Text fixture help developers create an initial testing state.
  - Test fixture allows you to specify the initial state of the system before a test case is run. We are using two test fixtures: setUp() and tearDown().
    - These will execute before and after each test, respectively.
  - setUp() is declaring an instance variable called self.stack and assigning it to a new Stack. 
    - That will be the stack that we will test.
  - tearDown() is setting self.stack to None to make sure that it doesn't get reused, which could cause side effects. 
- Test case
  - Test cases include assertions that verify that the code behaves as expected.
  - When we run the test case, first it executes setUp(), which creates a new stack and assigns it to the instance variable self.stack.
    - Remember: setUp() will be run before every test.
  - Next, it executes self.stack.push() and passes in the number 9 to push 9 onto the stack.
    - Notice the effect that this has on the stack: 9 has been pushed onto the top of the stack. 
  - The next line of code executes an assertion.
    - This is the first assertion that we have encountered. Where did that method come from? The self in front of it gives us a clue. It came from the parent class TestCase.
      - This is why we're subclassing TestCase: to inherit a set of methods that we can use to make assertions.
        - This method asserts that whatever is passed in as two arguments will be equal.
    - In this example, we are asserting that when we peek at the top of the stack we will get 9 returned.
      - We can see in the example that 9 is, in fact, at the top the stack so this assertion is true.
        - The test can pass.
  - Finally, the tearDown() method is called.
    - The instance variable self.stack is set to None and the stack disappears.
    - Remember: tearDown() will be called after every test case. 
- Testing frameworks provide tools that simplify testing conditions.

### Writing Test Assertions in Python
- Test assertion 
  - A statement that evaluates to either True or False
  - We use assertions as checks to determine if the results of our test have passed or failed: True means passed and False means failed.
    - They will raise an exception if they evaluate to False, marking the test as failed.
- Assertions are native to Python, and you can make one using the assert() function call.
  - e.g.
    ```
    answer = sum(2,3)
    assert(answer == 5)
    ```
- There's a nicer way to make assertions: using the additional asserts that TestCase provides.
  - Remember that our test case class is inherited from unittest.TestCase, so, there we have access to a lot of assertions to make your code cleaner.
  - assert() is the basis for all other assertions for PyUnit and these extra assertions are just "syntactic sugar" over the assert() function.
    - assertEqual(a, b)
    - assertNotEqual(a, b)
    - assertIn(a, b)
    - assertNotIn(a, b)
    - assertTrue(a)
    - assertFalse(a)
    - assertIsInstance(a, TYPE)
    - assertRaises(ERROR, a, args)
- Unit testing using test assertions
  ```
  from unittest import TestCase
  from triangle import area_of_a_triangle

  class TestAreaOfTriangle(TestCase):

      # Happy paths verify that a function returns positive outcomes when expected.

      def test_good_values(self):
          self.assertAlmostEqual(area_of_a_triangle(3.4, 8.3), 14.43)
          self.assertEqual(area_of_a_triangle(2, 5), 5.0)
          self.assertEqual(area_of_a_triangle(0, 5), 0.0)
          
      # Sad paths verify that a function responds to exceptions appropriately and without breaking. 

      def test_bad_values(self):
          self.assertRaises(ValueError, area_of_a_triangle, -2, 5)
          self.assertRaises(ValueError, area_of_a_triangle, 2, 5)

      def test_bad_types(self):
          self.assertRaises(TypeError, area_of_a_triangle, True, 5)
          self.assertRaises(TypeError, area_of_a_triangle, 2, True)
          self.assertRaises(TypeError, area_of_a_triangle, "test", 5)
          self.assertRaises(TypeError, area_of_a_triangle, 2, "test")
  ```

### Test Fixtures
- We use test fixtures to establish an initial known state before and after running tests.
  - With test fixtures, we can describe what the test environment looks like before a test, or suite of tests, is run, and then again after the test.
  - With this feature, we can run tests in isolation.
    - We ensure that the system is reset after each test so that changes made to one test will not affect the behavior of another test.
    - In turn, this reset ensures we get repeatable results because every time a test is run, we know that it is running from the same initial state.
- Some uses of test fixtures are preparing input data, as well as setting up or creating fake objects (test dummies) or mock objects (stand-ins).
  - They mimic real objects which might not be available at the time of testing and you can create these with a test fixture. 
- Another use is loading a database with a specific, known set of data.
  - Let's say you're going to test the manipulation of customer accounts. This might assume that some customers are in the database.
  - You can use a test fixture to populate the database with some sample customers.
  - An important feature of fixtures to keep in mind is that they always start from the same state.
    - So in this case, the database will contain the exact same customer data for each test.
      - This will make sure, for example, that deleting a customer in one test doesn't affect finding that customer in another test. 
- You could also use test fixtures for copying a specific known set of files so that your tests can find them if needed.
  - Anything you need to do to set up the proper environment to run your tests can be accomplished with test fixtures. 
- Using fixtures to load test data is very handy especially when the data is complex and it would have been difficult to otherwise create it. 
- Test fixtures operate at three levels of specificity,
  - Module
  - Test case
  - Test
- Test fixtures example
  ```
  def setupModule():                 # runs once before any tests

  def tearDownModule():              # runs once after all tests

  class MyTestCases(TestCase):

      @classmethod
      def setUpClass(cls):           # runs once before test case
          app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
          Account.init_db(app)       # connect to database

      @classmethod
      def tearDownClass(cls):        # runs once after test case
          db.session.close()         # disconnect from database

      def setUp(self):               # runs before each test
          db.drop_all()              # clean up the last tests
          db.create_all()            # create new empty tables

      def tearDown(self):            # runs after each test
          db.session.remove()        # close session
          db.drop_all()              # remove tables
  ```
- Load fixture data example
  ```
  ACCOUNT_DATA = {}

  @classmethod
  def setUpClass(cls):
      """ Load data needed by tests """
      global ACCOUNT_DATA

      with open('tests/fixtures/account_data.json') as json_data:
          ACCOUNT_DATA = json.load(json_data)

  def test_create_an_account(self):
      """ Test Account creation using known data """
      account = Account(ACCOUNT_DATA)
      account.save()
      self.assertEqual(len(Account.all()), 1)
  ```

## 8-3. Advanced Methods for Test-driven Development

### Test Coverage
- Test coverage is the percentage of lines of code that are executed during all of the tests.
  - When you call for test coverage, your coverage tool counts all of the executable lines of code and then monitors the tests to see which lines of code the tests execute.
  - The tool then divides the number of lines executed by the total number of lines.
  - The result is the percentage of lines that your test cases covered.
- High test coverage gives you confidence that a large amount of code executed during the
tests.
  - In turn, the more lines of code executed through tests, the more confident you can be that the code works as expected.
- To determine the level of coverage, you use test coverage reports.
  - These reports can reveal which lines of code were tested.
  - More importantly, they can reveal which lines were not tested so that you can write more test cases that execute those lines of code.
  - e.g. Python Coverage
    - `$ coverage report -m`
      - Name = File name
      - Stmts = Total lines of code
      - Miss = Number of lines without test cases
      - Cover = Percent of coverage
      - Missing = Lines without test cases (which we should focus on)
- Just testing the "happy" paths, the paths where everything works, is not going to get all of your code covered.
  - You must test the "sad" paths as well.
  - Sad paths are like the "else" in an "if, then, else" statement.
    - They're paths that catch error conditions like "405 method not allowed" example.
  - To get full test coverage you need to think of scenarios that will exercise all of your code.
- Even with 100% test coverage your code can still have bugs.
  - 100% test coverage only means that every line of code has been tested with some known good data.
    - You can still pass bad data into your code and find bugs.
  - Don't stop testing when your code cover reaches 100%.
    - Keep challenging the integrity of your code with bad data and corner cases to make sure your code behaves as expected under both favorable and adverse conditions.

### Factories and Fakes
- Sometimes you just need a fake version of a class in your program, but you want it to
have realistic data that behaves like the real class.
  - Factories and fakes make all of this possible.
- Factories and fakes are useful for creating and maintaining a large amount of test data.
  - Factories generate fakes with realistic test data.
  - Fakes behave like real objects during testing, so developers test fakes like they test real data. 

### Factories and Fakes - Example
1. Account model
    ```
    db = SQLAlchemy()

    class Account(db.Model):
        """
        Class that represents an Account
        """

        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(64))
        email = db.Column(db.String(64))
        phone_number = db.Column(db.String(32), nullable=True)
        disabled = db.Column(db.Boolean(), nullable=False, default=False)
        date_joined = db.Column(db.DateTime, nullable=False)
    ```

2. Account factory with FactoryBoy
    ```
    import factory
    from datetime import datetime
    from models import Account
    
    class AccountFactory(factory.Factory):
        """ Creates fake accounts """
        class Meta:
            model = Account
        
        id = factory.Sequence(lambda n: n)
        name = factory.Faker("name")
        email = factory.Faker("email")
        phone_number = factory.Faker("phone_number")

        """ Faker doesn't have a provider for Booleans, but FactoryBoy has a method called FuzzyChoice which randomly chooses between the options we give it. """
        disabled = factory.FuzzyChoice(choices=[True, False])
        date_joined = factory.LazyFunction(datetime.utcnow)
    ```
    - We're going to use a Python package called FactoryBoy to generate our fake accounts. 
        - FactoryBoy is just a Python version of Ruby's FactoryGirl.
        - We start by importing FactoryBoy which is simply called factory.
            - We also import datetime for creating timestamps.
            - Then we import our model that we just created.
                - Importing this model is important because we will use it here to provide the same functionality as the real class. 
        - Next we create an AccountFactory class and have it inherit from the Factory class in FactoryBoy.
            - Then we create an inner class called Meta and set one class attribute that is model equals Account.
                - This attribute is how the factory knows which model class it is creating fakes for.
                - This is why we imported the Account class from models.
        - Finally, we add the same attributes that the original class has but we substitute fake versions of these attributes. 

3. Using account fakes
    ```
    from factories import AccountFactory

    def test_update_account(self):
        """ Update an account """
        account = AccountFactory()
        account.create()

        # Fetch it back
        account = Account.find(account.id)
        account.email = "this@test.ing"
        account.update()

        # Fetch it back again
        account = Account.find(account.id)
        self.assertEqual(account.email, "this@test.ing")
    ```
    - We are now ready to use our AccountFactory in our unit testing.
        - We start by importing AccountFactory from our factories module.
        - Then we create a test case called test_update_account.
            - Here we instantiate an AccountFactory and assign it to a variable called account.
        - Next we call the create() method on the account.
            - "How can we call a method on a fake class?"
                - Because the AccountFactory doesn't have any methods.
                - Remember how we used that inner class called Meta and assigned the model variable to our "real" Account class?
                    - This allows the AccountFactory to behave exactly like a real account.
            - Now any method that you can call on the Account class, you can also call on the AccountFactory class.
                - It is truly a "body double" or "stand-in" for an account.
        - Next we retrieve the account that we just created.
            - We set a new value for the email, a value that we know won't show up in the test data, and then we call the update() method to save this new email.
        - Finally, we retrieve the account from the database one more time, and we assert that the email that was saved matches the email that we set it to.
    - Faking account data is that simple. 
        - Anywhere you can use an Account, you can now use an AccountFactory and have instant sample data.
        - Any method that you can call on Account, you can also call on AccountFactory because it behaves exactly the same as a real Account, even though it's a fake.

### Fake Providers
- There are even community providers that expand on this list.
- e.g. Company name provider
  ```
  from factory import Faker

  company = Faker('company')
  for _ in range(5):
      print(company.generate())
  ```
  - We'll start with importing Faker from the factory package.
  - Then we create an instance of Faker that will produce company names.
    - To do this, we pass in the provider name, in this case "company", to the Faker() class and store it in a variable called name.
  - Next we create a loop that iterates five times and calls name.generate() to generate a name each time through the loop.
  - When we execute this code we get "Parks and Sons," "Peterson, Evans and West," "Maxwell LLC," and so on. 

### Mocking
- Mocking is a process for creating objects that mimic the behavior of real objects.
  - Mocking can be very useful when your code calls another system that it depends on.
- e.g. movie reviews from the Internet Movie Database a.k.a. IMDB
  - When you're running a test case, do you really want to call the IMDB 1000 times a second?
    - Would the IMDB servers even let you call it 1000 times a second?
    - What if the IMDB service is down?
    - Now through no fault of your own, your test cases don't run.
  - This is why you want to mock systems like this during testing.
- You should mock any external service that is not under test.
  - To do so, you create mock objects that behave like that system.
  - You mock it because the system isn't what you're testing; you're testing whether your code can call the system, get back data, then do something with that data.
- Mocking the external system isolates the testing to just your code.
- By mocking the system, you gain another advantage.
  - Sometimes you need to change the behavior of a dependent system under test.
    - e.g. mocking the IMDB database
      - Then you can make it send back whatever type of reviews you need: good reviews, bad reviews, or even no reviews.
  - By mocking an external system, you have complete control of the data that comes back from the mocked system.
    - You can change the behavior of the mocked system. You can have it fail.
    - You can have it bring back a bad return code and check that your error handlers are working properly.
    - Mocking allows you to create any condition that you need to test.
- Mocking isn't limited to external systems.
  - Mocking is also useful when you don't have a remote connection to another component that's important for your testing.
  - This component could just be a part of your application that isn't available during testing. 
- Anytime you want to isolate your tests from a remote component or external system,
you can use a mock to take its place. 

### Mocking Through a Patch
- You can patch a function call, allowing you to change the call's behavior.
  - This is powerful tool to simulate error conditions or control what is returned from a call to any function.
    - Any function as in third-party libraries that you have no control over
  - With patching, you can control the behavior of a call to these libraries so that you can simulate different conditions.
  - With patching, you can change the behavior of a function call.
    - Patching is especially useful when the function calls an external system that is not under your control.
    - This is also useful when you want to simulate error conditions but you can't actually cause those errors while under test.
- The mock library in Python gives you two ways of patching,
    1. Patching a function's return value
        ```
        import requests
        from unittest import mock

        def imdb_info(title):
            """ Gets results for a movie by title """
            print(f"Searching IMDB for {title}")
            results = requests.get(f"https://imdb-api.com/API/SearchTitle/{title}")
            return results.json()
        
        if __name__ == '__main__':
            with mock.patch('__main__.imdb_info', return_value={'status_code': 200}) as imdb:
                print(imdb_info("Bambi"))         # prints {'status_code': 200}
            
            with mock.patch('__main__.imdb_info') as imdb:
                imdb.return_value={'status_code': 404}
                print(imdb_info("Bambi"))         # prints {'status_code": 404}
        ```
        - This is useful for testing error handlers because you can pass back error condition codes and see how your application behaves when it receives these return codes.
        - It's also useful for controlling the data that's returned from a function call.
        - You can pass back any data structure or object that your program expects.
        - By using the return_value patch, you can return anything that can be sent back as a return value from a function call. 
        - Variant
            ```
            import requests
            from unittest import mock

            def imdb_info(title):
                """ Gets results for a movie by title """
                print(f"Searching IMDB for {title}")
                results = requests.get(f"https://imdb-api.com/API/SearchTitle/{title}")
                return results.json()
                
            if __name__ == '__main__':
                """ Runs some mock tests """
                    
                with mock.patch('requests.get', return_value={'status_code': 200}) as dummy:
                    print(imdb_info("Bambi"))         # prints {'status_code': 200}
            ```  
    2. Replacing a function with another function
        ```
        from unittest.mock import patch

        def bye():
            return 'bye'
        
        def hello():
            return 'hello'
        
        # Any calls to hello() function will be redirected to bye() function
        @patch('__main__.hello', side_effect=bye)
        def test(hello_mock):
            return hello()

        if __name__ == '__main__':
            print(hello())        # prints hello
            print(bye())          # prints bye
            print(test())         # prints bye
        ```
        - Sometimes you need a patch to do more than just return a value.
        - With patching, you can also replace a function with another function.
            - This is known as a "side effect."
        - With the "side_effect" technique, you can provide your own function to get called instead of the real function while under test.

### Mocking Through a Testing Framework's Mock Object
- Sometimes just patching return value of a function called with a return code or a string isn't enough.
  - What if the return value of the function you want to patch is actually an object with multiple values and methods?
    - You could replace the entire object with another object: a mock object. 
- A mock object is an object that simulates, or mimics, the behavior of a real object in ways that you can control.
  - Which mocks an entire object, changing its behavior
  - You can control how the mock object behaves and whatever it returns. 
  - You can set multiple attributes on it and make it behave just like the real object that it's replacing.
- The best use for these mocks is when you need an entire object that behaves like another object, not just a function call.
  - You can also use these fake calls that returns an object instead, the call returns a mock object that behaves like the object you expect to return from the function call.
- The two Mock objects that come with Python's unittest package are Mock and MagicMock.
  - The only difference between them is that MagicMock implements all of the magic functions in Python.
    - Those are the functions whose names are surrounded by double underscores.
    - With magic functions, you can use mock objects in place of containers or other objects that implement the Python protocols.
  - If you don't need those magic functions, the Mock class will fit your needs perfectly. 
- To make a Mock or MagicMock object mimic a real given object, specify that real object's name as the spec parameter.
  - You patch a mock object the same way you patch a real object. 
- By using a combination of patches and your framework's provided mock objects, you can gain complete control over external dependencies under test conditions so that you can achieve repeatable results.

### Mock Object Examples
- Mock object
  ```
  m = Mock()
  m.foo()                             # no error raised
  m.foo.called                        # returns True
  m.bar.called                        # returns False

  # Add an attribute when creating
  m = Mock(status_code=200)
  m.status_code                       # returns 200

  # Add an attribute after creating
  m = Mock()
  m.name = "Foo"
  print(m.name)                       # prints Foo
  ```
- Mocking a specific class
  ```
  from requests import Response

  # Response objects have a status_code attribute
  m = Mock(spec=Response,
           status_code=404,
           content='{"error": "Not Found"}')
  
  m.foo()         # raises AttributeError, Response has no foo()
  m.json()        # no error, json() is valid on Response
  m.status_code   # no error raised, 404 returned
  m.text          # no error, text is valid on Response
  m.name          # raises AttributeError, Response has no name
- Patch example using MagicMock
  ```
  import requests
  from unittest import patch, MagicMock

  def imdb_info(title: str) -> dict:
      """ Gets results for a movie by title """
      print(f"Searching IMDB for {title}")
      results = requests.get(f"https://imdb-api.com/API/SearchTitle/{title}")
      if results.status_code == 200:
          return results.json()
      return {}
    
  if __name__ == '__main__':
      with patch('__main__.requests.get') as imdb_mock:
          imdb_mock.return_value = MagicMock(
              spec=requests.Response,
              status_code=200,
              json=MagicMock(return_value='{"title": "Bambi", "year": "1942"}')
          )
          print(imdb_info("Bambi"))         # returns {"title": "Bambi", "year": "1942"}

    
  # This line,
  #     results = requests.get(f"https://imdb-api.com/API/SearchTitle/{title}")
  # 
  # gets replaced by this MagicMock code.
  #     return_value = MagicMock(spec=... status_code... json=...)
  ```
  - When the line to call requests.get() is called, it activates the patch to substitute the mock in its place.
    - The result returned is actually the MagicMock that we had specced to behave like a real Response object.
    - When the status code is checked, it will return 200 just as we specified.
    - And when the json() method is called to get the payload, it will return the exact data that we specified. 
  - With mock objects, you get complete control to mimic any behavior that your test case needs.
    - You can control any return code that you need so that you can simulate good return codes as well as bad return codes.
    - And you can even control what function calls return like the json() function in this example. 

### Practicing Test Driven Development - Example
- Remember the 3-step Red-Green-Refactor TDD workflow
  1. The test cases are red at first because there's no code to execute against.
  2. Then you write the code to make them turn green.
  3. And finally, refactor that code to make it more robust knowing that the test case will let you know if you change the behavior of the code. 
- Requirements
  - You've been asked to build a web service that can keep track of multiple counters.
    - These counters are like hit counters on a webpage.
  - You've been told the API must be restful.
    - That tells you a bit about the behavior and the HTTP verbs that you'll use to create the service.
    - It must follow RESTful guidelines.
      - The endpoint should be called /counters.
        - Knowing this and the fact that it should be RESTful gives you a lot of information about how you should call the endpoint. 
  - You've also been told that when creating a counter, you must specify the name in the path of the call.
    - So the call will be /counters/ and then the name of the counter.
  - The final requirements specify that duplicate names must return an error code.
    - The error codes for HTTP conflict in a RESTful service is 429 Conflict.
- TDD approach
    1. Given those requirements, we can start writing a test that creates a counter by calling POST on /counters with a name appended, like "shoes."
        - `POST /counters/shoes`
    2. Since the API must be RESTful, we know that we should get back a 201_CREATED return code following RESTful guidelines.
        - Return code = 201_CREATED
    3. We should also get back the counter so that we can check that the name was created correctly and its value starts out at zero. 
        - Data = {"shoes": 0}
    4. In case of duplicates, we check that we get back a 429 Conflict return code.
        - Return code = 429_CONFLICT
- Lessons
  - In TDD, your test cases drive the development.
    - You base your test cases on your application's requirements. 
      - The requirements describe how the application should behave, and then the test cases verify that the application behaves that way. 
    - You don't need any application code to specify either of those. 
  - After writing the test cases, you write the code to make the test cases pass.
    - And writing code is easier because you already know how it's supposed to behave.
    - You've already decided, for example, what the return codes must be.
      - So TDD makes coding go faster after you've written the test cases.
  - You know that if you wrote the code first, you'd still probably write a little program to test it.
    - Why not make that program into a formal test case from the start?
      - That way, you will know that your code continues to work with every new enhancement.
  - Another important takeaway is that TDD workflow is a back-and-forth process.
    - You write a test case, and then you write the code.
    - You write more test cases to check different inputs or affected behaviors, and then you write more code.
      - And so on.
  - You should use this workflow from here on in all of your development.

