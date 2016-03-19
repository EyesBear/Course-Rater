Process Description 

We followed a slightly different process than what we did in phase 2 such that the process in phase 3 was more relaxed. This means that, we no longer followed the scrum like process directly but adpated a more relaxed version where we would no longer assess individual contributuion and work effort. Our group felt that everyone had been consistently putting a lot of effort and had done their assigned taks well and on time. More group coding sessions were held throughout the week, aswell as on the the weekends meaning that everyone would need to show up and complete their task. We adpated this style because it was eastablished that everyone would be able to meet up and work together (there were no conflicts where some wouldn't be able to come). Furthermore, since this phase is even more focused on coding, more coding issues and code design problems arise, meaning that meeting each other to do group coding allowed us to quickly catch and address these problems as a team. Aside, from group coding sessions, our team continued to meet on every Friday at 6pm to discuss the project as well as using Slack as group communication tool. The main goal for the meetings and different than the coding sessions, was to further report what each member had done so far and what else needed to be completed. This included bringing up further issues to be added to GitHub's issue list and assess our progress. One thing that has changed in phase 3 was that we had more group coding sessions that were held during weekends. Since this phase is even more focused on coding, more coding issues and code design problems arise, meaning that meeting each other to do group coding allowed us to quickly catch and address these problems as a team.

Current differences/changes/enhancements from phase 2:

1. Social Login:
  We decided to remove the feature where a user could specifically create a Rate My Course account and using it to sign in. This would be replaced by using only social logins such as Facebook, Google+, Twitter, etc. This allowed for better efficency and less redundency for the user since the majority of users will have atleast one of the many implemented social logins avaialble. The user would be able to simply create an account using the social login without having to enter a bunch of user information. We felt that this made the website cleaner and simpler. 
GitHub issue link: https://github.com/csc301-fall-2015/project-team4-L5101/issues/23
GitHub issue link: https://github.com/csc301-fall-2015/project-team4-L5101/issues/33

2. Social Login - bugs/problems
  At first, we decided to make the database handle user login unique based on the user's name. However, issues would arise due to name duplication. This was temporarily solved to generate a random username where the user can then change later on.
GitHub issue link: https://github.com/csc301-fall-2015/project-team4-L5101/issues/25
However, more issues arised with regards to a user logging in and out with different social medias where the name duplication issue would arise. In the end the database was changed so that the social login would be based on email instead.

3. Search Bar functionality:
  We improved the search bar functionality to allow users to find their courses quicker and easier. Details can be found under Github issues.
Github issue link: https://github.com/csc301-fall-2015/project-team4-L5101/issues/26

4. Profile Page:
    We decided a profile page would be neccessary to further enhance and utilize the social login. Users would be able to check their details here, as well as specify their school. This specific filter helps with finding their desired course because the courses returned by the search will only be from their defined school. Users wouldn't need to type in their school name everytime or having to look through courses that arent from their school.
GitHub issue link: https://github.com/csc301-fall-2015/project-team4-L5101/issues/29

Meeting minutes (Brainstorm and discussion only):

1) 

Update Meetings

11.06.15/BA3200/6pm-8pm

Meeting Minutes:
	- Quorum Reached!
	- Team discussed and agreed to skeleton of phase 3 MVP (elaborated below).
	- Meeting adjourned!

Phase 3 MVP:
	- Social media login
	- Enhanced search bar
		- for users who aren’t logged in they will have to provide the school name along with the course code for the search
		- for logged in users they will be asked which school they attend and allow them to only search with course codes
	- Change database to adjust for addition of schools which contains courses
	- Comments Section:
		- users can like or dislike a comment
		- comments are sorted by highest likes to highest dislikes
	- Profile Page:
		- input the school preference
		- get name, email, and profile picture from Facebook login
	- School Page (low priority): 
		- display all courses in a school
	- On rating page you will have to input teacher name too so that in display page we can display different data for different teachers
	- Improve UI to add color codes for ratings, red is bad , yellow is normal, and green is good

2)

Update Meetings

11.13.15/BA3200/6pm-7pm

Meeting Minutes:
	- Quorum Reached!
	- TA Spandan showed up to discuss our phase 2, and what we should do
	for phase 3
	- Further discussed new features and changes
	- Decided to meet on Wednesday at 9pm and Thursday at 12pm to work, if 
	the project is still unfinished by then, we work on Saturday + Sunday.
	- Meeting adjourned!

Phase 3 Updates:
	- Discussed using Angular Materialize for better style
	- Discussed the possibility of creating an Admin page
	that could be used to delete harmful comments and users
	- Decided that if time permits, the website should be made
	responsive for mobile users.
	- Decided to add support for a wide array of social media
	logins like Facebook, Twitter, Github, Linkedin, and Instagram
	- Each member expressed which of the decided features
	interested them most, to be assigned to the Github issues late

3) 

Update Meetings

11.21.18/BA2200/9pm

Gathered everyone to start work on the remaining features, this will count as
our meeting for the week, as we decided we will all be too busy this Friday.
Work was assigned (see github issues), and work began (see commit history).
