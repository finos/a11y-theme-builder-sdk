// build darker tones of color varients //
function buildShades(mode, theme, color, shade) {
  var i = 0;
  var prime = shade
  var rgbArray = hextoRGBArray(color);
  // calculate how many light shades need to get built //
  var lightColors = (prime / 100) + 1;
  // calculate how many dark shades need to get built //
  var darkColors = ((900 - prime) / 100) + 1
  if (lightColors > 1) {
    var lightscale = chroma.scale([('#FFFFFF'), color]).correctLightness(true).colors(lightColors);
  } else {
    lightscale = [color]
  }
  if (darkColors > 1) {
    if (mode == 'dark') {
      var endColor = mixColors('#000000', color.toString(), .98);
    } else {
      var endColor = mixColors('#000000', color.toString(), .95);
    }
    var darkscale = chroma.scale([color, endColor]).correctLightness(true).colors(darkColors);
  } else {
    darkscale = [color]
  }
  if (lightscale.length > 0) {
    lightscale.splice(-1)
  }
  var colorScale = $.merge(lightscale, darkscale);
  while (i < 10) {
    //var newRGB = adjustLightness(rgbArray,shade,lightness,mode)
    if (i == 0) {
      var f = chroma.scale([('#FFFFFF'), color]);
      if (mode == 'light') {
        var scale = 100 / (prime * 2)
      } else {
        var scale = (100 / (prime * 4)) * 3
      }
      newRGB = (f(scale)).toString();
    } else {
      var newRGB = colorScale[i]
      // adjust saturation of each color to create triangel effect - most saturated color are 600 and 700 //
    }
    newRGB = triangle(color, i, prime, newRGB, mode)
    var shade = i * 100
    if (getContrast(newRGB) == '#ffffff') {
      text_color = [255, 255, 255]; // white
    } else {
      text_color = darkTextArray; // black
    }
    // get the contrast ration of the color against the suggested text color //
    var contrastRation = contrast(rgbArray, text_color); // 1.0736196319018405
    // convert the color to hex //
    newRGB = rgb2hex(newRGB)
    // based on the mode light or dark - run the appropriate check to see if the color and on color meet the contrats ratio of wcagContrast or if the shade needs to be lighted or darked //
    checkContrast(theme + '-' + mode + '-' + shade, newRGB, mode)
    //
    // loop through each shade //
    i++;
  }
  if (mode == 'dark') {
    $(document).find('#' + theme + '-' + mode).removeClass('rescaled')
    rescale(theme, 'dark')
  }
}

const mixColors = (c1, c2, opacity) => {
  const pn = n => ('0' + n.toString(16)).slice(-2);
  const [r0, g0, b0, r1, g1, b1] = [
    parseInt(c1.slice(1, 3), 16),
    parseInt(c1.slice(3, 5), 16),
    parseInt(c1.slice(5, 7), 16),
    parseInt(c2.slice(1, 3), 16),
    parseInt(c2.slice(3, 5), 16),
    parseInt(c2.slice(5, 7), 16),
  ];
  const [r, g, b] = [
    Math.round(r0 * opacity + r1 * (1 - opacity)),
    Math.round(g0 * opacity + g1 * (1 - opacity)),
    Math.round(b0 * opacity + b1 * (1 - opacity)),
  ];
  return `#${pn(r)}${pn(g)}${pn(b)}`;
};

function lighten(color, amount) {
  return ((mixColors(color, '#ffffff', amount)).toString())
}

