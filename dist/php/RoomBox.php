<?php
require_once("DAL.php");

class RoomBox
{
    public $id;
    public $title;
    

    public function RoomBox($id,$title)
    {
        $this->id=$id;
        $this->title = $title;
    }

    public static function getJSON($RoomBoxes)
    {
        $simplifiedObjects = array();

        foreach($RoomBoxes as $RoomBox)
        {
            $simplifiedObjects[] = get_object_vars($RoomBox);
        }

        return json_encode($simplifiedObjects);
    }
}