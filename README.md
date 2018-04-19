# panima
simple animations library, made by stupid for stupid

<br>
<a href='https://animatronic.000webhostapp.com/'>DEMO</a>
<br>

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
    <li>rotate</li>
</ul>

Example: <br>
```<div class='info-box' panima='leftin 3s ease-in-out'> <...> </div>```
