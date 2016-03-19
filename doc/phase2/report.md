Team 11 Markdown
    
Initial Planning
Scrum Master:
	- The scrum master will primarily guide and compile the discussion in all team meetings into minutes.
	- The scrum master will maintain the Github issue database and update them accordingly after each meeting.
	- The scrum master will schedule and confirm the time and place of the next meeting.
	- The scrum master’s role will not rotate and will be decided by the team through direct election.
	- The team has agreed to the following definition for the scrum master.

Task size estimation:
	The following procedure is used to determine the size of a task:
		1- clearly state the task in question.
		2- open discussion among all teammates on their rough estimate for the task size .
			- programming tasks are usually considered larger than other tasks.
		3- each teammate is then allotted time to individually state their own estimate again along with their reasons for such estimation or to defend their estimation.
		4- all teammates are polled through open raised hand election to see if we have a consensus (super majority) on the size estimate.
		5- if no consensus reached then we go back to step 2.
		6- if consensus reached then move on to next task .
	Our procedure allows for a round of open discussions among teammates in order to persuade others and an individual round allowing for all teammates’ opinions to be voiced and heard. 
	Our procedure defines consensus as a super majority rather than unanimous in order to avoid deadlocks by a single teammate or a minority.
    
    
Sprint Backlog
    
    
    
    
Update Meetings
10.23.15/ BA3200 / 6pm-8pm
Scrum Master: ShiHan Wan

Meeting Minutes:
	- Quorum reached (all teammates present)!
	- Team discussed initial planning, including what constitutes a scrum master and how to estimate task size (elaborated in Initial Planning).
	- Team discussed and agreed to what constitutes our MVP (elaborated below).
	- Team discussed what will be on Home Page, Course Page, and database structure for phase 2 (elaborated below).
	- Team discussed and divided up tasks for phase 2 (elaborated on Github through issue assignment).
			- Team discussed and created sprint backlog.
	- Team discussed and agreed on MEAN stack for implementation.
	- Date and place of next meeting set to be 10.30.15 from 6-8pm in BA3200
	- Meeting adjourned!

MVP:
	Home Page:
		- Search bar
	Basic Unit - Course Page:
		- Display data
		- Collect data
		
	Database:
		course_table (course_id):
			- course_name
			- course_instructors
			- list (course_rating)
			- list (workload_rating)
			- list (difficulty_rating)
			- list (instructor_rating)
			- list (comments)
		
		user_table (user_id):
			- username
			- list (list (course_id, list(rating, comments)))
			
10.30.15/ BA3200 / 6pm-8pm
Scrum Master: ShiHan Wan

Meeting Minutes:
	- Quorum reached (all teammates present)!
	- Team discussed and agreed on another face to face meeting on October 31st to work on phase 2.
	- Team discussed and agreed to drop mongoDB for PHP backend database.
	- Team discussed and agreed to add administrative functions to phase deliverable (elaborated below).
	- Team discussed and agreed to redivide work according to recent development (elaborated through issues on Github and below).
	- Team discussed and agreed to push the implementation of Facebook Login button to phase 3.
	- Date and place of next meeting set to be 11.01.15 from 4-8pm in BA3200
	- Meeting adjourned!
	
Administrative Screen:
	- Add or remove courses.
	- Implemented mainly in PHP and uses common MySQL database.
	- Different framework from the rest of backend in order to black box and isolate this part to increase security.

Facebook Login:
	- All users will be required to sign in using social media in order to keep track of voting records and curb fraudulent and multiple votes.

11.01.15/ BA2210 / 4pm-5pm
Scrum Master: ShiHan Wan

	- Quorum reached (all teammates present)!
	- Team discussed and agreed to push the implementation of mobile responsiveness to phase 3.
	- Team discussed and solved a wide range of integration issues among different screens.
	- Team discussed and agreed on what and how screens will be presented during the demo.
		- Team agreed that the most important part of the demo will be to demonstrate the core functionality of our website:
			course search > course ratings display > course feedback > update course ratings
	- Meeting adjourned!
    
    
Team Burndown Chart
    
    
    
Review & Retrospective

One of the tasks that was not done was the Facebook login and the mobile responsiveness. As recorded in the minutes above, their implementations will be pushed to phase 3 in order for the team to focus on implementing the core functionalities of our website such as course search, data loading, and data updating. We split the backend task after the second meeting to account for it being larger than previously planned. Though the backend task was initially assigned to only one teammate, it ultimately involved most other teammates due to the sheer programming size and complexity. 


Two decisions that worked really well for us was to have weekly meetings and group coding sessions. The weekly meetings allowed us to discuss the various issues we have encountered throughout the week and try to come up with solutions as a team, we always make sure that the great majority of the team is on board each major decision to minimize confusion later on (we recognize the diverse opinion and background of each teammates and thus devised a system of discussion that allows for participation by all and yet minimizes the amount of deadlock as mentioned in Initial Planning). They also provided a perfect opportunity to reevaluate certain tasks and reassign them accordingly (we noticed that Github does not support multiple assignment of the same task). We generally kept Github issues in big chunks in order to allow each teammates maximum flexibility in how to tackle their respective tasks and to make each task a self containing coding unit to reduce the amount of code integration needed to combine into a final product later on. Coding as a team within the same room created a great environment that allowed teammates to reach out for help and learn from each other. When a teammate is stuck and bottlenecking everyone else’s work we could immediately combine together in order to solve this blocking issue drastically reducing the amount of waiting often occurring in remote coding sessions.

During the early stages of initial division of work, we chose and idea that was in resptro spect too restritive. Initially, task were split up for front-end work into 3 focus categories: HTML, CSS, and JavaScript. However, this division of work was not a great idea since the amount of work for each is not well balanced and also they don't speratate well (i.e. their is a lot of overlap). This decision was made based on the idea that each person working on either HTML, CSS or Javascript allowed them to just focus on one thing to maximize efficiency. However, this was soon changed to assiging each person a page of the website where having each be responsible for the CSS, HTML, and JavaScript.

One obvious and major improvement the group should adapt is to start writing code as early as possible. This would not mean cutting back on discussion (brainstorming, debugging, planning, etc.) but to start implementing code early. Alternation between the two could be a solution where the group can hold short discussions followed by short code sessions and repeating. This would be effective because if problems (misunderstanding, bugs, complications, etc.) would be realized sooner allowing more time to find a fix. Therefore. coding early helps relieve pressure if problems arise and prevents fustrations of trying to debug important features near the end og the project phase.

