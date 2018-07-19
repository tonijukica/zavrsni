<?php
require_once("DatabaseAccess.php");
require_once("RoomBox.php");
require_once("DeviceBox.php");

class DAL
{
    private static function getDbAccess()
    {
        return new DatabaseAccess("mydb", "tjcold", "admin1234");
    }
    public static function getRoomBoxes()
    {
        $dbAccess=DAL::getDbAccess();
        $rows=$dbAccess->executeQuery("SELECT * FROM sobe;");
        $roomboxes=array();
        foreach($rows as $row)
        {
            $roomboxes[]=new RoomBox($row[0],$row[1]);
        }
        return $roomboxes;
    }

   public static function getDeviceBoxes()
	{
	$dbAccess=DAL::getDbAccess();
    	$rows=$dbAccess->executeQuery("SELECT * FROM uredaji,sobe WHERE uredaji.ID_SOBE=sobe.ID;");
	$deviceboxes=array();
	foreach($rows as $row)
	{
		$deviceboxes[]=new DeviceBox($row[0],$row[1],$row[2],$row[3],$row[5]);
	}
	return $deviceboxes;
	}

 
    public static function deleteBox($id)
	{
		$dbAccess=DAL::getDbAccess();
		$rows=$dbAccess->executeQuery("DELETE From sobe WHERE ID='$id';");
		$rows=$dbAccess->executeQuery("DELETE From uredaji WHERE ID='$id';");
		return json_encode(array("success"=>true));
	}
	
    public static function addRoomBox($title)
    {
        $dbAccess=DAL::getDbAccess();
        $rows=$dbAccess->executeQuery("INSERT INTO `sobe`(`NAZIV`) VALUES ('$title');");
        $id=$dbAccess->executeQuery("SELECT ID FROM sobe ORDER BY ID DESC LIMIT 1;");
        return json_encode(array("success"=>true));
    }

    public static function addDeviceBox($title,$pin,$parent_id)
    {
        $dbAccess=DAL::getDbAccess();
        $rows=$dbAccess->executeQuery("INSERT INTO `uredaji`(`Ime`, `PIN`, `Stanje`, `ID_SOBE`) VALUES ('$title', '$pin', '0' ,'$parent_id');");
        $id=$dbAccess->executeQuery("SELECT MAX(ID) FROM uredaji;");
        return json_encode(array("success"=>true, "id"=>$id[0]));

    } 
      public static function changeDeviceState($pin,$state)
    {
        $dbAccess=DAL::getDbAccess();
        if($state=="false")
            $rows=$dbAccess->executeQuery("UPDATE `uredaji` SET `Stanje`=0 WHERE `Pin`=$pin");
        else
            $rows=$dbAccess->executeQuery("UPDATE `uredaji` SET `Stanje`=1 WHERE `Pin`=$pin");
        return json_encode(array("success"=>true));
    }  
}
