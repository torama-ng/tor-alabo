function populate(st, lg) {
    var st = document.getElementById(st);

    var lg = document.getElementById(lg);
    lg.innerHTML = "";
    if (st.value == "Abia") {
        var optionArray = Abia;
    } else if (st.value == "Adamawa") {
        var optionArray = Adamawa;

    } else if (st.value == "Akwa-ibom") {
        var optionArray = AkwaIbom;

    } else if (st.value == "Anambra") {
        var optionArray = Anambra;
    } else if (st.value == "Bauchi") {
        var optionArray = Bauchi;
    } else if (st.value == "Bayelsa") {
        var optionArray = Bayelsa;
    } else if (st.value == "Benue") {
        var optionArray = Benue;
    } else if (st.value == "Borno") {
        var optionArray = Borno;
    } else if (st.value == "Cross Rivers") {
        var optionArray = CrossRiver;
    } else if (st.value == "Delta") {
        var optionArray = Delta;
    } else if (st.value == "Ebonyi") {
        var optionArray = Ebonyi;
    } else if (st.value == "Edo") {
        var optionArray = Edo;
    } else if (st.value == "Ekiti") {
        var optionArray = Ekiti;
    } else if (st.value == "Enugu") {
        var optionArray = Enugu;
    } else if (st.value == "FCT") {
        var optionArray = FCT;
    } else if (st.value == "Gombe") {
        var optionArray = Gombe;
    } else if (st.value == "Imo") {
        var optionArray = Imo;
    } else if (st.value == "Jigawa") {
        var optionArray = Jigawa;
    } else if (st.value == "Kaduna") {
        var optionArray = Kaduna;
    } else if (st.value == "Kano") {
        var optionArray = Kano;
    } else if (st.value == "Katsina") {
        var optionArray = Katsina;
    } else if (st.value == "Kebbi") {
        var optionArray = Kebbi;
    } else if (st.value == "Kogi") {
        var optionArray = Kogi;
    } else if (st.value == "Kwara") {
        var optionArray = Kwara;
    } else if (st.value == "Lagos") {
        var optionArray = Lagos;
    } else if (st.value == "Nassarawa") {
        var optionArray = Nassarawa;
    } else if (st.value == "Niger") {
        var optionArray = Niger;
    } else if (st.value == "Ogun") {
        var optionArray = Ogun;
    } else if (st.value == "Ondo") {
        var optionArray = Ondo;
    } else if (st.value == "Osun") {
        var optionArray = Osun;
    } else if (st.value == "Oyo") {
        var optionArray = Oyo;
    } else if (st.value == "Plateau") {
        var optionArray = Plateau;
    } else if (st.value == "Rivers") {
        var optionArray = Rivers;
    } else if (st.value == "Sokoto") {
        var optionArray = Sokoto;
    } else if (st.value == "Taraba") {
        var optionArray = Taraba;
    } else if (st.value == "Yobe") {
        var optionArray = Yobe;
    } else if (st.value == "Zamfara") {
        var optionArray = Zamfara;
    }

    for (var option in optionArray) {
        var pair = optionArray[option].split("|");
        var newOption = document.createElement("option");
        newOption.value = pair[0];
        newOption.innerHTML = pair[1];
        lg.options.add(newOption);


    }
}