function checkContrast(theme, color, mode) {
  var lightTextArray = hextoRGBArray(lightText);
  var rgbArray = hextoRGBArray(rgb2hex(color));
  var shade = theme.split('-')[2];
  var newRGB = "rgb(" + rgbArray + ")"
  var lightArray = lightTextArray
  var light = contrast(lightArray, rgbArray);
  var dark = contrast(darkTextArray, rgbArray);
  var text_color, textTint, contrastRatio
  var contrastRatio = contrast(lightArray, rgbArray);
  var elevationHex;
  if (light > dark) {
    text_color = lightArray; // white
    var textTint = 'light';
    if (mode == 'dark') {
      var colorHex = rgb2hex(color)
      /// for dark mode - lighten color light text ///
      var newText = lighten(colorHex, mixer)
      var newArray = hextoRGBArray(colorHex);
      var lightArray = hextoRGBArray(newText)
      var textHex
      contrastRatio = contrast(lightArray, newArray);
      var i = .00
      while (contrastRatio < wcagContrast) {
        var hex = (chroma(color).darken(i)).toString()
        var textHex = (mixColors(hex, '#ffffff', mixer)).toString();
        var textArray = hextoRGBArray(textHex);
        var newArray = hextoRGBArray(hex);
        var contrastRatio = contrast(newArray, textArray);
        i = i + .01
      }
      var newHex = (chroma(rgb2hex(color)).darken(i)).toString()
      console.log('original color: ' + color + ', i:' + i + ', elevationHex: ' + elevationHex + ', textHex: ' + textHex + ', conttrast: ' + contrastRatio + ' new-color: ' + newHex)
      var rgbArray = hextoRGBArray(newHex);
      var textTint = 'light';
      buildColor(theme, mode, rgbArray, text_color, contrastRatio)
      return false;
    }
  } else {
    text_color = darkTextArray; // dark
    var textTint = 'dark';
    contrastRatio = contrast(text_color, rgbArray);
  }
  if (textTint == 'light') {
    var buildText = lightTextArray
  } else {
    var buildText = darkTextArray
  }
  contrastRatio = contrastRatio.toFixed(2)
  if (contrastRatio < wcagContrast) {
    var darkCount = adjustDarkerCount(theme, newRGB, lightArray, contrastRatio, mode)
    var lightCount = adjustLighterCount(theme, newRGB, darkTextArray, contrastRatio, mode)
    if (darkCount < lightCount || shade >= 600) {
      adjustColorDarker(theme, newRGB, lightArray, contrastRatio, mode)
    } else {
      adjustColorLighter(theme, newRGB, darkTextArray, contrastRatio, mode)
    }
  } else {
    console.log('theme: ' + theme + ' ,text color:' + text_color + ', rgbArray' + rgbArray + ', contrastRatio: ' + contrastRatio)
    buildColor(theme, mode, rgbArray, buildText, contrastRatio)
  }
}

// updade sautation //
function triangle(color, i, prime, newRGB, mode) {
  var maxChroma, dmmaxChroma
  if ($('#setchromaMax').is(':checked')) {
    maxChroma = $('#chromaMax').val();
    dmmaxChroma = $('#dmchromaMax').val();
  } else {
    maxChroma = 100
    dmmaxChroma = 40
  }
  prime = prime / 100
  var primeHcl = chroma(color).hcl();
  if (primeHcl[1] > maxChroma) {
    maxChroma = primeHcl[1]
  }
  if (mode == 'dark') {
    if (maxChroma >= dmmaxChroma) {
      maxChroma = dmmaxChroma
    }
  }
  var primeChroma = primeHcl[1]
  var ihcl = chroma(newRGB).hcl()
  var change
  if (i == prime) {
    change = 1
    var newChroma = primeChroma * change
  } else if (prime < 7) {
    if (i == 0) {
      if (mode == 'dark') {
        change = .75 / prime
      } else {
        change = .5 / prime
      }
    }
    else if (i <= 7) {
      change = i / prime
    } else {
      change = (7 - (i - 7) - 1) / 7
    }
    var newChroma = primeChroma * change
  } else {
    var seven = (7 / (7 - (prime - 7) - 1)) * primeChroma
    if (seven > maxChroma) {
      seven = maxChroma
    }
    console.log('7: ' + seven)
    if (i <= 7) {
      if (i == 0) {
        var change = .75 / 7
      } else {
        var change = i / 7
      }
      console.log('change:' + change + ', seven: ' + seven)
      newChroma = seven * change
      console.log('i: ' + i + ', newChroma: ' + newChroma)
    } else {
      var change = (7 - (i - 7) - 1) / 7
      newChroma = seven * change
      console.log('i: ' + i + ', newChroma: ' + newChroma)
    }
  }
  /// don't let the chroma be over the max of less than 4 ///
  if (newChroma > maxChroma) {
    newChroma = maxChroma
  } else if (newChroma < 4) {
    newChroma = 4
  }
  newChroma = newChroma
  console.log('prime:' + prime + ', i: ' + i + ', change: ' + change + ' Chroma:' + newChroma)
  console.log('h: ' + ihcl[0] + ', c: ' + newChroma + ' , l: ' + ihcl[2])
  var newHCL = chroma.hcl(ihcl[0], newChroma, ihcl[2]).hex();
  console.log('i:' + i + ', hex: ' + newHCL + ' , chroma:' + chroma(newHCL).hcl()[1]);
  return (newHCL)
}

