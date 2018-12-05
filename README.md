# panima
simple animations library

## Built with

- vanilla JS

## Installing

1. Add animations file(anima.js) and script file (panima.js) in end of your page
```
    <script src="js/anim.js" type="text/javascript"></script>
    <script src="js/panima.js" type="text/javascript"></script>
</body>
```
 
<span style="background-color: red;">warning</span>

-instruction-

add attribute 'panima' to tag with animation property's. <br>

```<img src='image.png' panima='animation_name duration animation_timing'>```
<br>
where: <br>
<ul>
    <li>animation_name - name of animation from list</li>
    <li>duration - duration of animation in seconds with 's' (e.g. 1.5s / 2s ...)</li>
    <li>animation_timing - timing function of animation (e.g. ease-in / cubic-bezier(0.42,0,1,1) / linear ...)</li>
<br>
<br>Animations list:
<ul>
    <li>opacity</li>
    <li>shake</li>
    <li>leftin</li>
    <li>topin</li>
    <li>botin</li>
    <li>righttin</li>
    <li>rotate</li>
    <li>fadein</li>
</ul>

Example: <br>
```<div class='info-box' panima='leftin 3s ease-in-out'> <...> </div>```
