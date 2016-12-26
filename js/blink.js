function changestyle()
{
    var blnk = document.getElementById('blnk');
    if (blnk.style.visibility == 'visible') {
        blnk.style.visibility = 'hidden';
        setTimeout(changestyle, 400);
    } else {
        blnk.style.visibility = 'visible';
        setTimeout(changestyle, 2000);
    }
}
setTimeout(changestyle, 0);