function adjusttoMaxContrast(color, text, mode) {
  /// get shades as close to contrast requiement as possible ///
  var i = 0
  var hex = (chroma(color).darken(i)).toString()
  var startHex = hex
  var newText, textArray, rbgArray, contrastRatio
  // get the dark mode text color //
  if (text == '#ffffff') {
    if (mode == 'dark') {
      newText = lighten(color, mixer).toString()
      textArray = hextoRGBArray(newText);
    } else {
      textArray = [255, 255, 255]
    }
  } else {
    textArray = darkTextArray
  }

  rgbArray = hextoRGBArray(hex);
  // get the contrast ration of the color against the suggested text color //
  contrastRatio = contrast(rgbArray, textArray);
  //alert('start i: ' + i + ', color: ' + hex + ', contrast: ' + contrastRatio)
  while (contrastRatio > wcagContrast) {
    i = i + .01
    if (text == '#ffffff') {
      hex = lighten(color, 1 - i)
      if (mode == 'dark') {
        newText = lighten(color, mixer).toString()
        textArray = hextoRGBArray(newText);
      } else {
        textArray = [255, 255, 255]
      }
    } else {
      hex = (chroma(color).darken(i)).toString()
      textArray = darkTextArray
    }
    rgbArray = hextoRGBArray(hex);
    contrastRatio = contrast(rgbArray, textArray);
    //alert('i: ' + i + ', color: ' + hex + ', contrast: ' + contrastRatio)
  }
  i = i - .01
  if (text == '#ffffff') {
    var hex = lighten(color, 1 - i)
    if (mode == 'dark') {
      newText = lighten(color, mixer).toString()
      textArray = hextoRGBArray(newText);
    } else {
      textArray = [255, 255, 255]
    }
  } else {
    hex = (chroma(color).darken(i)).toString()
    textArray = darkTextArray
  }
  rgbArray = hextoRGBArray(hex);
  contrastRatio = contrast(rgbArray, textArray);
  if (contrastRatio < wcagContrast || i == 0) {
    hex = startHex
    rgbArray = hextoRGBArray(hex);
    contrastRatio = contrast(rgbArray, textArray);
  }
  return (hex)
}


