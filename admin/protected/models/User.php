<?php
class User extends EMongoDocument
    {
      public $email;
      public $username;
      public $password;
      public $salt;
      public $created;
      public $ratings;
      public $comments;
      public $profile;
      public $facebook;
      public $twitter;
      public $google;
      public $tokens;
 
      // This has to be defined in every model, this is same as with standard Yii ActiveRecord
      public static function model($className=__CLASS__)
      {
        return parent::model($className);
      }
 
      // This method is required!
      public function getCollectionName()
      {
        return 'users';
      }
 
      public function rules()
      {
        return array(
          array('username', 'password', 'required'),
          array('username', 'password', 'max' => 255),
        );
      }
 
      public function attributeLabels()
      {
        return array(
          'email'  => 'Email'
          'username'   => 'User name',
          'password'   => 'Password',
        );
      }
    }