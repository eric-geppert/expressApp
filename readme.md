this is version 1.0.1 it contains the following features:

- user is able to set the days of the week/days per week dynamically, and start any day of the week.
- user can go in and out of particular workout views
- user can input their weight for tracking their progress, and it's displayed on a chart after they input 2 or more weights. The chart is also able to adjust dynamically, with alerts for success/failure
- user can successfully subscribe, and un-subscribe with green and red alerts for success/failure
- movement library now has all movements, a dropdown where they can search for any video. The video is rendered as an embedded youtube link and can be played on our site.
- movement library now has all movements, a dropdown where they can search for any video. The video is rendered as an embedded youtube link and can be played on our site.

version 1.0.2 new features/fixes:

- fix title issue on calendar page for viewing a specific workout
- fix read me bullets
- removed buy Full Programs button if user's subscription is currently active
- updated version
- removed dashboard tab, made homepage a dynamic tab to point to and display homepage or profile if logged in

version 1.0.3 new features/fixes:

- abstracted env variables

futrue todos:

- update description on homepage to explain what the site is/can do
- add check for if date already exists in weight tracker, send alert if so
- add ability to remove weight PRs
- clean up labels on dashboard, add in anything else?
- add the users workout plan to their profile page
- look into auto refresh when user unsubscribes. should be able to send another get req to stripe and change it's state.
- add the ability to change workout plans
- add ability to push all workout's back a day
- add the ability to track/show progress of a workout plan
- add other PR catagories
- add ability to put in weights/times for a specific days lifts?
- find better library for weights/PR tracker chart. (the problem is with the dynamic X axis being dates)
- allow user to change their email or add backup email
- create backup email/phone service?
- seperate readme to change log.

maybe todos:

- get higher res pics for testimonials
- delete old branches

- major code clean up
  - create some kind of "only view first 10 videos" on movement page. (put in alphabetical order)
  - add back in pdf view of workouts?
  - think of keyword phrases for navbar titles
  - remove dashboard link and change homePage to profile? (should only have 7 links max)
    make logout button seperate somehow (a LOT of style work involved if so)

for sure todo's post launch:
-ability to push all workouts back a day.
-add embedded videos directly to a specific days workout!