function adjust(colorName, mode) {
  var lastChar = dmOpacity[dmOpacity.length - 1];
  if (lastChar == "0") {
    dmOpacity = dmOpacity.slice(0, -1);
  }
  i = 100
  var firstLightText;
  while (i <= 900) {
    var text = $(document).find('#' + colorName + '-' + mode + '-' + i + ' .Hex').css('color');
    var darkTextRGB = hex2rgb(darkText)
    text = text.replace(/ /g, '');
    if (text == 'rgba(255,255,255,' + dmOpacity + ')' || text == 'rgb(255,255,255)') {
      firstLightText = i
      lastDarkText = i - 100;
      var startLightShade = rgb2hex($(document).find('#' + colorName + '-' + mode + '-0 .Hex').css('backgroundColor'));
      var endLightShade = rgb2hex($(document).find('#' + colorName + '-' + mode + '-' + lastDarkText + ' .Hex').css('backgroundColor'));
      var nexttoLast = lastDarkText - 100
      var nexttoLastLightShade = rgb2hex($(document).find('#' + colorName + '-' + mode + '-' + nexttoLast + ' .Hex').css('backgroundColor'));
      // check to see if the last and 2nd to last colors are close ///
      var difference = chroma.deltaE(endLightShade, nexttoLastLightShade);
      // if the color
      if ($('#' + colorName + '-' + mode + '-' + lastDarkText + ' .Hex').hasClass('lightened') || $('#' + colorName + '-' + mode + '-' + lastDarkText + ' .Hex').hasClass('darkened') || difference < 1.5) {
        var endLightShade = rgb2hex($(document).find('#' + colorName + '-' + mode + '-' + nexttoLast + ' .Hex').css('backgroundColor'));
      } else {
        var endLightShade = rgb2hex($(document).find('#' + colorName + '-' + mode + '-' + lastDarkText + ' .Hex').css('backgroundColor'));
      }
      // adjust the color to have the max possible contrast //
      endLightShade = adjusttoMaxContrast(endLightShade, darkTextArray, mode);
      //alert(colorName+'-'+mode+': ' + endLightShade)
      $(document).find('#' + colorName + '-' + mode + '-' + lastDarkText + ' .Hex').addClass('lastDarkText');
      checkContrast(colorName + '-' + mode + '-' + lastDarkText, hex2rgb(endLightShade), mode);
      var d = firstLightText
      var startDarkShade = rgb2hex($(document).find('#' + colorName + '-' + mode + '-' + firstLightText + ' .Hex').css('backgroundColor'));
      startDarkShade = adjusttoMaxContrast(startDarkShade, '#ffffff', mode)
      $(document).find('#' + colorName + '-' + mode + '-' + firstLightText + ' .Hex').addClass('firstLightText')
      checkContrast(colorName + '-' + mode + '-' + d, hex2rgb(startDarkShade), mode);
      rescale(colorName, mode, lastDarkText);
      return false;
    }
    i = i + 100
  }
}

function rescale(colorName, mode, lastDarkText) {
  // get the lights shade //
  var startLightShade = rgb2hex($(document).find('#' + colorName + '-' + mode + '-0 .Hex').css('backgroundColor'));
  // get the last shade with dark text //
  var endLightShade = rgb2hex($(document).find('#' + colorName + '-' + mode + '-' + lastDarkText + ' .Hex').css('backgroundColor'));
  var colorCount = lastDarkText / 100 + 1
  var newLightShades = chroma.scale([startLightShade, endLightShade]).colors(colorCount);
  // cycle through the new chroma scale and assign to the shades //
  var firstLightText = lastDarkText + 100
  var n = 0
  while (n < firstLightText) {
    var shadeIndex = n / 100
    var newColor = newLightShades[shadeIndex]
    var newRGB = hex2rgb(newColor);
    checkContrast(colorName + '-' + mode + '-' + n, newRGB, mode)
    n = n + 100
  }
  // get the darkest shade //
  var endDarkShade = rgb2hex($(document).find('#' + colorName + '-' + mode + '-900 .Hex').css('backgroundColor'));
  // get the first shade with light text //
  var startDarkShade = rgb2hex($(document).find('#' + colorName + '-' + mode + '-' + firstLightText + ' .Hex').css('backgroundColor'));
  var d = firstLightText
  while (d <= 900) {
    if (d == 900) {
      var endDarkShade = rgb2hex($(document).find('#' + colorName + '-' + mode + '-900 .Hex').css('backgroundColor'));
      var newRGB = hex2rgb(endDarkShade)
      checkContrast(colorName + '-' + mode + '-' + d, newRGB, mode)
    } else {
      // cycle through the new chroma scale and assign to the shades //
      var colorCount = (900 - lastDarkText) / 100
      var newDarkShades = chroma.scale([startDarkShade, endDarkShade]).colors(colorCount);
      var shadeIndex = (d - firstLightText) / 100
      var newColor = newDarkShades[shadeIndex]
      var newRGB = hex2rgb(newColor);
      checkContrast(colorName + '-' + mode + '-' + d, newRGB, mode)
    }
    d = d + 100
  }
}