<?php
$this->pageCaption='';
$this->pageTitle=Yii::app()->name;
?>
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
<!--           <ol class="carousel-indicators"> -->
<!--             <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li> -->
<!--             <li data-target="#carousel-example-generic" data-slide-to="1"></li> -->
<!--             <li data-target="#carousel-example-generic" data-slide-to="2"></li> -->
<!--           </ol> -->

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    <div class="item active">
    	<div class="peopleCarouselImg">
      		<img src="<?php echo Yii::app()->theme->baseUrl; ?>/img/coworking1.jpg" alt="...">
      	</div>
      <div class="carousel-caption">
      	<center><h1>Discover the greatest Professor</h1></center>
      </div>
    </div>
	<div class="item">
		<div class="peopleCarouselImg">
      		<img src="<?php echo Yii::app()->theme->baseUrl; ?>/img/coworking3.jpg" alt="...">
      	</div>
      <div class="carousel-caption">
      	<center><h1>Rate your courses</h1></center>
      </div>
    </div>
  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only"></span>
  </a>
  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only"></span>
  </a>
</div>