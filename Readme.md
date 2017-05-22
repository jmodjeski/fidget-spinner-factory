# Fidget Spinner Factory

## App Concept
After a class at http://heatsync.org on using Blender to create Fidget Spinners.  The idea was brought up if there was a way to have do a similiar class, but for the Laser Cutter.

The challenge I saw with the Blender class was just the amount of people that showed up for the class!  This spawned the question, if the same turnout occurred for a laser cut fidget spinner; how could we let each person go home with a spinner they designed.

After poking around in Inkscape for a few minutes, I wasn't able to find a super quick and dirty way to achieve the goal.  Granted, I have a +10 Ignorance modifier to my Inkscape skills.

I figured, it might be easier for me to generate a small app to isolate the important parts of a spinner, then provide a buffet of modifiers to allow people to customize it to thier own liking.  Thus the experiment began... lets see where it goes.

## Future Rambles
I really would like to be able to have a _mode_ option to the app to allow both 2d and 3d spinners to be generated.  Not sure how the 3d will fit it, but its on the list.  This was part of the reasoning to use Canvas vs SVG.  Maybe there is a way to switch out to using webgl for both 2d and 3d design.  Still keep the same design semantics, but generate code compatible with https://openjscad.org to generate an STL for 3d printing.

## Attributions
Logo - Fidget Spinner by Nathan Kim from the Noun Project
https://thenounproject.com/search/?q=fidget%20spinner&i=1017001

