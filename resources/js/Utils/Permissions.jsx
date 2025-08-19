// masuk ke halaman dari inertia
import { usePage } from "@inertiajs/react";

// Membuat reat Functional Component hasAnyPermissions 
// dan mendefinisikan(permissions)
export default function hasAnyPermission(permissions){

    // Destcruting sebuah props auth 
    // yang didapat dari share data global sebelumnya
    // destruct auth from usepage props
    const { auth } = usePage().props

    // Mendefnisikan sebuah variabel baru dengan allPermissions 
    // yang diambil dari props auth.persmissions
    // get all permissions from props auth
    let allPermissions = auth.permissions;

    // Looping data permissions, yang diterima dari props
    // Jika data ditemukan maka set hasPermissions  dengan true
    // define has permission is false
    let hasPermission = false;
    // loop permissions
    permissions.forEach(function(item){
        // do it if permission is match with key
        if(allPermissions[item])
            // assign hasPermission to true
            hasPermission = true;
    });

 return hasPermission;

   
}