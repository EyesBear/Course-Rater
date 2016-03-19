<?php

/**
 * This is the MongoDB Document model class based on table "users".
 */
class Users extends EMongoDocument
{
	public $username;
	public $google;
	public $email;
	public $tokens;
	public $profile;
	public $comments;
	public $ratings;
	public $created;
	public $__v;
	public $schoolPref;
	public $facebook;

	/**
	 * Returns the static model of the specified AR class.
	 * @return Users the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * returns the primary key field for this model
	 */
	public function primaryKey()
	{
		return NULL;
	}

	/**
	 * @return string the associated collection name
	 */
	public function getCollectionName()
	{
		return 'users';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('username, google, email, tokens, profile, comments, ratings, created, __v, schoolPref, facebook', 'required'),
			array('username, google, email, tokens, profile, comments, ratings, created, __v, schoolPref, facebook', 'length', 'max'=>1000),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('username, google, email, tokens, profile, comments, ratings, created, __v, schoolPref, facebook', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'username' => 'Username',
			'google' => 'Google',
			'email' => 'Email',
			'tokens' => 'Tokens',
			'profile' => 'Profile',
			'comments' => 'Comments',
			'ratings' => 'Ratings',
			'created' => 'Created',
			'__v' => 'V',
			'schoolPref' => 'School Pref',
			'facebook' => 'Facebook',
		);
	}

	public function embeddedDocuments()
    {
        return array(
            // property field name => class name to use for this embedded document
            'created' => 'Created',
            'profile' => 'Profile',
            'tokens' => 'Tokens',
        );
    }
}