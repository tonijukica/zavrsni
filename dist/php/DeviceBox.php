<?php
require_once("DAL.php");

class DeviceBox
{
	public $id;
	public $title;
	public $pin;
	public $state;
	public $parent_id;
	
	public function DeviceBox($id,$title,$pin,$state,$parent_id)
	{
		$this->id=$id;
		$this->title=$title;
		$this->pin=$pin;
		$this->state=$state;
		$this->parent_id=$parent_id;
	}
	
	public static function getJSON($deviceboxes)
	{
		$simplifedObjects=array();

		foreach($deviceboxes as $devicebox)
		{	
			$simplifedObjects[]=get_object_vars($devicebox);
		}

		return json_encode($simplifedObjects);
	}
}