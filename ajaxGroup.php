<?php
    if($_POST["param"] == "recupGroupe"){
        
        $sourceJson = file_get_contents('json/groupes.json');
        echo $sourceJson ;

    }else if ($_POST["param"] == "recupMusicien"){
        $sourceJson = file_get_contents('json/musicien.json');
        echo $sourceJson ;
    }else if ($_POST["param"] == "ajouter" || $_POST["param"] == "supprimer" || $_POST["param"]== "modifier"){
        $newData = $_POST["param2"]; // pas besoin d'encoder car j'envoie une chaine json
        file_put_contents('json/groupes.json', $newData);
        
    }else if ($_POST["param"] == "reset"){
        $newData = $_POST["param2"]; // pas besoin d'encoder car j'envoie une chaine json
        file_put_contents('json/groupes.json',$newData);
        
        $sourceJson = file_get_contents('json/groupes.json');
        echo $sourceJson ;
    }

 ?>