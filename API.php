<?php
require_once("dist/php/DAL.php");
require_once("dist/php/RoomBox.php");
require_once("dist/php/DeviceBox.php");

class API 
{
    public static function respond()
    {
        
        $action = API::getKeyValue("action");

        switch($action)
        {
            case "getRoomBoxes":
                return RoomBox::getJSON(DAL::getRoomBoxes());

            case "getDeviceBoxes":
		        return DeviceBox::getJSON(DAL::getDeviceBoxes());
           case "addRoomBox":
                $title=API::getKeyValue("title");
                if($title!="")
                    return DAL::addRoomBox($title);
                else
                    return "Action missing title";

            case "deleteBox":
                $id=API::getKeyValue("id");
                if($id!="")
                    return DAL::deleteBox($id);
                else
                    return "Action is missing title";
              
	     case "changeDeviceState":
                $pin=API::getKeyValue("pin");
                $state=API::getKeyValue("state");
                if($pin!=""&&$state!="")
                    return DAL::changeDeviceState($pin,$state);
                else
                    return "Action is missing pin/state";  

            case "addDeviceBox":
                $title=API::getKeyValue("title");
                $pin=API::getKeyValue("pin");
                $parent_id=API::getKeyValue("parent_id");
                if($title!=""&&$pin!=""&&$parent_id!="")
                    return DAL::addDeviceBox($title,$pin,$parent_id);
                else
                    return "Action is missing title/pin/parent_id";

            default:
                return "Unknown action: $action";       

        }
    }

    private static function getKeyValue($key) 
    {
        return isset($_REQUEST[$key]) ? $_REQUEST[$key] : "";
    }
}

echo(API::respond());