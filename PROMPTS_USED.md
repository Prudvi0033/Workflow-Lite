# Prompts Used During Development

This document contains all the major prompts I used while developing Workflow Builder Lite. These prompts were used with Chat GPT. Claude AI and GitHub Copilot to accelerate development.

---

## UI/UX Design Prompts

### Dashboard Layout Design
```
use h-screen max-w-2xl centered layout with a white bg and subtle shadows for this page 
on top there will be two sections one will be will w-full and justify-bw on the left side 
there will be user's profile image with hist first letter of name along with his name and 
email in that are top and bottom and on the left side there will be a button that is 
neutral-800 gradient saying view notes and besides that there will be dark red logout 
button with just icon and in the middle there will be a button saying create workflow 
that is cyan gradient with neomorphic white shadow which is thick at the top and subtle 
normal to make it pop up a bit also inlclude circular plus icon from lucide icons in the 
create workflow button
```

### Workflow Detail Page Background
```
create a box with w-3xl and h-screen with bg as slate-100 and it should be a dotted 
background with small dots use style linear gradient 
<div className="min-h-screen w-full bg-white relative"> 
  <div className="absolute inset-0 z-0" 
    style={{ 
      background: "#ffffff", 
      backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)", 
      backgroundSize: "20px 20px", 
    }} 
  /> 
here </div> 
here is the reference for that for this and on the we should have a back button with and 
icon on the left most side and then justify b/w and then at right most there will be 
button saying view runs make this similar to my prev components style
```

---

## Functionality Implementation Prompts

### Create Workflow Modal
```
now create the create workflow function when we click button it should open a modal and 
when user clicks that create button that modal should have Title with aestric and a place 
holder and a cross to close the things with a blurty black background behind the modal 
and do the proper empty validation for the title box and add a loader to create button 
and after the creation of workflow is done redirect me /[id] of the frontend page from 
the id that we get from the workflow


```
### Add Step Modal
```
no create a modal the should minimal as my prev modal i'll give you a reference when i 
click edit button and show me the title, and show me drop down with the the one's that i 
mentioned in the step type : type and the both should be entered and when the user enter 
call the post method by sending in the body and when hit save this post method is called 
and the modal is closed and we store the state of the type he chose along with the title
```
---
*Most effective prompts: UI design prompts (saved ~2 hours)*