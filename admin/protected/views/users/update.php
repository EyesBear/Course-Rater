<?php
$this->breadcrumbs=array(
	'Users'=>array('index'),
	$model->_id=>array('view','id'=>$model->),
	'Update',
);

$this->menu=array(
	array('label'=>'List Users', 'url'=>array('index')),
	array('label'=>'Create Users', 'url'=>array('create')),
	array('label'=>'View Users', 'url'=>array('view', 'id'=>$model->)),
	array('label'=>'Manage Users', 'url'=>array('admin')),
);
?>

<h1>Update Users <?php echo $model->; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>