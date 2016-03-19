<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->), array('view', 'id'=>$data->)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('username')); ?>:</b>
	<?php echo CHtml::encode($data->username); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('google')); ?>:</b>
	<?php echo CHtml::encode($data->google); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('email')); ?>:</b>
	<?php echo CHtml::encode($data->email); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('tokens')); ?>:</b>
	<?php echo CHtml::encode($data->tokens); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('profile')); ?>:</b>
	<?php echo CHtml::encode($data->profile); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('comments')); ?>:</b>
	<?php echo CHtml::encode($data->comments); ?>
	<br />

	<?php /*
	<b><?php echo CHtml::encode($data->getAttributeLabel('ratings')); ?>:</b>
	<?php echo CHtml::encode($data->ratings); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('created')); ?>:</b>
	<?php echo CHtml::encode($data->created); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('__v')); ?>:</b>
	<?php echo CHtml::encode($data->__v); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('schoolPref')); ?>:</b>
	<?php echo CHtml::encode($data->schoolPref); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('facebook')); ?>:</b>
	<?php echo CHtml::encode($data->facebook); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('_id')); ?>:</b>
	<?php echo CHtml::encode($data->_id); ?>
	<br />

	*/ ?>

</div>