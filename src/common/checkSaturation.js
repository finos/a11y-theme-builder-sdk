
$(document).ready(function() {

  var system;
  var themeName;
  var activeTheme;
  var wcag
  var grid
  var radius
  var borderWidth
  var focusBlur
  var animationSpeed
  var animationFocusDistance
  setGrid(8)
  // Light mode variables //

  var white = '#ffffff'
  var whiteHalf = 'rgba(255,255,255,.5)';
  var textLight = white;
  var textDark  = black;
  var buttonOnWhite
  var buttonHalfOnWhite
  var onbuttonOnWhite
  var linkOnWhite
  var vlinkOnWhite
  var linkVisitedOnWhite
  var linkDecorationOnWhite
  var iconOnWhite
  var black = '#121212';
  var blackHalf =  'rgba(0,0,0,.5)';
  var buttonOnBlack
  var buttonHalfOnBlack
  var onbuttonOnBlack
  var hotlinkOnBlack
  var vlinkOnBlack
  var linkVisitedOnBlack
  var hotlinkDecorationOnBlack
  var iconOnBlack
  var primary;
  var primaryName;
  var onPrimary;
  var primaryHalf
  var primaryQuarter;
  var primaryDarkBG
  var secondaryDarkBG
  var secondary;
  var secondaryName;
  var onSecondary;
  var tertiary;
  var tertiaryName;
  var onTertiary;
  var backgroundPrimary       = '#ffffff';
  var onbackgroundPrimary;
  var backgroundPrimaryName   = 'white-bg';
  var backgroundSecondary     = '#fafafa';
  var onbackgroundSecondary
  var backgroundSecondaryName;
  var backgroundTertiary;
  var onbackgroundTertiary;
  var buttonOnTertiary
  var onbuttonOnTertiary
  var backgroundTertiaryName;
  var buttonOnTertiary
  var buttonHalfOnTertiary
  var onbuttonOnTertiary
  var linkOnTertiary
  var vlinkOnTertiary
  var linkDecorationOnTertiary
  var iconOnTertiary
  var gradient1;
  var gradient1a;
  var gradient1aName;
  var gradient1b;
  var gradient1bName;
  var ongradient1a;
  var ongradient1b
  var buttonOnGradient1
  var onbuttonOnGradient1
  var buttonHalfOnGradient1
  var gradient2;
  var gradient2a;
  var gradient2aName;
  var gradient2b;
  var gradient2bName;
  var ongradient2a
  var ongradient2b
  var buttonOnGradient2
  var onbuttonOnGradient2
  var buttonHalfOnGradient2
  var buttonOnGradient3
  var buttonHalfOnGradient3
  var onbuttonOnGradient3
  var linkOnGradient3
  var vlinkOnGradient3
  var focusOnGradient3
  var iconOnGradient3
  var textGradient;
  var textgradient1aName
  var textgradient1bName
  var textGradientName;
  var gradientTexta;
  var gradientTextb;
  var colorDropName;
  var colorDrop;
  var borderColor;
  var chip;
  var onchip;
  var buttons;
  var buttonHalf;
  var onButtons;
  var groupButtonBG;
  var ongroupButtonBG = black;
  var buttonsName;
  var icons;
  var onIcons;
  var iconsName;
  var accentName
  var accent;
  var hotlink;
  var hotlinkName
  var hotlinkVisited;
  var focus;
  var focusBlur;
  var hover;
  var borderDefault;
  var inputDefault
  var oninputDefault
  var inputDisabled
  var oninputDisabled
  var lineColor
  var surface
  var onsurface
  // light mode charts colors //
  var chartPrimary1;
  var chartPrimary2;
  var chartPrimary3;
  var chartSecondary1;
  var chartSecondary2;
  var chartSecondary3;
  var chartTertiary1;
  var chartTertiary2;
  var chartTertiary3;
// light mode opaque charts colors //
  var chartPrimary1Opaque;
  var chartPrimary2Opaque;
  var chartPrimary3Opaque;
  var chartSecondary1Opaque;
  var chartSecondary2Opaque;
  var chartSecondary3Opaque;
  var chartTertiary1Opaque;
  var chartTertiary2Opaque;
  var chartTertiary3Opaque
  // dark mode variables //;
  var dmwhite = 'rgba(255,255,255,'+dmOpacity+')'
  var dmwhiteHalf = 'rgba(255,255,255,0.4)'
  var dmtextLight = dmwhite;
  var dmtextDark  = black;
  var dmbuttonOnWhite
  var dmbuttonHalfOnWhite
  var dmonbuttonOnWhite
  var dmbuttonOnBlack
  var dmonbuttonOnBlack
  var dmbuttonHalfOnBlack
  var dmiconOnWhite
  var dmiconOnBlack
  var dmfocusOnBlack
  var dmprimary;
  var dmprimaryName;
  var dmonprimary;
  var dmprimaryHalf
  var dmprimaryQuarter;
  var dmsecondary;
  var dmsecondaryName;
  var dmonsecondary;
  var dmtertiary;
  var dmtertiaryName ;
  var dmontertiary;
  var dmbackgroundPrimary   = '#121212';
  var dmonbackgroundPrimary = 'rgba(255,255,255,'+dmOpacity+')'
  var dmbackgroundPrimaryName;
  var dmbackgroundSecondary = black;
  var dmonbackgroundSecondary = 'rgba(255,255,255,'+dmOpacity+')'
  var dmbackgroundSecondaryName;
  var dmbackgroundTertiary  = nearblack;
  var dmonbackgroundTertiary = 'rgba(255,255,255,'+dmOpacity+')'
  var dmbackgroundTertiaryName;
  var dmbuttonOnTertiary
  var dmbuttonHalfOnTertiary
  var dmonbuttonOnTertiary
  var dmhotlinkOnTertiary
  var dmhotlinkDecorationOnTertiary
  var dmiconOnTertiary
  var dmtooltip;
  var dmsurface;
  var dmgradient1;
  var dmgradient1Name;
  var dmgradient1a;
  var dmgradient1b;
  var dmongradient1a;
  var dmongradient1b
  var dmbuttonOnGradient1
  var dmonbuttonOnGradient1
  var dmbuttonHalfOnGradient1
  var dmgradient2;
  var dmgradient2Name;
  var dmgradient2a;
  var dmgradient2b;
  var dmongradient2a
  var dmongradient2b
  var dmbuttonOnGradient2
  var dmbuttonHalfOnGradient2
  var dmonbuttonOnGradient2
  var dmbuttonOnGradient3
  var dmonbuttonOnGradient3
  var dmonbuttonHalfOnGradient3
  var dmhotlinkOnGradient3
  var dmiconOnGradient3
  var dmtextGradient;
  var dmtextGradientName;
  var dmgradientTexta;
  var dmgradientTextb;
  var dmcolorDropName   = 'black';
  var dmcolorDrop   = black;
  var dmBorderColor = 'rgba(255,255,255,.15)';
  var dmchip        = 'rgba(255,255,255,.35)';
  var dmonchip      = dmwhite;
  var dmbuttons;
  var dmbuttonHalf;
  var dmonbuttons;
  var dmgroupButtonBG  = 'rgba(255,255,255,.15)';
  var dmongroupButtonBG  = dmwhite;
  var dmbuttonsName;
  var dmicons;
  var dmonicons;
  var dmiconsName;
  var dmaccent;
  var dmaccentName;
  var dmhotlink;
  var dmhotlinkName;
  var dmhotlinkVisited;
  var dmfocus;
  var dmhover;
  var dmborderDefault;
  var dminputDefault
  var dmoninputDefault
  var dminputDisabled
  var dmoninputDisabled
  var dmlineColor
  // dark mode chart colors //
  var dmchartPrimary1;
  var dmchartPrimary2;
  var dmchartPrimary3;
  var dmchartSecondary1;
  var dmchartSecondary2;
  var dmchartSecondary3;
  var dmchartTertiary1;
  var dmchartTertiary2;
  var dmchartTertiary3;
  // dark mode opaque chart ccolors ////
  var dmchartPrimary1Opaque;
  var dmchartPrimary2Opaque;
  var dmchartPrimary3Opaque;
  var dmchartSecondary1Opaque;
  var dmchartSecondary2Opaque;
  var dmchartSecondary3Opaque;
  var dmchartTertiary1Opaque;
  var dmchartTertiary2Opaque;
  var dmchartTertiary3Opaque;
  // general variables
  var black = '#121212'
  var nearblack = '#181818';
  var gray0 = '#fafafa';
  var gray100 = '#fafafa'
  var gray200 = '#fafafa'
  var gray300 = '#fafafa'
  var gray400 = '#fafafa'
  var gray500 = '#fafafa'
  var gray600 = '#fafafa'
  var gray700 = '#fafafa'
  var gray800 = '#fafafa'
  var gray900 = '#fafafa'
  var spacing;
  var border;
  var borderRadius;
  var primaryFont;
  var secondaryFont;
  var lineHeight;
  var smLineHeight;
  var fontWeight0;
  var fontWeight1;
  var fontWeight2;
  var fontWeight3;
  var fontWeight4;
  var baseFont;
  var pSpacingBase;
  var headerChange;
  var headerWeight;
  var info;
  var warning;
  var success;
  var danger;
  var oninfo;
  var onwarning;
  var onsuccess;
  var ondanger;
  var dminfo;
  var dmwarning;
  var dmsuccess;
  var dmdanger;
  var dmoninfo;
  var dmonwarning;
  var dmonsuccess;
  var dmondanger;
  var elevationRGB;
  var elevationChange;
  var elevationHorizontal;
  var elevationVertical;
  var elevationBlur;
  var elevationSpread;
  var elevationOpacity;
  var baseBlur;
  var baseSpread;
  var baseOpacity;
  var elevation1;
  var elevation2;
  var elevation3;
  var elevation4;
  var elevation5;
  var elevation6;
  var elevation7;
  var elevation8;
  var elevation9;
  var bevelhorizontal;
  var bevelvertical;
  var bevelSpread;
  var bevelBlur;
  var bevellightOpacity;
  var beveldarkOpacity;
  var bevelchange;
  var inbevelhorizontal;
  var inbevelvertical;
  var inbevelSpread;
  var inbevelBlur;
  var inbevellightOpacity;
  var inbeveldarkOpacity;
  var inbevelchange;
  var chartBG;
  // general values ///
  var hotlinkDecoration
  var hotlinkVisitedDecoration
  var underline
  var colorTheory
  var colorBlindMode
  var grid;
  var minTarget
 // theme values light mode //
  window.primary0
  window.primary100
  window.primary200
  window.primary300
  window.primary400
  window.primary500
  window.primary600
  window.primary700
  window.primary800
  window.primary900
  window.primary0
  window.onprimary100
  window.onprimary200
  window.onprimary300
  window.onprimary400
  window.onprimary500
  window.onprimary600
  window.onprimary700
  window.onprimary800
  window.onprimary900
  window.secondary0
  window.secondary100
  window.secondary200
  window.secondary300
  window.secondary400
  window.secondary500
  window.secondary600
  window.secondary700
  window.secondary800
  window.secondary900
  window.secondary0
  window.onsecondary100
  window.onsecondary200
  window.onsecondary300
  window.onsecondary400
  window.onsecondary500
  window.onsecondary600
  window.onsecondary700
  window.onsecondary800
  window.onsecondary900
  window.tertiary0
  window.tertiary100
  window.tertiary200
  window.tertiary300
  window.tertiary400
  window.tertiary500
  window.tertiary600
  window.tertiary700
  window.tertiary800
  window.tertiary900
  window.tertiary0
  window.ontertiary100
  window.ontertiary200
  window.ontertiary300
  window.ontertiary400
  window.ontertiary500
  window.ontertiary600
  window.ontertiary700
  window.ontertiary800
  window.ontertiary900
  // theme values dark mode //
  window.dmprimary0
   window.dmprimary100
   window.dmprimary200
   window.dmprimary300
   window.dmprimary400
   window.dmprimary500
   window.dmprimary600
   window.dmprimary700
   window.dmprimary800
   window.dmprimary900
   window.dmprimary0
   window.dmonprimary100
   window.dmonprimary200
   window.dmonprimary300
   window.dmonprimary400
   window.dmonprimary500
   window.dmonprimary600
   window.dmonprimary700
   window.dmonprimary800
   window.dmonprimary900
   window.dmsecondary0
   window.dmsecondary100
   window.dmsecondary200
   window.dmsecondary300
   window.dmsecondary400
   window.dmsecondary500
   window.dmsecondary600
   window.dmsecondary700
   window.dmsecondary800
   window.dmsecondary900
   window.dmsecondary0
   window.dmonsecondary100
   window.dmonsecondary200
   window.dmonsecondary300
   window.dmonsecondary400
   window.dmonsecondary500
   window.dmonsecondary600
   window.dmonsecondary700
   window.dmonsecondary800
   window.dmonsecondary900
   window.dmtertiary0
   window.dmtertiary100
   window.dmtertiary200
   window.dmtertiary300
   window.dmtertiary400
   window.dmtertiary500
   window.dmtertiary600
   window.dmtertiary700
   window.dmtertiary800
   window.dmtertiary900
   window.dmtertiary0
   window.dmontertiary100
   window.dmontertiary200
   window.dmontertiary300
   window.dmontertiary400
   window.dmontertiary500
   window.dmontertiary600
   window.dmontertiary700
   window.dmontertiary800
   window.dmontertiary900
   // topography //
   var display1FontFamily
   var display1FontWeight
   var display1FontSize
   var display1LineHeight
   var display1CharcterSpacing
   var display1TextDecoration
   var display2FontFamily
   var display2FontWeight
   var display2FontSize
   var display2LineHeight
   var display2CharcterSpacing
   var display2TextDecoration
   var h1FontFamily
   var h1FontWeight
   var h1FontSize
   var h1LineHeight
   var h1CharcterSpacing
   var h1TextDecoration
   var h2FontFamily
   var h2FontWeight
   var h2FontSize
   var h2LineHeight
   var h2CharcterSpacing
   var h2TextDecoration
   var h3FontFamily
   var h3FontWeight
   var h3FontSize
   var h3LineHeight
   var h3CharcterSpacing
   var h3TextDecoration
   var h4FontFamily
   var h4FontWeight
   var h4FontSize
   var h4LineHeight
   var h4CharcterSpacing
   var h4TextDecoration
   var h5FontFamily
   var h5FontWeight
   var h5FontSize
   var h5LineHeight
   var h5CharcterSpacing
   var h5TextDecoration
   var h6FontFamily
   var h6FontWeight
   var h6FontSize
   var h6LineHeight
   var h6CharcterSpacing
   var h6TextDecoration
   var body1FontFamily
   var body1FontWeight
   var body1FontSize
   var body1LineHeight
   var body1CharcterSpacing
   var body1TextDecoration
   var body1SemiboldWeight
   var body1BoldWeight
   var body2FontFamily
   var body2FontWeight
   var body2FontSize
   var body2LineHeight
   var body2CharcterSpacing
   var body2TextDecoration
   var body2SemiboldWeight
   var body2BoldWeight
   var body3FontFamily
   var body3FontWeight
   var body3FontSize
   var body3LineHeight
   var body3CharcterSpacing
   var body3TextDecoration
   var body3SemiboldWeight
   var body3BoldWeight
   var subtitle1FontFamily
   var subtitle1FontWeight
   var subtitle1FontSize
   var subtitle1LineHeight
   var subtitle1CharcterSpacing
   var subtitle1TextDecoration
   var subtitle2FontFamily
   var subtitle2FontWeight
   var subtitle2FontSize
   var subtitle2LineHeight
   var subtitle2CharcterSpacing
   var subtitle2TextDecoration
   var captionFontFamily
   var captionFontWeight
   var captionFontSize
   var captionLineHeight
   var captionCharcterSpacing
   var captionTextDecoration
   var captionBoldWeight
   var overlineFontFamily
   var overlineFontWeight
   var overlineFontSize
   var overlineLineHeight
   var overlineCharcterSpacing
   var overlineTextDecoration
   var overlineLargeFontFamily
   var overlineLargeFontWeight
   var overlineLargeFontSize
   var overlineLargeLineHeight
   var overlineLargeCharcterSpacing
   var overlineLargeTextDecoration
   var overlineXLFontFamily
   var overlineXLFontWeight
   var overlineXLFontSize
   var overlineXLLineHeight
   var overlineXLCharcterSpacing
   var overlineXLTextDecoration
   var label1FontFamily
   var label1FontWeight
   var label1FontSize
   var label1LineHeight
   var label1CharcterSpacing
   var label2FontFamily
   var label2FontWeight
   var label2FontSize
   var label2LineHeight
   var label2CharcterSpacing
   var labelSmallFontFamily
   var labelSmallFontWeight
   var labelSmallFontSize
   var labelSmallLineHeight
   var labelSmallCharcterSpacing
   var labelSmallTextDecoration
   var ctaFontFamily
   var ctaFontWeight
   var ctaFontSize
   var ctaLineHeight
   var ctaCharcterSpacing
   var ctaTextDecoration
   var ctaTextTransform
   var ctaSmallFontFamily
   var ctaSmallFontWeight
   var ctaSmallFontSize
   var ctaSmallLineHeight
   var ctaSmallCharcterSpacing
   var ctaSmallTextDecoration
   var ctaSmallTextTransform
   var smallFontFamily
   var smallFontWeight
   var smallFontSize
   var smallLineHeight
   var smallCharcterSpacing
   var smallTextDecoration
   var smallBoldWeight
   var statFontFamily
   var statFontWeight
   var statFontSize
   var statLineHeight
   var statCharcterSpacing
   var statTextDecoration
   //// MOLECULES  ////
   // avatarts //
   var avatarBorder
   var avatarBorderLg
   var avatarElevations
   // buttons //
   var buttonMinWidth
   var buttonBorder
   var buttonBorderRadius
   var buttonHPadding
   var buttonTypography
   var buttonTextTransform
   var buttonTextDecoration
   var buttonLetterSpacing
   var buttonElevation;
   var buttonBevel;
   var smallButtonHeight
   var smallButtonTextName
   var smallbuttonHPadding
   var smallbuttonTextTransform
   var smallbuttonLetterSpacing
   // cards //
   var cardRadius
   var cardElevation
   var cardBevel
   var cardPadding
   var cardGap
   var cardBorder
   // chips //
   var chipHeight
   var chipMinWidth
   var chipBorderRadius
   var chipHPadding
   var chipTopography
   var chipTextTransform
   var chipTextSpacing
   var chipElevation
   // dropdowns //
   var dropdownTheme
   var dropdownElevation
   var dropdownRadius
   // slider //
   var sliderbarHeight
   var sliderbarBevel
   var sliderhandleHeight
   var sliderhandleBevel
   var sliderhandleElevation = 0
   var sliderhandleRadius
   // content spaceing //
   var pPadding
   var sectionPadding
   // modals //
  var modalPadding
  var modalBorder
  var modalRadius
  var modalOverlay
  var modalElevation
  // tooltips //
  var tooltipPadding
  var tooltipRadius
  var tooltipElevation
  var tooltipBevel
  // toast //
  var toastPadding
  var toastRadius
  var toastBorder
  var toastBevel
  var toastElevations
  // Images //
  var imageElevation
  var imageRadius
  var imageBorder
  // List Images //
  var inlineImageHeight
  var inlineImageRadius
   // line charts //
   var linechartBackground
   var linechartLineWidth
   var linechartXlegend
   var linechartElevation
   // bar charts ...
   var barchartBackground
   var barchartWidth
   var barchartRadius
   var barchartBorder
   var barchartXLegend
   var barchartYlegend
   var barchartBevel
   var barchartElevation
   // line charts //
   var linechartBackground
   var linechartLinewidth
   var linechartXLegend
   var linechartYLegend
   var linechartElevation
   // donut charts //
   var donutchartBackground
   var donutchartThickness
   var donutchartRadius
   var donutchartSpace
   var donutchartXLegend
   var donutchartYLegend
   var donutchartBevel
   var donutchartElevation
   var donutchartContainer
   var donutcontainerDisplay
   var donutContainer
   var donutholeDisplay
   // pie charts //
   var piechartBackground
   var piechartRadius
   var piechartSpace
   var piechartXLegend
   var piechartYLegend
   var piechartBevel
   var piechartElevation
   var piechartContainer
   var piecontainerDisplay
   var piecontainerBevel
   // progress charts //
   var progresschartBackground
   var progresschartSpace
   var progresschartRadius
   var progresschartThicknesss
   var progresschartXLegend
   var progresschartYLegend
   var progresschartBevel
   var progresschartElevation
   var progressStart
   // ORGANISMS //
   var heroGap
   var heroPadding
   var heroTitleTopogrphy
   var heroTitleSpacing
   var heroTitleTransform
   var heroBodyTopogrphy
   var heroBodySpacing
   var heroBodyTransform
   var primaryNavFixed
   var primaryNavVPadding
   var secondaryNavSticky
   var secondaryNavVPadding
   var secondaryNavStickyAt
   var tableheaderTopography
   var tableheaderSpacing
   var tableheaderTransform
   var tablebodyTopography
   var tablebodyTransform
   var tablebodySpacing
   var tableheaderPadding  = 1
   var tablebodyPadding  = 1
   var wcagContrast   = 4.5
   var wcagSMContrast = 3.1
   var darkText = '#121212';
   var darkTextArray = [35,35,63];
   var darkRGB = 'rgb(18,18,18)'
   var lightText = '#ffffff'
   var dmOpacity = .7
   var mixer = 1 - dmOpacity;
   // activate the date picker ///
   $( "#datepicker" ).datepicker();

   // tool tips //
   var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
   var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
     return new bootstrap.Tooltip(tooltipTriggerEl)
   })

   // popoverss //
   var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
   var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
  })

  // multiselect //
    $('#example-getting-started').multiselect();

  // custom popover //
  $('.pagination .more').on('shown.bs.popover', function(e) {

  var id = $(e.target).attr('aria-describedby');
  $('#'+id).html('<p><b>My New Popover Content</b></p>');

});

  /////  PHASE I - SET THE STAGE ////
  // set the default root variables of the interface //
  document.querySelector(':root').style.setProperty('--primaryFont', 'Discover Sans');
  document.querySelector(':root').style.setProperty('--secondaryFont', 'Discover Sans');
  document.querySelector(':root').style.setProperty('--primary', '#23233D');
  document.querySelector(':root').style.setProperty('--on-primary', '#ffffff');
  document.querySelector(':root').style.setProperty('--button', '#EC6B29');
  document.querySelector(':root').style.setProperty('--on-button', '#121212');
  document.querySelector(':root').style.setProperty('--surface', '#ffffff');
  document.querySelector(':root').style.setProperty('--on-surface', '#121212');
  var handle = $( ".custom-handle" );
  $('#colorInputpicker').farbtastic('#colorInput');
  $('#shadowpicker').farbtastic('#elevation-rgb');
  var f = $.farbtastic('#picker');
  var p = $('#picker').css('opacity', 0.25);
  var selected;
  $('.colorwell')
   .each(function () { f.linkTo(this); $(this).css('opacity',.9); })
   .focus(function() {
    if (selected) {
      $(selected).css('opacity', 1).removeClass('colorwell-selected');
    }
    f.linkTo(this);
    p.css('opacity', 1);
    $(selected = this).css('opacity', 1).addClass('colorwell-selected');
  });

  // If a system is passed throught the url - identify and load it //
  // get url parameter //
  var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          }
      }
      return false;
  };
  // var tech = getUrlParameter('technology');
  // http://dummy.com/?technology=jquery&blog=jquerybyexample.
  // if no design systems exist create get started button from welcome //
  var systemCount = $('.system:not(#Sample)').length;
  if (systemCount == 1) {
    $('#start-new-system div').html('Get started')
  } else {
    $('#start-new-system div').html('Explore your design systems')
  }

  // create a system from your systems //
  $('#start-new-system').click(function() {
      $('#welcome-interface .content').removeClass('active');
      $('#welcome-interface #systems').addClass('active');
      newSystem();
  });

  // create new stsrem from dropdown//
  $('#new-system, #create-new').click(function() {
    newSystem();
  });


  $('#system-name').click(function() {
    var err = false;
    $('.errorMessage').remove();
    $('input').removeClass('error')

    var wcagLevel = $("input[type='radio'][name='wcag']:checked").val();
    if (wcagLevel == "AA") {
      wcagContrast = 4.5
      wcagSMContrast = 3.1
    } else {
      wcagContrast = 7.1
      wcagSMContrast  = 4.5
    }

    dmOpacity = parseFloat($("#darkModeOpacity").val()).toFixed(2);

    darkText = $('#darkText').val();
    darkTextArray = hextoRGBArray(darkText)
    darkRGB  = hex2rgb(darkText)
    document.querySelector(':root').style.setProperty('--darkText', darkText);
    document.querySelector(':root').style.setProperty('--black', darkText );
    document.querySelector(':root').style.setProperty('--blackTextArray', hextoRGBArray(darkText) );
    document.querySelector(':root').style.setProperty('--dmOpacity', dmOpacity  );

    // get the error color //
    var errorColor = $('.lightmode .danger').css('backgroundColor');
    errorColor  = rgb2hex(errorColor);
    // check for the name //
    if(!$('#new-name').val()){
       err = true;
       errorMessage = 'Please provide a name for your system'
       $('<div class="errorMessage small">'+errorMessage +'</div>').insertAfter('#new-name');
       $('#new-name').parent().find('.errorMessage').prepend('<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.875 6C10.875 8.69239 8.69239 10.875 6 10.875C3.30761 10.875 1.125 8.69239 1.125 6C1.125 3.30761 3.30761 1.125 6 1.125C8.69239 1.125 10.875 3.30761 10.875 6ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 -2.34843e-07 6 -5.24537e-07C2.68629 -8.1423e-07 8.1423e-07 2.68629 5.24537e-07 6C2.34843e-07 9.31371 2.68629 12 6 12ZM6 7.5C5.58579 7.5 5.25 7.83579 5.25 8.25C5.25 8.66421 5.58579 9 6 9C6.41421 9 6.75 8.66421 6.75 8.25C6.75 7.83579 6.41421 7.5 6 7.5ZM6 6.5C5.58579 6.5 5.25 6.16421 5.25 5.75L5.25 3.75C5.25 3.33579 5.58579 3 6 3C6.41421 3 6.75 3.33579 6.75 3.75L6.75 5.75C6.75 6.16421 6.41421 6.5 6 6.5Z" fill="'+errorColor+'"/></svg>')
    } else {
      // check if the name is unique
      system = $('#new-name').val().replace(/\s/g, '');
      $(document).find('.system').each(function() {
        var id = $(this).attr('id');
        if (system == id) {
          err = true;
          $('#new-name').addClass('error');
          errorMessage = 'Please provide a unique name for your system'
          $('<div class="errorMessage small">'+errorMessage +'</div>').insertAfter('#new-name');
          $('#new-name').parent().find('.errorMessage').prepend('<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.875 6C10.875 8.69239 8.69239 10.875 6 10.875C3.30761 10.875 1.125 8.69239 1.125 6C1.125 3.30761 3.30761 1.125 6 1.125C8.69239 1.125 10.875 3.30761 10.875 6ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 -2.34843e-07 6 -5.24537e-07C2.68629 -8.1423e-07 8.1423e-07 2.68629 5.24537e-07 6C2.34843e-07 9.31371 2.68629 12 6 12ZM6 7.5C5.58579 7.5 5.25 7.83579 5.25 8.25C5.25 8.66421 5.58579 9 6 9C6.41421 9 6.75 8.66421 6.75 8.25C6.75 7.83579 6.41421 7.5 6 7.5ZM6 6.5C5.58579 6.5 5.25 6.16421 5.25 5.75L5.25 3.75C5.25 3.33579 5.58579 3 6 3C6.41421 3 6.75 3.33579 6.75 3.75L6.75 5.75C6.75 6.16421 6.41421 6.5 6 6.5Z" fill="'+errorColor+'"/></svg>')
        }
      });
    }

    // create the system //
    if (err == false) {
      $('.errorMessage').remove();
      $('input').removeClass('error')
      createSystem();
    }

  });

  // create new system from Your Systesm //
  $('#explore').click(function() {
      $('#welcome-interface .main .content').removeClass('active');
      $('#sample-systems').addClass('active');
      $('#intro .left-nav .sub-section').removeClass('active');
      $('#intro .left-nav .sub-section[name=sample-systems]').addClass('active');
  });

  // create new system from Your Systesm //
  $('.mobileNav .navItem').click(function() {
      $(this).parent().find('.navItem').removeClass('active');
      $(this).addClass('active')
  });



  // if the user clicks create new system - open a modal to capture the new system name //
  function newSystem() {
    $('#systemName').modal('show');
  }

  function createSystem() {

     clearSystem();
     $('.system').removeClass('active');
     $('#Sample').clone().insertAfter('#Sample').attr('id', system).addClass('active');
     $('#SampleDefault').clone().insertAfter('#SampleDefault').attr('id', system + 'Default').addClass('active');
     activeTheme = system + 'Default'
     $('#template').clone().insertBefore('#template').attr('id', system + '-card').addClass('active');
     $('#systemName').modal('hide');

     setSystem();
     clearTheme();
     $('#welcome-interface').removeClass('active');
     $('#compose-interface').addClass('active');
     $('#' + system + 'Default').remove()
     $('#new-name').val('')
     $('.content').removeClass('active');
     $('#buildColor').addClass('active');
     $('#atomicIntro').modal('show');
     $('.colorRow').remove();
     $('.light-mode .subtitle1').remove();
     $('.dark-mode .subtitle1').remove();
     $('.results').removeClass('active');
     $('.step2').addClass('disabled')
  }
  function clearTheme() {
    $('.colorGroup').remove()
    $('#buildThemes .theme-dropdown').addClass('no-selection');
    $('#buildThemes .theme-dropdown button .Hex:not(.permColors)').attr('style', '').attr('name','');
    $('.sample-col').removeClass('active');
    $('#themeName').val('');
    $('#themeBackground button .Hex').eq(0).attr('class','Hex white-bg').attr('name','white-bg')
    $('#themeBackground button .Hex').eq(1).attr('class','Hex gray-050-bg')
    $('#themeDarkmode-BG button .Hex').eq(0).attr('class','Hex nearblack-bg').attr('name','nearblack')
    $('#themeDarkmode-BG button .Hex').eq(1).attr('class','Hex black-bg').attr('name','black')
    $('.dropdown-subtitle.subtitle1').remove();
    $('#buildThemes').scrollTop(0);
  }

  // clicking on a Design System Card //
  $(document).on('click', '.system-card', function() {
    system = $(this).attr('name');
    openSystem();
  });

  function openSystem() {
    clearSystem();
    $('#' + system + 'Default').addClass('active');
    $('.fullpage').removeClass('active');
    $('#compose-interface').addClass('active');
    $('#compose-interface .main').removeClass('active');
    $('#composer').addClass('active');
    $('#compose-interface .main .content').removeClass('active');
    $('#' + system + 'Default').addClass('active');
    $('.theme-container').hide();
    $(document).find('.theme-container.default-theme').show()
    /// turn all other systems off //
    $('.system').removeClass('active');
    // activate system //
    $(document).find('#' + system).addClass('active');
    // activate theme  if it exists//
    if ($('#' + system + 'Default').length) {
      $('#' + system + 'Default').addClass('active');
      // activate theme //
      $('#' + system + 'Default-theme').addClass('active');
    }
    $('#current-system button').html(system)
    setSystem();
  }

  function setSystem() {
    if ($('.system.active').length = 0) {
      $('#system').addClass('active');
    }
    // system settings //
    grid                = $(document).find('#' + system +  ' .default-grid').html();
    border              = $(document).find('#' + system +  ' .default-border-1').html();
    borderRadius        = $(document).find('#' + system +  ' .default-radius-1').html();
    focusTheme          = $(document).find('#' + system +  ' .default-focus-theme').html();
    focusBlur           = $(document).find('#' + system +  ' .default-focus-blur').html();
    animationSpeed      = $(document).find('#' + system +  ' .default-timing').html();
    animationFocusDistance = $(document).find('#' + system +  ' .default-distance').html();
    // typography //
    primaryFont         = $(document).find('#' + system +  ' .default-primaryFont').html();
    secondaryFont       = $(document).find('#' + system +  ' .default-secondaryFont').html();
    lineHeight          = $(document).find('#' + system +  ' .default-standard-LineHeight').html();
    smLineHeight        = $(document).find('#' + system +  ' .default-sm-LineHeight').html();
    fontWeight0         = $(document).find('#' + system +  ' .default-fontWeight-0').html();
    fontWeight1         = $(document).find('#' + system +  ' .default-fontWeight-1').html();
    fontWeight2         = $(document).find('#' + system +  ' .default-fontWeight-2').html();
    fontWeight3         = $(document).find('#' + system +  ' .default-fontWeight-3').html();
    fontWeight4         = $(document).find('#' + system +  ' .default-fontWeight-4').html();
    baseFont            = $(document).find('#' + system +  ' .default-baseFont').html();
    headerChange        = $(document).find('#' + system +  ' .default-headerChange').html();
    headerWeight        = $(document).find('#' + system +  ' .default-headerWeight').html();
    // states //
    info                = $(document).find('#' + system +  ' .default-info').html();
    warning             = $(document).find('#' + system +  ' .default-warning').html();
    success             = $(document).find('#' + system +  ' .default-success').html();
    danger              = $(document).find('#' + system +  ' .default-danger').html();
    dminfo              = $(document).find('#' + system +  ' .default-dminfo').html();
    dmwarning           = $(document).find('#' + system +  '  .default-dmwarning').html();
    dmsuccess           = $(document).find('#' + system +  '  .default-dmsuccess').html();
    dmdanger            = $(document).find('#' + system +  '  .default-dmdanger').html();
    oninfo              = $(document).find('#' + system +  '  .default-oninfo').html();
    onwarning           = $(document).find('#' + system +  ' .default-onwarning').html();
    onsuccess           = $(document).find('#' + system +  ' .default-onsuccess').html();
    ondanger            = $(document).find('#' + system +  ' .default-ondanger').html();
    dmoninfo            = $(document).find('#' + system +  ' .default-dmoninfo').html();
    dmonwarning         = $(document).find('#' + system +  ' .default-dmonwarning').html();
    dmonsuccess         = $(document).find('#' + system +  ' .default-dmonsuccess').html();
    dmondanger          = $(document).find('#' + system +  ' .default-dmondanger').html();
    // elevations //
    elevationRGB        = $(document).find('#' + system +  ' .default-elevation-rgb').html();
    elevationChange        = $(document).find('#' + system +  ' .default-elevation-change').html();
    elevationHorizontal    = $(document).find('#' + system +  ' .default-elevation-horizontal').html();
    elevationVertical      = $(document).find('#' + system +  ' .default-elevation-veritcal').html();
    elevationBlur          = $(document).find('#' + system +  ' .default-elevation-blur').html();
    elevationSpread        = $(document).find('#' + system +  ' .default-elevation-spread').html();
    elevationOpacity       = $(document).find('#' + system +  ' .default-elevation-opacity').html();
    baseBlur               = $(document).find('#' + system +  ' .default-base-blur').html();
    baseSpread             = $(document).find('#' + system +  ' .default-base-spread').html();
    baseOpacity            = $(document).find('#' + system +  ' .default-base-opacity').html();
    // bevels //
    bevelhorizontal        = $(document).find('#' + system +  ' .default-bevel-horizontal').html();
    bevelreversehorizontal = $(document).find('#' + system +  ' .default-bevel-reverse-horizontal').html();
    bevelvertical          = $(document).find('#' + system +  ' .default-bevel-vertical').html();
    bevelreversevertical   = $(document).find('#' + system +  ' .default-bevel-reverse-vertical').html();
    bevelSpread            = $(document).find('#' + system +  ' .default-bevel-spread').html();
    bevelBlur              = $(document).find('#' + system +  ' .default-bevel-blur').html();
    bevellightOpacity      = $(document).find('#' + system +  ' .default-bevel-light-opacity').html();
    beveldarkOpacity       = $(document).find('#' + system +  ' .default-bevel-dark-opacity').html();
    bevelchange            = $(document).find('#' + system +  ' .default-bevel-change').html();
    inbevelhorizontal      = $(document).find('#' + system +  ' .default-inbevel-horizontal').html();
    inbevelvertical        = $(document).find('#' + system +  ' .default-inbevel-vertical').html();
    inbevelSpread          = $(document).find('#' + system +  ' .default-inbevel-spread').html();
    inbevelBlur            = $(document).find('#' + system +  ' .default-inbevel-blur').html();
    inbeveldarkOpacity     = $(document).find('#' + system +  ' .default-inbevel-dark-opacity').html();
    inbevelchange          = $(document).find('#' + system +  ' .default-inbevel-change').html();
    // avatars  //
    avatarBorder           = $(document).find('#' + system +  ' .default-avatar-border').html();
    avatarBorderLg         = $(document).find('#' + system +  ' .default-sm-avatar-border').html();
    avatarElevations       = $(document).find('#' + system +  ' .default-avatar-elevation').html();
    // buttons //
    buttonHPadding         = $(document).find('#' + system +  ' .default-button-padding').html();
    buttonBorder           = $(document).find('#' + system +  ' .default-button-border').html();
    buttonBorderRadius     = $(document).find('#' + system +  ' .default-button-radius').html();
    buttonMinWidth         = $(document).find('#' + system +  ' .default-button-min-width').html();
    buttonTextName         = $(document).find('#' + system +  ' .default-button-textName').html();
    buttonTextTransform    = $(document).find('#' + system +  ' .default-button-textTransform').html();
    buttonLetterSpacing    = $(document).find('#' + system +  ' .default-button-textSpacing').html();
    buttonElevation        = $(document).find('#' + system +  ' .default-button-elevation').html();
    buttonBevel            = $(document).find('#' + system +  ' .default-button-bevel').html();
    smallButtonHeight      = $(document).find('#' + system +  ' .default-sm-button-height').html();
    smallbuttonHPadding    = $(document).find('#' + system +  ' .default-sm-button-padding').html();
    smallButtonTextNam     = $(document).find('#' + system +  ' .default-sm-button-textName').html();
    smallbuttonTextTransform = $(document).find('#' + system +  ' .default-sm-button-textTransform').html();
    smallbuttonTextTransform = $(document).find('#' + system +  ' .default-sm-button-textSpacing').html();
    // cards //
    cardPadding            = $(document).find('#' + system +  ' .default-card-padding').html();
    cardGap                = $(document).find('#' + system +  ' .default-card-gap').html();
    cardBorder             = $(document).find('#' + system +  ' .default-card-border').html();
    cardRadius             = $(document).find('#' + system +  ' .default-card-radius').html();
    cardElevation          = $(document).find('#' + system +  ' .default-card-elevation').html();
    cardBevel              = $(document).find('#' + system +  ' .default-card-bevel').html();
    // chip //
    chipHPadding           = $(document).find('#' + system +  ' .default-chip-padding').html();
    chipBorderRadius       = $(document).find('#' + system +  ' .default-chip-radius').html();
    chipMinWidth           = $(document).find('#' + system +  ' .default-chip-minwidth').html();
    chipHeight             = $(document).find('#' + system +  ' .default-chip-height').html();
    chipTypography         = $(document).find('#' + system +  ' .default-chip-text').html();
    chipText               = $(document).find('#' + system +  ' .default-chip-textTransform').html();
    chipTextSpacinh        = $(document).find('#' + system +  ' .default-chip-textSpacing').html();
    chipTextTransform      = $(document).find('#' + system +  ' .default-card-bevel').html();
    chipElevation          = $(document).find('#' + system +  ' .default-chip-elevation').html();
    // dropdowns //
    dropdownTheme          = $(document).find('#' + system +  ' .default-dropdown-theme').html();
    dropdownElevation      = $(document).find('#' + system +  ' .default-dropdown-elevation').html();
    dropdownRadius         = $(document).find('#' + system +  ' .default-dropdown-radius').html();
    // spacing //
    pPadding               = $(document).find('#' + system +  ' .default-pSpacing').html();
    sectionPadding          = $(document).find('#' + system +  ' .default-secitonSpacing').html();
    // images //
    imageElevation         = $(document).find('#' + system +  ' .default-image-elevation').html();
    imageRadius            = $(document).find('#' + system +  ' .default-image-radius').html();
    imageBorder            = $(document).find('#' + system +  ' .default-image-border').html();
    inlineImageHeight      = $(document).find('#' + system +  ' .default-inline-image-height').html();
    inlineImageRadius      = $(document).find('#' + system +  ' .default-inline-image-radius').html();
    // modal //
    modalPadding           = $(document).find('#' + system +  ' .default-modalPadding').html();
    modalBorder            = $(document).find('#' + system +  ' .default-modalBorder').html();
    modalRadius            = $(document).find('#' + system +  ' .default-modalRadius').html();
    modalOverlay           = $(document).find('#' + system +  ' .default-modalOverlay').html();
    modalElevation         = $(document).find('#' + system +  ' .default-modalElevation').html();
    // sldiers //
    sliderbarHeight        = $(document).find('#' + system +  ' .default-sliderbarHeight').html();
    sliderhandleHeight     = $(document).find('#' + system +  ' .default-sliderhandleHeight').html();
    sliderhandleElevation  = $(document).find('#' + system +  ' .default-sliderhandleElevation').html();
    sliderhandleBevel      = $(document).find('#' + system +  ' .default-sliderhandleBevel').html();
    sliderbarBevel         = $(document).find('#' + system +  ' .default-sliderbarBevel').html();
    sliderhandleRadius     = $(document).find('#' + system +  ' .default-sliderhandleRadius').html();
    // toasts //
    toastPadding           = $(document).find('#' + system +  ' .default-toastPadding').html();
    toastRadius            = $(document).find('#' + system +  ' .default-toastRadius').html();
    toastBevel             = $(document).find('#' + system +  ' .default-toastBevel').html();
    toastElevations        = $(document).find('#' + system +  ' .default-toastElevations').html();
    // toolytips //
    tooltipPadding         = $(document).find('#' + system +  ' .default-tooltipPadding').html();
    tooltipRadius          = $(document).find('#' + system +  ' .default-tooltipRadius').html();
    tooltipElevation       = $(document).find('#' + system +  ' .default-tooltipElevation').html();
    tooltipBevel           = $(document).find('#' + system +  ' .default-tooltipBevel').html();
    //hero //
    heroBodyTextName       = $(document).find('#' + system +  ' .default-heroBodyTextName ').html();
    heroBodySpacing        = $(document).find('#' + system +  ' .default-heroBodySpacing').html();
    heroBodyTransform      = $(document).find('#' + system +  ' .default-heroBodyTransform').html();
    heroTitleTextName      = $(document).find('#' + system +  ' .default-heroTitleTextName').html();
    heroTitleSpacing       = $(document).find('#' + system +  ' .default-heroTitleSpacing ').html();
    heroTitleTransform     = $(document).find('#' + system +  ' .default-heroTitleTransform').html();
    heroPadding            = $(document).find('#' + system +  ' .default-heroPadding').html();
    heroGap                = $(document).find('#' + system +  ' .default-heroGap').html();
    // primaryNav //
    primaryNavFixed        = $(document).find('#' + system +  ' .default-primaryNavFixed').html();
    primaryNavVPadding     = $(document).find('#' + system +  ' .default-primaryNavVPadding').html();
    // secondaryNav //
    secondaryNavSticky     = $(document).find('#' + system +  ' .default-secondaryNavSticky ').html();
    secondaryNavVPadding   = $(document).find('#' + system +  ' .default-secondaryNavVPadding ').html();
    secondaryNavStickyAt   = $(document).find('#' + system +  ' .default-secondaryNavStickyAt').html();
    // tables //
    tableheaderTextName    = $(document).find('#' + system +  ' .default-headerTextName').html();
    tableheaderSpacing     = $(document).find('#' + system +  ' .default-headerSpacing').html();
    tableheaderTransform   = $(document).find('#' + system +  ' .default-headerTransform').html();
    tablebodyTextName      = $(document).find('#' + system +  ' .default-bodyTextName').html();
    tablebodySpacing       = $(document).find('#' + system +  ' .default-bodySpacing').html();
    tablebodyTextTransform = $(document).find('#' + system +  ' .default-bodyTransform').html();
    tableheaderPadding     = $(document).find('#' + system +  ' .default-headerPadding').html();
    tablebodyPadding       = $(document).find('#' + system +  ' .default-bodyPadding').html();
    // system roots //
    document.querySelector(':root').style.setProperty('--min-target', minTarget);
    document.querySelector(':root').style.setProperty('--spacing-1', grid );
    document.querySelector(':root').style.setProperty('--border-1', border);
    document.querySelector(':root').style.setProperty('--radius-1', borderRadius);
    document.querySelector(':root').style.setProperty('--focusBlur', focusBlur);
    document.querySelector(':root').style.setProperty('--animation-speed', animationSpeed);
    document.querySelector(':root').style.setProperty('--animation-focus-distance', animationFocusDistance);
    // typogrpahy //
    document.querySelector(':root').style.setProperty('--primaryFont', primaryFont);
    document.querySelector(':root').style.setProperty('--secondaryFont ', secondaryFont);
    document.querySelector(':root').style.setProperty('--fontWeight-0', fontWeight0);
    document.querySelector(':root').style.setProperty('--fontWeight-1', fontWeight1);
    document.querySelector(':root').style.setProperty('--fontWeight-2', fontWeight2);
    document.querySelector(':root').style.setProperty('--fontWeight-3', fontWeight3 );
    document.querySelector(':root').style.setProperty('--fontWeight-4', fontWeight4 );
    document.querySelector(':root').style.setProperty('--headerChange', headerChange );
    document.querySelector(':root').style.setProperty('--headerWeight', headerWeight);
    document.querySelector(':root').style.setProperty('--baseFont', baseFont);
    document.querySelector(':root').style.setProperty('--standard-LineHeight', lineHeight );
    document.querySelector(':root').style.setProperty('--sm-LineHeight', smLineHeight );
    // states //
    document.querySelector(':root').style.setProperty('--info:',  info );
    document.querySelector(':root').style.setProperty('--success ', success);
    document.querySelector(':root').style.setProperty('--warning', warning );
    document.querySelector(':root').style.setProperty('--danger:', danger);
    document.querySelector(':root').style.setProperty('--on-info', oninfo);
    document.querySelector(':root').style.setProperty('--on-success', onsuccess);
    document.querySelector(':root').style.setProperty('--on-warning', onwarning );
    document.querySelector(':root').style.setProperty('--on-danger', ondanger );
    document.querySelector(':root').style.setProperty('--dm-info', dminfo);
    document.querySelector(':root').style.setProperty('--dm-success', dmsuccess);
    document.querySelector(':root').style.setProperty('--dm-warning', dmwarning  );
    document.querySelector(':root').style.setProperty('--dm-danger', dmdanger );
    document.querySelector(':root').style.setProperty('--dm-on-info', dmoninfo);
    document.querySelector(':root').style.setProperty('--dm-on-success', dmonsuccess);
    document.querySelector(':root').style.setProperty('--dm-on-warning', dmonwarning  );
    document.querySelector(':root').style.setProperty('--dm-on-danger', dmondanger  );
    // elevations //
    document.querySelector(':root').style.setProperty('--elevation-rgb', elevationRGB );
    document.querySelector(':root').style.setProperty('--elevation-change', elevationChange);
    document.querySelector(':root').style.setProperty('--base-blur', baseBlur);
    document.querySelector(':root').style.setProperty('--base-spread', baseSpread   );
    document.querySelector(':root').style.setProperty('--base-opacity', baseOpacity);
    document.querySelector(':root').style.setProperty('--elevation-horizontal', elevationHorizontal);
    document.querySelector(':root').style.setProperty('--elevation-veritcal', elevationVertical );
    document.querySelector(':root').style.setProperty('--elevation-blur', elevationBlur  );
    document.querySelector(':root').style.setProperty('--elevation-spread', elevationSpread );
    document.querySelector(':root').style.setProperty('--elevation-opacity', elevationOpacity  );
    // bevels //
    document.querySelector(':root').style.setProperty('--bevel-light-opacity', bevellightOpacity);
    document.querySelector(':root').style.setProperty('--bevel-dark-opacity',  beveldarkOpacity);
    document.querySelector(':root').style.setProperty('--bevel-change', bevelchange);
    document.querySelector(':root').style.setProperty('--bevel-blur', bevelBlur   );
    document.querySelector(':root').style.setProperty('--bevel-spread', bevelSpread);
    document.querySelector(':root').style.setProperty('--bevel-veritcal:', bevelvertical);
    document.querySelector(':root').style.setProperty('--bevel-horizontal', bevelhorizontal );
    document.querySelector(':root').style.setProperty('--inbevel-dark-opacity',  inbeveldarkOpacity);
    document.querySelector(':root').style.setProperty('--inbevel-change',inbevelchange);
    document.querySelector(':root').style.setProperty('--inbevel-blur', inbevelBlur   );
    document.querySelector(':root').style.setProperty('--inbevel-spread', inbevelSpread);
    document.querySelector(':root').style.setProperty('--inbevel-veritcal:', inbevelvertical);
    document.querySelector(':root').style.setProperty('--inbevel-horizontal', inbevelhorizontal );
    // avatars //
    document.querySelector(':root').style.setProperty('--avatar-border',  avatarBorder );
    document.querySelector(':root').style.setProperty('--avatar-border-lg', avatarBorderLg);
    document.querySelector(':root').style.setProperty('--avatar-elevation', avatarElevations );
   // buttons //
   document.querySelector(':root').style.setProperty('--button-padding', buttonHPadding);
   document.querySelector(':root').style.setProperty('--button-border',  buttonBorder );
   document.querySelector(':root').style.setProperty('--button-radius', buttonBorderRadius);
   document.querySelector(':root').style.setProperty('--button-minwidth', buttonMinWidth   );
   document.querySelector(':root').style.setProperty('--button-textName', buttonTextName);
   document.querySelector(':root').style.setProperty('--buttonTextTransform::',  buttonTextTransform );
   document.querySelector(':root').style.setProperty('--buttonCharcterSpacing', buttonLetterSpacing  );
   document.querySelector(':root').style.setProperty('--button-elevation', buttonElevation  );
   document.querySelector(':root').style.setProperty('--button-bevel',  buttonBevel);
   document.querySelector(':root').style.setProperty('--sm-button-height',smallButtonHeight );
   document.querySelector(':root').style.setProperty('--sm-button-padding', smallbuttonHPadding );
   document.querySelector(':root').style.setProperty('--sm-button-textName', smallButtonTextName );
   document.querySelector(':root').style.setProperty('--sm-buttonTextTransform:', smallbuttonTextTransform );
   document.querySelector(':root').style.setProperty('--sm-buttonCharcterSpacing', smallbuttonTextTransform );
   // cards //
   document.querySelector(':root').style.setProperty('--card-padding', cardPadding   );
   document.querySelector(':root').style.setProperty('--card-gap',  cardGap );
   document.querySelector(':root').style.setProperty('--card-border',cardBorder );
   document.querySelector(':root').style.setProperty('--card-radius', cardRadius);
   document.querySelector(':root').style.setProperty('--card-elevation', cardElevation);
   document.querySelector(':root').style.setProperty('--card-bevel', cardBevel );
   // chips //
   document.querySelector(':root').style.setProperty('--chip-padding', chipHPadding    );
   document.querySelector(':root').style.setProperty('--chip-radius',  chipBorderRadius  );
   document.querySelector(':root').style.setProperty('--chip-minwidth',chipMinWidth);
   document.querySelector(':root').style.setProperty('--chip-height', chipHeight);
   document.querySelector(':root').style.setProperty('--chip-font', chipTypography);
   document.querySelector(':root').style.setProperty('--chip-character-spacing', chipTextSpacing );
   document.querySelector(':root').style.setProperty('--chip-transform', chipTextTransform   );
   document.querySelector(':root').style.setProperty('--chip-elevation',  chipElevation);
   // dropdown //
   document.querySelector(':root').style.setProperty('--dropdown-focus-theme', dropdownTheme );
   document.querySelector(':root').style.setProperty('--dropdown-elevation', dropdownElevation  );
   document.querySelector(':root').style.setProperty('--dropdown-radius',   dropdownRadius );
   // sapcing //
   document.querySelector(':root').style.setProperty('--p-padding', pPadding);
   document.querySelector(':root').style.setProperty('--section-padding', sectionPadding );
   // images //
   document.querySelector(':root').style.setProperty('--image-elevation', imageElevation     );
   document.querySelector(':root').style.setProperty('--image-radius',  imageRadius  );
   document.querySelector(':root').style.setProperty('--image-border', imageBorder );
   document.querySelector(':root').style.setProperty('--inline-image-height', inlineImageHeight );
   document.querySelector(':root').style.setProperty('--inline-image-image-radius',  inlineImageRadius);
   // modals //
   document.querySelector(':root').style.setProperty('--modal-padding', modalPadding     );
   document.querySelector(':root').style.setProperty('--modal-border',  modalBorder );
   document.querySelector(':root').style.setProperty('--modal-radius', modalRadius) ;
   document.querySelector(':root').style.setProperty('--modal-overlay', modalOverlay  );
   document.querySelector(':root').style.setProperty('--modal-elevation',  modalElevation);
   // sliders //
   document.querySelector(':root').style.setProperty('--sliderbarHeight', sliderbarHeight     );
   document.querySelector(':root').style.setProperty('--sliderhandleHeight',  sliderhandleHeight );
   document.querySelector(':root').style.setProperty('--sliderhandleRadius', sliderhandleRadius) ;
   document.querySelector(':root').style.setProperty('--sliderbarBevel', sliderbarBevel     );
   document.querySelector(':root').style.setProperty('--sliderhandleElevation',  sliderhandleElevation );
   document.querySelector(':root').style.setProperty('--sliderhandleBevel', sliderhandleBevel) ;
   // toasts //
   document.querySelector(':root').style.setProperty('--toast-padding', toastPadding);
   document.querySelector(':root').style.setProperty('--toast-radius',  toastRadius);
   document.querySelector(':root').style.setProperty('--toast-bevel', toastBevel) ;
   document.querySelector(':root').style.setProperty('--toast-elevation', toastElevations );
   // tooltips //
   document.querySelector(':root').style.setProperty('--tooltip-padding', tooltipPadding);
   document.querySelector(':root').style.setProperty('--tooltip-borderRadius',  tooltipRadius );
   document.querySelector(':root').style.setProperty('--tooltip-elevation', tooltipElevation ) ;
   document.querySelector(':root').style.setProperty('--tooltip-bevel', tooltipBevel);
   // hero //
   document.querySelector(':root').style.setProperty('--hero-gap', heroGap    );
   document.querySelector(':root').style.setProperty('--hero-body-textName',  heroBodyTextName );
   document.querySelector(':root').style.setProperty('--hero-body-spacing',heroBodySpacing );
   document.querySelector(':root').style.setProperty('--hero-body-transform', heroBodyTransform);
   document.querySelector(':root').style.setProperty('--hero-title-textName', heroTitleTextName);
   document.querySelector(':root').style.setProperty('--hero-title-spacing', heroTitleSpacing);
   document.querySelector(':root').style.setProperty('--hero-title-transform', heroTitleTransform );
   document.querySelector(':root').style.setProperty('--hero-padding',  heroPadding );
   // primary Nav //
   document.querySelector(':root').style.setProperty('--navbarPrimary-position', primaryNavFixed);
   document.querySelector(':root').style.setProperty('--navbarPrimary-padding',  primaryNavVPadding);
   // secondary Nav //
   document.querySelector(':root').style.setProperty('--navbarSecondary-position',  secondaryNavSticky);
   document.querySelector(':root').style.setProperty('--navbarSecondary-padding',  secondaryNavVPadding);
   document.querySelector(':root').style.setProperty('--navbarSecondary-stickyat',  secondaryNavStickyAt);
   // tables //
   document.querySelector(':root').style.setProperty('--tableheaderTextName', tableheaderTextName);
   document.querySelector(':root').style.setProperty('--tableheaderSpacing',tableheaderSpacing);
   document.querySelector(':root').style.setProperty('--tableheaderTransform',tableheaderTransform);
   document.querySelector(':root').style.setProperty('--tablebodyTextName', tablebodyTextName);
   document.querySelector(':root').style.setProperty('--tablebodySpacing', tablebodySpacing);
   document.querySelector(':root').style.setProperty('--tablebodyTextTransform)', tablebodyTextTransform);
   document.querySelector(':root').style.setProperty('--tableheaderPadding', tableheaderPadding );
   document.querySelector(':root').style.setProperty('--tablebodyPadding',  tablebodyPadding);

   // build the colors of the palette that exist in the system //
   if ($(document).find('#' + system + ' .default-palette .color').length > 0 ) {
     $(document).find('#' + system + ' .default-palette .color').each(function() {
       var colorClass = $(this).find('.name').html();
       var color = $(this).find('.Hex').text();
       addtoTheme(colorClass, color);
     });
   }

    $('.theme-page').removeClass('active');
    if ($(document).find('#' + system + 'Default').length > 0){
      $('#' + system  +'Default').addClass('active');
      $('.theme-container').parents('li').hide();
      $('.default-theme').parents('li').show();
      $('#' + system + 'Default-theme').addClass('active')
      activeTheme = system + 'Default'
      setTheme();
    } else {
      clearSystem();
    }
    clearTheme();


    /////  UPDATE SYSTEM HTML ///
    $('input[name=grid][value='+spacing+']').attr('checked', 'checked');
    $('#border-1').html(border);
    $('#radius-1').html(borderRadius);
    $('#primaryFont').html(primaryFont);
    $('#secondaryFont ').html(secondaryFont);
    $('#standard-LineHeight ').html(lineHeight);
    $('#sm-LineHeight').html(smLineHeight)
    $('#fontWeight-0').html(fontWeight0);
    $('#fontWeight-1').html(fontWeight1);
    $('#fontWeight-2').html(fontWeight2);
    $('#fontWeight-3').html(fontWeight3);
    $('#fontWeight-4').html(fontWeight4);
    $('#baseFont').html(baseFont);
    $('#headerWeight').html(headerWeight);
    $('#typography-change').val(headerChange);
    $('#info').html(info);
    $('.info').css(info);
    $('.info').css(oninfo);
    $('#warning').html(warning)
    $('.warning').css('background',warning)
    $('.warning').css('color',onwarning)
    $('#success').html(success)
    $('.success').css('background',success)
    $('.success').css('color',onsuccess)
    $('#danger').html(danger)
    $('.danger').css('background',danger)
    $('.danger').css('color',ondanger)
    $('#dm-info').html(dminfo)
    $('#States .darkmode .info').css(dminfo)
    $('#dm-warning').html(dmwarning)
    $('#States .darkmode .warning').css('background',dmwarning)
    $('#dm-success').html(dmsuccess)
    $('#States .darkmode .success').css('background',dmsuccess)
    $('#dm-danger').html(dmdanger)
    $('#States .darkmode .danger').css('background',dmdanger)
    $('#bevel-change').val(bevelchange);
    $('#bevel-horizontal').val(bevelhorizontal);
    $('#bevel-vertical').val(bevelvertical);
    $('#bevel-spread').val(bevelSpread);
    $('#bevel-blur').val(bevelBlur);
    $('#bevel-light-opacity').val(bevellightOpacity);
    $('#bevel-dark-opacity').val(beveldarkOpacity);
    var elevationColor = 'rgb(' + elevationRGB + ')';
    var elevationColor  = rgb2hex(elevationColor );
    $('#elevation-rgb').val(elevationColor);
    $('#elevation-change').val(elevationChange);
    $('#elevation-horizontal').val(elevationHorizontal);
    $('#elevation-vertical').val(elevationVertical);
    $('#elevation-spread').val(elevationBlur);
    $('#elevation-spread').val(elevationSpread);
    $('#elevation-opacity').val(elevationOpacity);
    $('#base-blur').val(baseBlur);
    $('#base-spread').val(baseSpread );
    $('#base-opacity').val(baseOpacity  );
    var chartRGBA =  'rgba(' + elevationRGB + ', ' + elevationOpacity + ')';

    /////  UPDATE ROOT VARIABLE ///
    // grid //
    document.querySelector(':root').style.setProperty('--spacing-1', spacing);
    // borders //
    document.querySelector(':root').style.setProperty('--border-1', border);
    document.querySelector(':root').style.setProperty('--radius-1', borderRadius);
    // topography //
    document.querySelector(':root').style.setProperty('--primaryFont', primaryFont);
    document.querySelector(':root').style.setProperty('--secondaryFont', secondaryFont);
    document.querySelector(':root').style.setProperty('--standard-LineHeight', lineHeight);
    document.querySelector(':root').style.setProperty('--sm-LineHeight', smLineHeight);
    document.querySelector(':root').style.setProperty('--fontWeight-0', fontWeight0);
    document.querySelector(':root').style.setProperty('--fontWeight-1', fontWeight1);
    document.querySelector(':root').style.setProperty('--fontWeight-2', fontWeight2);
    document.querySelector(':root').style.setProperty('--fontWeight-3', fontWeight3);
    document.querySelector(':root').style.setProperty('--fontWeight-4', fontWeight4);
    document.querySelector(':root').style.setProperty('--baseFont', baseFont);
    document.querySelector(':root').style.setProperty('--headerChange', headerChange);
    document.querySelector(':root').style.setProperty('--headerWeight', headerWeight);
    // states //
    document.querySelector(':root').style.setProperty('--info', info);
    document.querySelector(':root').style.setProperty('--warning', warning);
    document.querySelector(':root').style.setProperty('--success', success);
    document.querySelector(':root').style.setProperty('--danger', danger);
    document.querySelector(':root').style.setProperty('--dm-info', dminfo);
    document.querySelector(':root').style.setProperty('--dm-warning', dmwarning);
    document.querySelector(':root').style.setProperty('--dm-success', dmsuccess);
    document.querySelector(':root').style.setProperty('--dm-danger', dmdanger);
    document.querySelector(':root').style.setProperty('--on-info', oninfo);
    document.querySelector(':root').style.setProperty('--on-warning', onwarning);
    document.querySelector(':root').style.setProperty('--on-success', onsuccess);
    document.querySelector(':root').style.setProperty('--on-danger', ondanger);
    document.querySelector(':root').style.setProperty('--dm-on-info', dmoninfo);
    document.querySelector(':root').style.setProperty('--dm-on-warning', dmonwarning);
    document.querySelector(':root').style.setProperty('--dm-on-success', dmonsuccess);
    document.querySelector(':root').style.setProperty('--dm-on-danger', dmondanger);
    // elevations //
    document.querySelector(':root').style.setProperty('--elevation-rgb', elevationRGB);
    document.querySelector(':root').style.setProperty('--elevation-opacity', elevationOpacity);
    document.querySelector(':root').style.setProperty('--elevation-change', elevationChange);
    document.querySelector(':root').style.setProperty('--elevation-horizontal', elevationHorizontal);
    document.querySelector(':root').style.setProperty('--elevation-vertical', elevationVertical);
    document.querySelector(':root').style.setProperty('--elevation-blur', elevationBlur);
    document.querySelector(':root').style.setProperty('--elevation-spread', elevationSpread);
    document.querySelector(':root').style.setProperty('--base-elevation-blur', baseBlur);
    document.querySelector(':root').style.setProperty('--base-elevation-spread', baseSpread);
    document.querySelector(':root').style.setProperty('--base-elevation-opacity', baseOpacity);
    // elevations BG //
    document.querySelector(':root').style.setProperty('--elevation-bg-1', elevation1);
    document.querySelector(':root').style.setProperty('--elevation-bg-2', elevation2);
    document.querySelector(':root').style.setProperty('--elevation-bg-3', elevation3);
    document.querySelector(':root').style.setProperty('--elevation-bg-4', elevation4);
    document.querySelector(':root').style.setProperty('--elevation-bg-5', elevation5);
    document.querySelector(':root').style.setProperty('--elevation-bg-6', elevation6);
    document.querySelector(':root').style.setProperty('--elevation-bg-7', elevation7);
    document.querySelector(':root').style.setProperty('--elevation-bg-8', elevation8);
    document.querySelector(':root').style.setProperty('--elevation-bg-9', elevation9);
    // bevels //
    document.querySelector(':root').style.setProperty('--bevel-horizontal', bevelhorizontal );
    document.querySelector(':root').style.setProperty('--bevel-reverse-horizontal',bevelreversehorizontal);
    document.querySelector(':root').style.setProperty('--bevel-vertical', bevelvertical);
    document.querySelector(':root').style.setProperty('--bevel-reverse-vertical', bevelreversevertical);
    document.querySelector(':root').style.setProperty('--bevel-spread', bevelSpread);
    document.querySelector(':root').style.setProperty('--bevel-blur', bevelBlur);
    document.querySelector(':root').style.setProperty('--bevel-light-opacity', bevellightOpacity);
    document.querySelector(':root').style.setProperty('--bevel-dark-opacity', beveldarkOpacity);
    document.querySelector(':root').style.setProperty('--bevel-change', bevelchange);
    document.querySelector(':root').style.setProperty('--inbevel-horizontal', inbevelhorizontal );
    document.querySelector(':root').style.setProperty('--inbevel-vertical', inbevelvertical);
    document.querySelector(':root').style.setProperty('--inbevel-spread', inbevelSpread);
    document.querySelector(':root').style.setProperty('--inbevel-blur', inbevelBlur);
    document.querySelector(':root').style.setProperty('--inbevel-dark-opacity', inbeveldarkOpacity);
    document.querySelector(':root').style.setProperty('--inbevel-change', inbevelchange);

    document.querySelector(':root').style.setProperty('--chart-shadow-color', chartRGBA );
    $(document).find('#' + system +  ' .default-chart-shadow-color').html(chartRGBA);

    updateCustomTypography()
    updateTextStyles()
    setTheme()
  }

  // update custom styles //
  function updateCustomTypography() {
    $(document).find('#' + system +  ' .customStyles.editted').each(function() {
      var name       = $(this).attr('name')
      var fontFamily = $(this).find('.font-family').html();
      var fontSize   = $(this).find('.font-size').html();
      var fontWeight = $(this).find('.font-weight').html();
      var lh         = $(this).find('.line-height').html();
      var spacing    = $(this).find('.letter-spacing').html();
     if ($(this).find('.font-text-decoration').length) {
       var decoration = $(this).find('.letter-spacing').html();
       $('.' + name).css({
         'font-family': fontFamily,
         'font-size': fontSize,
         'font-weight': fontWeight,
         'text-decoration': decoration
       })
     } else {
       $('.' + name).css({
         'font-family': fontFamily,
         'font-size': fontSize,
         'font-weight': fontWeight,
         'line-height': lh
       })
     }
    });
  }

  // update text styles //
  function updateTextStyles() {
    $('.styles').each(function() {
      var name           = $(this).attr('name')
      var fontFamily     = $(this).parents().find('.' + name).css('font-family');
      var fontSize       = $(this).parents().find('.' + name).css('font-size');
      var fontWeight     = $(this).parents().find('.' + name).css('font-weight');
      var lh             = $(this).parents().find('.' + name).css('line-height');
      var spacing        = $(this).parents().find('.' + name).css('letter-spacing');
      var textDecoration = $(this).parents().find('.' + name).css('text-decoration');
      $(this).find('.font-family span').html(fontFamily)
      $(this).find('.font-size span').html(fontSize)
      $(this).find('.font-weight span').html(fontWeight)
      $(this).find('.font-line-height span').html(lh)
      $(this).find('.font-charcter-spacing span').html(spacing)
      if ($(this).find('.font-text-decoration').length) {
        $(this).find('.font-text-decoration span').html(textDecoration)
      }
    });
  }




  // reset the UI to the defaul setting //
  function clearSystem() {
    $('#topNav .nav-item').addClass('disabled');
    $('#topNav .nav-item').removeClass('active');
    $('#topNav .nav-item[name=composer]').removeClass('disabled').addClass('active');
    $('.row.results').removeClass('active');
    $('.theme-dropdown:not(.permColors) ul li').remove();
    $('.theme-dropdown:not(.permColors) button .Hex').attr('name','').attr('style','')
    $('#composer .left-nav .section').removeClass('active');
    $('#composer .left-nav .sub-section').removeClass('active');
    $('.main').removeClass('active');
    $('#composer').addClass('active');
    $('.sample-col').removeClass('active')
    $('.step2').addClass('disabled');
    $('#required').addClass('active');
  }

  function setTheme() {
      // check to see if a theme exists //
      if (activeTheme) {
        $('.nav-item').removeClass('disabled');
        $('.step2').removeClass('disabled');

        if ($('#colorBlindMode').is(':checked')) {
          activeTheme = 'ColorBlind'
        }
        // build primary, secondary and tertiary shades //
        primaryName        =  $(document).find('#' + system +  ' .default-primaryName').html();
        var primary0Name   =  primaryName .split('-')[0];
        setThemeShades('primary', primary0Name )
        secondaryName      = $(document).find('#' + system +  ' .default-secondaryName').html();
        var secondary0Name   =  secondaryName.split('-')[0];
        setThemeShades('secondary', secondary0Name)
        tertiaryName      = $(document).find('#' + system +  ' .default-tertiaryName').html();
        var tertiary0Name   =  tertiaryName.split('-')[0];
        setThemeShades('tertiary', tertiary0Name)
        // get the primary shade of the primary color //
        primary                   = window[$(document).find('#' + activeTheme + ' .lightmode .default-primary').attr('name').replace('-','')];
        onPrimary                 = window['on' + $(document).find('#' + activeTheme + ' .lightmode .default-primary').attr('name').replace('-','')];
        themePrimary(  primaryName , primary, onPrimary )
        secondary                 = window[$(document).find('#' + activeTheme + ' .lightmode .default-secondary').attr('name').replace('-','')];
        onSecondary               = window['on' + $(document).find('#' + activeTheme + ' .lightmode .default-secondary').attr('name').replace('-','')];
        showThemeOptions( secondaryName)
        setThemeShades('secondary', secondaryName.split('-')[0] )
        tertiary                  = window[$(document).find('#' + activeTheme + ' .lightmode .default-tertiary').attr('name').replace('-','')];
        onTertiary                = window['on' + $(document).find('#' + activeTheme + ' .lightmode .default-tertiary').attr('name').replace('-','')];
        showThemeOptions( tertiaryName)
        setThemeShades('tertiary', tertiaryName.split('-')[0] )

        backgroundPrimary         = $(document).find('#' + activeTheme + ' .lightmode .default-background').css('backgroundColor');
        backgroundPrimaryName     = $(document).find('#' + activeTheme + ' .lightmode .default-background').attr('name')
        onbackgroundPrimary       = $(document).find('#' + activeTheme + ' .lightmode .default-background').css('color');
        backgroundSecondary       = $(document).find('#' + activeTheme + ' .lightmode .default-background-secondary').css('backgroundColor');
          if (backgroundPrimaryName == 'white-bg') {
            backgroundSecondaryName = 'gray-050-bg';
            colorDrop               = $(document).find('#primary-light-100 .Hex').css('backgroundColor')
            colorDropName           = 'primary-100';
            borderColor             = 'rgba(0,0,0,.15)'
            chip                    = 'rgba(0,0,0,.25)'
            onchip                  =  black
            groupButtonBG           =  inputDefault
            lineColor               = "rgba(0,0,0,.05)";
            surface                 = "#ffffff";
            onsurface               = "#121212";
          } else if (backgroundPrimaryName == 'primary-half-bg') {
            backgroundSecondaryName = 'primary-quarter-bg'
            colorDrop               = $(document).find('#primary-light-100 .Hex').css('backgroundColor')
            colorDropName           = 'primary-100';
            borderColor             = 'rgba(0,0,0,.15)'
            chip                    = 'rgba(0,0,0,.25)'
            onchip                  =  black
            groupButtonBG           =  inputDefault
            lineColor               = "rgba(0,0,0,.05)"
            surface                 = "#ffffff";
            onsurface                 = "#121212";
          } else if(backgroundPrimaryName == 'primaryDarkBG') {
            backgroundSecondaryName = 'secondaryDarkBG'
            colorDrop               = black
            colorDropName           = 'black';
            borderColor             = 'rgba(255,255,255,.15)'
            chip                    = 'rgba(255,255,255,.25)'
            onchip                  =  white
            groupButtonBG           =  'rgba(255,255,255,.1)'
            lineColor               = "rgba(255,255,255.05)"
            surface                 =  backgroundPrimary;
            onsurface               = "#ffffff";

          } else {
            backgroundSecondaryName = 'black-bg'
            colorDrop               = blacken
            colorDropName          = 'black';
            borderColor             = 'rgba(255,255,255,.15)'
            chip                    = 'rgba(255,255,255,.25)'
            onchip                  =  white
            groupButtonBG           = 'rgba(255,255,255,.1)'
            lineColor               = "rgba(255,255,255.05)"
            surface                 =  backgroundPrimary;
            onsurface                 = "#ffffff";
          }
          document.querySelector(':root').style.setProperty('--chip' , chip);
          document.querySelector(':root').style.setProperty('--on-chip' , onchip);
          document.querySelector(':root').style.setProperty('--color-drop' , colorDrop );
          document.querySelector(':root').style.setProperty('--border' , borderColor );
          document.querySelector(':root').style.setProperty('--chart-lineColor' , lineColor);
          document.querySelector(':root').style.setProperty('--groupButtonBG' , groupButtonBG );
          onbackgroundSecondary     = $(document).find('#' + activeTheme + ' .lightmode .default-background-secondary').css('color');
          themeBackground(backgroundPrimaryName, backgroundPrimary , onbackgroundPrimary )

          // update the colors shades to theme shades (primary, secondary and tertiary) ///
          updateNames(primaryName.split('-')[0], 'primary')
          updateNames(secondaryName.split('-')[0] , 'secondary')
          updateNames(tertiaryName.split('-')[0] , 'tertiary')
          gradient1                 = $(document).find('#' + activeTheme + ' .lightmode .default-gradient-1').css('background');
          gradient1Name             = $(document).find('#' + activeTheme + ' .lightmode .default-gradient-1').attr('name')
          gradient1a                = window[gradient1Name.split(',')[0].replace('-','')]
          ongradient1a              = window['on' + gradient1Name .split(',')[0].replace('-','')]
          gradient1b                = window[gradient1Name.split(',')[1].replace('-','')]
          ongradient1b              = window['on' + gradient1Name.split(',')[1].replace('-','')]
          document.querySelector(':root').style.setProperty('--gradient1-a' , gradient1a);
          document.querySelector(':root').style.setProperty('--on-gradient1-a' , ongradient1a);
          document.querySelector(':root').style.setProperty('--gradient1-b' , gradient1a);
          gradient2                 = $(document).find('#' + activeTheme + ' .lightmode .default-gradient-2').css('background');
          gradient2Name             = $(document).find('#' + activeTheme + ' .lightmode .default-gradient-2').attr('name')
          gradient2a                = window[gradient2Name.split(',')[0].replace('-','')]
          ongradient2a              = window['on' + gradient2Name.split(',')[0].replace('-','')]
          gradient2b                = window[gradient2Name.split(',')[1].replace('-','')]
          ongradient2b              = window['on' + gradient2Name.split(',')[1].replace('-','')]

          themeGradient2a(gradient2Name.split(',')[0], gradient2a, ongradient2a )
          themeGradient2b(gradient2Name.split(',')[1], gradient2b, ongradient2b )
          document.querySelector(':root').style.setProperty('--gradient1-a' , gradient1a);
          document.querySelector(':root').style.setProperty('--on-gradient1-a' , ongradient1a);
          document.querySelector(':root').style.setProperty('--gradient1-b' , gradient1a);
          textGradientName          = $(document).find('#' + activeTheme + ' .lightmode .default-gradient-title').attr('name');
          gradientTextaName         = textGradientName.split(',')[0]
          gradientTexta             = window[gradientTextaName.replace('-','')]
          gradientTextbName         = textGradientName.split(',')[1]
          gradientTextb             = window[gradientTextbName.replace('-','')]
          iconsName                 = $(document).find('#' + activeTheme + ' .lightmode .default-icon').attr('name')
          icons                     = window[iconsName.replace('-','')];
          onIcons                   = window['on' + iconsName.replace('-','')];
          themeIcons(iconsName  ,icons , onIcons )
          buttonsName               = $(document).find('#' + activeTheme + ' .lightmode .default-button').attr('name')
          buttons                   = window[buttonsName .replace('-','')]
          onButtons                 = window['on' + buttonsName .replace('-','')];
          themeButtons(buttonsName ,buttons , onButtons )
          if (backgroundPrimary == '#ffffff' || backgroundPrimary == 'rgb(255,255,255)') {
            chartBG = backgroundSecondary;
            document.querySelector(':root').style.setProperty('--chart-bg', backgroundSecondary);
            document.querySelector(':root').style.setProperty('--input', '#ffffff');
            document.querySelector(':root').style.setProperty('--on-input', '#121212');
            document.querySelector(':root').style.setProperty('--input-disabled', 'rgba(0,0,0,.12)');
          } else if (backgroundPrimary == black) {
            chartBG = 'rgb(34,34,34)'
            document.querySelector(':root').style.setProperty('--chart-bg', 'rgb(34,34,34)');
            document.querySelector(':root').style.setProperty('--input', 'rgba(255,255,255,.03)');
            document.querySelector(':root').style.setProperty('--on-input', '#ffffff');
            document.querySelector(':root').style.setProperty('--input-disabled', 'rgba(0,0,0,.12)');
          } else {
            chartBG = '#ffffff'
            document.querySelector(':root').style.setProperty('--chart-bg', '#ffffff');
            document.querySelector(':root').style.setProperty('--input', 'rgba(255,255,255,.03)');
            document.querySelector(':root').style.setProperty('--on-input', '#121212');
            document.querySelector(':root').style.setProperty('--input-disabled', 'rgba(0,0,0,.12)');
          }
          document.querySelector(':root').style.setProperty('--primary' , primary);
          document.querySelector(':root').style.setProperty('--secondary' , secondary);
          document.querySelector(':root').style.setProperty('--tertiary' , tertiary);
          document.querySelector(':root').style.setProperty('--chart-bg', '#ffffff');
          document.querySelector(':root').style.setProperty('--input', 'rgba(255,255,255,.03)');
          document.querySelector(':root').style.setProperty('--on-input', '#121212');
          document.querySelector(':root').style.setProperty('--input-disabled', 'rgba(0,0,0,.12)');
          document.querySelector(':root').style.setProperty('--background', backgroundPrimary);
          document.querySelector(':root').style.setProperty('--on-background', onbackgroundPrimary);
          document.querySelector(':root').style.setProperty('--background-secondary', backgroundSecondary);
          document.querySelector(':root').style.setProperty('--on-background-secondary', onbackgroundSecondary);
          //document.querySelector(':root').style.setProperty('--text-gradient', textGradient);
          document.querySelector(':root').style.setProperty('--color-drop', colorDrop);
          document.querySelector(':root').style.setProperty('--border', borderColor);
          document.querySelector(':root').style.setProperty('--chip', chip);
          document.querySelector(':root').style.setProperty('--on-chip', onchip);
          document.querySelector(':root').style.setProperty('--icons', icons);
          document.querySelector(':root').style.setProperty('--on-icons', onIcons);
          document.querySelector(':root').style.setProperty('--button', buttons);
          document.querySelector(':root').style.setProperty('--on-button', onButtons);
          document.querySelector(':root').style.setProperty('--groupButtonBG', groupButtonBG);
          document.querySelector(':root').style.setProperty('--chart-lineColor', lineColor);
          document.querySelector(':root').style.setProperty('--surface', surface);
          document.querySelector(':root').style.setProperty('--onsurface', onsurface);
          // darmode //
          dmprimary                   = window[$(document).find('#' + activeTheme + ' .darkmode .default-primary').attr('name').replace('-','')];
          dmonPrimary                 = window['on' + $(document).find('#' + activeTheme + ' .darkmode .default-primary').attr('name').replace('-','')];
          dmsecondary                 = window[$(document).find('#' + activeTheme + ' .darkmode .default-secondary').attr('name').replace('-','')];
          dmonSecondary               = window['on' + $(document).find('#' + activeTheme + ' .darkmode .default-secondary').attr('name').replace('-','')];
          dmtertiary                  = window[$(document).find('#' + activeTheme + ' .darkmode .default-tertiary').attr('name').replace('-','')];
          dmontertiary                = window['on' + $(document).find('#' + activeTheme + ' .darkmode .default-tertiary').attr('name').replace('-','')];
          dmbackgroundPrimary         = $('#' + activeTheme  + ' .darkmode .default-background').css('backgroundColor');
          dmonbackgroundPrimary       = $('#' + activeTheme  + ' .darkmode .default-background').css('color');
          dmbackgroundPrimaryName     = $('#' + activeTheme  + ' .darkmode .default-background').attr('name')
          dmbackgroundSecondary       = $('#' + activeTheme  + ' .darkmode .default-background-secondary').css('backgroundColor');
          dmonbackgroundSecondary     = $('#' + activeTheme  + ' .darkmode .default-background-secondary').css('color');
          dmbackgroundSecondaryName   = $('#' + activeTheme  + ' .darkmode .default-background-secondary').attr('name')
          dmbackgroundSecondary       = $('#' + activeTheme  + ' .darkmode .default-background-tertiary').css('backgroundColor');
          dmonbackgroundSecondary     = $('#' + activeTheme  + ' .darkmode .default-background-tertiary').css('color');
          dmbackgroundTertiaryName    = 'primary-700'
          dmbackgroundTertiary        = window.primary700;
          dmonbackgroundTertiary      = dmwhite;
          dmtextGradientName          = buildDMTextgradient();
          dmtooltip                   = elevationShades(dmbackgroundPrimary,.06)

          buildDMIcons()
          if (dmbackgroundPrimaryName == 'primaryDarkBG') {
            dmgroupButtonBG           =  'rgba(0,0,0,.25)'
          } else {
            dmgroupButtonBG           =  black
          }
          dmsurface                 = dmbackgroundPrimary
          dmcolorDrop               = black
          dmcolorDropName           = 'black';
          dmborderColor             = 'rgba(255,255,255,.15)'
          dmchip                    = 'rgba(255,255,255,.35)'
          dmonchip                  =  black
          dmgroupButtonBG           =  'rgba(255,255,255,.1)'
          dmlineColor               = "rgba(255,255,255.05)"
          dmsurface                 =  dmbackgroundPrimary;
          dmonsurface               =  dmwhite
          document.querySelector(':root').style.setProperty('--dm-background', dmbackgroundPrimary);
          document.querySelector(':root').style.setProperty('--dm-on-background', dmonbackgroundPrimary );
          document.querySelector(':root').style.setProperty('--dm-background-secondary', dmbackgroundSecondary);
          document.querySelector(':root').style.setProperty('--dm-on-background-secondary', dmonbackgroundSecondary);
          document.querySelector(':root').style.setProperty('--dm-text-gradient', dmtextGradient);
          document.querySelector(':root').style.setProperty('--dm-icon', dmicons);
          document.querySelector(':root').style.setProperty('--dm-on-icon', dmonicons);
          document.querySelector(':root').style.setProperty('--dm-button', dmbuttons);
          document.querySelector(':root').style.setProperty('--dm-on-button', dmonbuttons);
          document.querySelector(':root').style.setProperty('--dm-chart-lineColor', dmlineColor);
          document.querySelector(':root').style.setProperty('--dm-surface', dmsurface);
          document.querySelector(':root').style.setProperty('--dm-on-surface', dmonsurface);
          document.querySelector(':root').style.setProperty('--dm-chip' ,   dmchip );
          document.querySelector(':root').style.setProperty('--dm-on-chip' , dmonchip );
          document.querySelector(':root').style.setProperty('--dm-color-drop' , dmcolorDropName );
          document.querySelector(':root').style.setProperty('--dm-border' , dmborderColor  );
          document.querySelector(':root').style.setProperty('--dm-chart-lineColor' , dmlineColor);
          document.querySelector(':root').style.setProperty('--dm-groupButtonBG' , groupButtonBG );
          additionalThemeSettings()
          /// clear the theme builder form //
          clearTheme();
        }
     }


     function additionalThemeSettings() {
      // setPrimaryNav()
      // setHero()
      // setSecondaryNav()
      // heroAlignment()
      // heroElements()
      // heroStyle()
       calculateElevations(rgb2hex(dmbackgroundPrimary))
       //build_ChartColors()
       //buildCharts('light')
       loadStates()
       loadInput()
       loadGrid()
       loadBorder();
       loadFocus()
       buildHotlinks();
       /// clear the theme builder form //
       clearTheme();
     }

 // update text styles //
 function updateTextStyles() {
   $('.styles').each(function() {
     var name = $(this).attr('name')
     var fontFamily = $(this).parents().find('.' + name).css('font-family');
     var fontSize = $(this).parents().find('.' + name).css('font-size');
     var fontWeight = $(this).parents().find('.' + name).css('font-weight');
     var lh = $(this).parents().find('.' + name).css('line-height');
     var spacing = $(this).parents().find('.' + name).css('letter-spacing');
     var textDecoration = $(this).parents().find('.' + name).css('text-decoration');
     $(this).find('.font-family span').html(fontFamily)
     $(this).find('.font-size span').html(fontSize)
     $(this).find('.font-weight span').html(fontWeight)
     $(this).find('.font-line-height span').html(lh)
     $(this).find('.font-charcter-spacing span').html(spacing)
     if ($(this).find('.font-text-decoration').length) {
       $(this).find('.font-text-decoration span').html(textDecoration)
     }
   });
 }

  ////// PHASE II -  ATOMS //////
  // step 1. add colors to the palette //
  // When the user clicks the "Add Color Button"
  $('.checkContrast').click(function() {
    // remove any existing input error in the interfqace //
    var errorColor = $('.lightmode .danger').css('backgroundColor');
    errorColor  = rgb2hex(errorColor);
    var err = false;
    $('.errorMessage').remove();
    $('input').removeClass('error')
    // convert the color name to lowercase //
    var colorClass = $('#colorName').val().toLowerCase().replace(/ /g, '')
   // if there is no color name alert the end user //
   if(!$('#colorName').val()){
      err = true;
      errorMessage = 'Please provide a name for your color'
      $('<div class="errorMessage small">'+errorMessage +'</div>').insertAfter('#colorName');
      $('#colorName').parent().find('.errorMessage').prepend('<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.875 6C10.875 8.69239 8.69239 10.875 6 10.875C3.30761 10.875 1.125 8.69239 1.125 6C1.125 3.30761 3.30761 1.125 6 1.125C8.69239 1.125 10.875 3.30761 10.875 6ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 -2.34843e-07 6 -5.24537e-07C2.68629 -8.1423e-07 8.1423e-07 2.68629 5.24537e-07 6C2.34843e-07 9.31371 2.68629 12 6 12ZM6 7.5C5.58579 7.5 5.25 7.83579 5.25 8.25C5.25 8.66421 5.58579 9 6 9C6.41421 9 6.75 8.66421 6.75 8.25C6.75 7.83579 6.41421 7.5 6 7.5ZM6 6.5C5.58579 6.5 5.25 6.16421 5.25 5.75L5.25 3.75C5.25 3.33579 5.58579 3 6 3C6.41421 3 6.75 3.33579 6.75 3.75L6.75 5.75C6.75 6.16421 6.41421 6.5 6 6.5Z" fill="'+errorColor+'"/></svg>')
   }
   // name sure the name has not been used before //
   $('#buildColor .light-mode .colorRow').each(function() {
     var name = $(this).attr('id').replace('-light','');
     if (name = colorClass) {
       err = true;
       $('#colorName').addClass('error');
       errorMessage = 'Please provide a unique name for your color'
       $('<div class="errorMessage small">'+errorMessage +'</div>').insertAfter('#colorName');
       $('#colorName').parent().find('.errorMessage').prepend('<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.875 6C10.875 8.69239 8.69239 10.875 6 10.875C3.30761 10.875 1.125 8.69239 1.125 6C1.125 3.30761 3.30761 1.125 6 1.125C8.69239 1.125 10.875 3.30761 10.875 6ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 -2.34843e-07 6 -5.24537e-07C2.68629 -8.1423e-07 8.1423e-07 2.68629 5.24537e-07 6C2.34843e-07 9.31371 2.68629 12 6 12ZM6 7.5C5.58579 7.5 5.25 7.83579 5.25 8.25C5.25 8.66421 5.58579 9 6 9C6.41421 9 6.75 8.66421 6.75 8.25C6.75 7.83579 6.41421 7.5 6 7.5ZM6 6.5C5.58579 6.5 5.25 6.16421 5.25 5.75L5.25 3.75C5.25 3.33579 5.58579 3 6 3C6.41421 3 6.75 3.33579 6.75 3.75L6.75 5.75C6.75 6.16421 6.41421 6.5 6 6.5Z" fill="'+errorColor+'"/></svg>')
     }
   });
   // get the color input //
   var color = $('#colorInput').val();
   // if the color is not a hex value create an error //
   if (!/^#[0-9A-F]{6}$/i.test(color) == true) {
     err = true;
     $('#colorInput').addClass('error');
     errorMessage = 'Please provide an hexidecimal value'
     $('<div class="errorMessage small">'+errorMessage +'</div>').insertAfter('#colorInput');
     $('#colorInput').parent().find('.errorMessage').prepend('<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.875 6C10.875 8.69239 8.69239 10.875 6 10.875C3.30761 10.875 1.125 8.69239 1.125 6C1.125 3.30761 3.30761 1.125 6 1.125C8.69239 1.125 10.875 3.30761 10.875 6ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 -2.34843e-07 6 -5.24537e-07C2.68629 -8.1423e-07 8.1423e-07 2.68629 5.24537e-07 6C2.34843e-07 9.31371 2.68629 12 6 12ZM6 7.5C5.58579 7.5 5.25 7.83579 5.25 8.25C5.25 8.66421 5.58579 9 6 9C6.41421 9 6.75 8.66421 6.75 8.25C6.75 7.83579 6.41421 7.5 6 7.5ZM6 6.5C5.58579 6.5 5.25 6.16421 5.25 5.75L5.25 3.75C5.25 3.33579 5.58579 3 6 3C6.41421 3 6.75 3.33579 6.75 3.75L6.75 5.75C6.75 6.16421 6.41421 6.5 6 6.5Z" fill="'+errorColor+'"/></svg>')
   }
   // if there are no errors then add the color //
   if (err == false) {
     $('.errorMessage').remove();
     $('input').removeClass('error')
     addtoTheme(colorClass, color)
   }

  });

  // Click button to generate colors //
  function addtoTheme(colorClass, color) {
   buildSwatches(colorClass);
   $('.results').addClass('active')
   // convert the color to an array the r, g, b values //
   var rgbArray = hextoRGBArray(color);
   // get the perceived lightness //
   var lightness = chroma.rgb(rgbArray).lch()[0]

   // add the name of the color and div with the hex value to the system //
   $(document).find('#' + system + ' .default-palette').append('<div class="color"><div class="name">'+ colorClass +'</div><div class="Hex">'+ color +'</div></div>')
   // based on the perceived lightness
   // * tag the enteres color shade a 'prime' //
   // * build the required number of darker shades (plus 1) and the number of lighter shades that need to be built //
   var shade;
   if (lightness > 95 && lightness <= 100) {
     shade = 0
   } else if (lightness > 85 && lightness <= 95) {
     shade = 100
   } else if (lightness > 75 && lightness <= 85) {
     shade = 200
   } else if (lightness > 65 && lightness <= 75) {
     shade = 300
   } else if (lightness > 55 && lightness <= 65) {
     shade = 400
   } else if (lightness > 45 && lightness <= 55) {
    shade = 500
  } else if (lightness > 35 && lightness <= 45) {
    shade = 600
  } else if (lightness > 25 && lightness <= 35) {
    shade = 700
  } else if (lightness > 15 && lightness <= 25) {
    shade = 800
  } else if (lightness > 0 && lightness <= 15) {
    shade = 900
   }
   $(document).find('#' + colorClass + '-light-' + shade).addClass('prime');
   $(document).find('#' + colorClass + '-dark-' + shade).addClass('prime');
   buildShades('light', colorClass, color, shade)
   buildShades('dark', colorClass, color, shade)
//   adjustments(colorClass, 'light');
//   adjustments(colorClass, 'dark');
   // clear the input values //
   // build the half and quarter colors - these will become the possible light primary and secondary background colors - the user does not see these colors in the palette and ultimately only the primary half and quarter colors will be used //
   // find the lightest shade of the color //
   var lightColor = $(document).find('#' + colorClass +'-light-0 .Hex').css('backgroundColor');
   // convert it to hex //
   lightColor  = rgb2hex(lightColor);
   // for the half color - mix the lightest color with white with an opacity of .5 //
   //var halfColor = $.xcolor.opacity(lightColor, '#ffffff', .5)
   // for the quarter color - mix the lightest color with white with an opacity of .5 //
   //var quarterColor = $.xcolor.opacity(lightColor, '#ffffff', .75)=
   // update the swatches with the colors //
   //$(document).find('#' + colorClass +'-light-Half .Hex').css('background', halfColor);
   //$(document).find('#' + colorClass +'-light-Quarter .Hex').css('background', quarterColor);
   //var primaryDarkBG = chroma.lch().rgb()
   //  var secondaryDarkBG =   ''
   $('#colorName').val('')
   $('#colorInput').val('#ffffff');
   $('#colorInput').css('background','#ffffff');
   $('#colorInput').css('color','#121212');
  }

  // Build the scoffolding for the 10 shades of color in light and dark mode //
  function buildSwatches(colorClass) {
    $( "#light-mode" ).append( "<div class='title-area'><div class='subtitle1' name='"+ colorClass+"'>"+ colorClass +"</div><div class='dropdown editColors'><button class='btn btn-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'><i class='fa-solid fa-ellipsis-vertical'></i></button><ul class='dropdown-menu'><li><a class='dropdown-item edit-color' href='#'>Edit</a></li><li><a class='dropdown-item delete-color' href='#'>Delete</a></li><li><a class='dropdown-item light-code-color' href='#'>Get Llight Code</a></li><li><a class='dropdown-item dark-code-color' href='#'>Get Dark Code</a></li><li><a class='dropdown-item dark-border-color' href='#'>Get Dark Border/Quiet</a></li><li><a class='dropdown-item light-border-color' href='#'>Get Light Border/Quiet</a></li></ul></div></div><div class='colorRow' id='"+ colorClass +"-light'></div>" );
    $( "#dark-mode" ).append( "<div class='subtitle1'  name='"+ colorClass+"'>"+ colorClass + "</div><div class='colorRow' id='"+ colorClass +"-dark'></div>" );
    i = 0;
    while (i < 1000) {
    if (i == 900) {
        $('body').find('#' + colorClass + '-light').append('<div class="color-block" id="'+ colorClass+'-light-'+ i+'"><div class="subtitle1 text-center">'+i+'</div><div class="Hex "' + i + '>Aa</div><div class="swatch-details Color">Color: <span></span></div><div class="adjust"><a href="#">Adjust Hue</a></div><div class="swatch-details OnColor">On Color: <span></span></div><div class="swatch-details Contrast">Contrast:<span></span></div>');
        $('body').find('#' + colorClass + '-dark').append('<div class="color-block" id="'+ colorClass+'-dark-'+ i+'"><div class="subtitle1 text-center">'+i+'</div><div class="Hex">Aa</div><div class="swatch-details Color">Color: <span></span></div><div class="swatch-details OnColor">On Color: <span></span></div><div class="swatch-details Contrast">Contrast:<span></span></div><div class="swatch-details Saturation">Saturation:<span></span></div>') ;
    } else if (i == 0) {
        $('body').find('#' + colorClass + '-light').append('<div class="color-block" id="'+ colorClass+'-light-'+ i+'"><div class="subtitle1 text-center">'+i+'</div><div class="Hex "' + i + '>Aa</div><div class="swatch-details Color">Color: <span></span></div><div class="adjust"><a href="#">Adjust Hue</a></div><div class="swatch-details OnColor">On Color: <span></span></div><div class="swatch-details Contrast">Contrast:<span></span></div>');
        $('body').find('#' + colorClass + '-dark').append('<div class="color-block" id="'+ colorClass+'-dark-'+ i+'"><div class="subtitle1 text-center">'+i+'</div><div class="Hex">Aa</div><div class="swatch-details Color">Color: <span></span></div><div class="swatch-details OnColor">On Color: <span></span></div><div class="swatch-details Contrast">Contrast:<span></span></div><div class="swatch-details Saturation">Saturation:<span></span></div>') ;
    } else {
        $('body').find('#' + colorClass + '-light').append('<div class="color-block" id="'+ colorClass+'-light-'+ i+'"><div class="subtitle1 text-center">'+i+'</div><div class="Hex">Aa</div><div class="swatch-details Color">Color: <span></span></div><div class="swatch-details OnColor">On Color: <span></span></div><div class="swatch-details Contrast">Contrast:<span></span></div>');
        $('body').find('#' + colorClass + '-dark').append('<div class="color-block" id="'+ colorClass+'-dark-'+ i+'"><div class="subtitle1 text-center">'+i+'</div><div class="Hex">Aa</div><div class="swatch-details Color">Color: <span></span></div><div class="swatch-details OnColor">On Color: <span></span></div><div class="swatch-details Contrast">Contrast<span></span></div><div class="swatch-details Saturation">Saturation:<span></span></div>') ;
      }
      i = i + 100;
    }
  }

  function checkTheme(colorName) {
    var primaryName = $('.default-primary').attr('name').split('-')[0]
    var primaryShade = $('.default-primary').attr('name').split('-')[1]

    if (primaryName == colorName) {
        //update primary background color //
      $('.default-primary').css('background', )
        //update primary text color //
    }


  }

  // create color .01 darker //
  function adjustLighterCount(theme, color, text_color, contrastRation, mode) {
    var i = 0
    if (color.indexOf("rgb") >= 0) {
      color = rgb2hex(color)
    }
    while (contrastRation < wcagContrast) {
      hex = (chroma(color).brighten(i)).toString()
      rgbArray = hextoRGBArray(hex)
      if (mode == 'dark' && text_color == [255,255,255]) {
        var hex = rgb2hex(rgb)
        var colorHex = rgb2hex(color)
        var newHex = mixColors(colorHex,'#FFFFFF',mixer );
        var lightArray = hex2rgb(newHex)
        var lightArray = lightArray.replace('rgb(','')
        var lightArray = lightArray.replace(')','');
        text_color = lightArray.split(',');
      }
      var contrastRation = contrast(rgbArray, text_color);
      var contrastRation = contrastRation.toFixed(2)
      if (contrastRation >= wcagContrast){
       return(i)
      }
      i = i + .01
      color = hex
    }
  }


     // create color .01 brighter //
     function adjustColorLighter(theme, color, text_color, contrastRation, mode) {
       i = 0
       if (color.indexOf("rgb") >= 0) {
         color = rgb2hex(color)
       }
       while (contrastRation < wcagContrast) {
         hex = (chroma(color).brighten(i)).toString()
         rgbArray = hextoRGBArray(hex)
         if (mode == 'dark' && text_color == '255,255,255') {
           var colorHex = rgb2hex(color)
           var newHex = mixColors(colorHex,'#FFFFFF',mixer );
           var lightArray = hextoRGBArray(newHex)
           var contrastRation = contrast(lightArray, text_color);
           var contrastRation = contrastRation.toFixed(2)
         } else {
           var contrastRation = contrast(rgbArray, text_color); // 1.0736196319018405
           contrastRation  = contrastRation.toFixed(2)
         }
         if (contrastRation >= wcagContrast){
          $('#' + theme ).addClass('darkened')
           buildColor(theme, mode,rgbArray,text_color,contrastRation);
           break;
         }
         i = i + .01
         color = hex
       }
     }


     // create color .01 darker //
     function adjustDarkerCount(theme, color, text_color, contrastRation, mode) {
       var i = 0
       if (color.indexOf("rgb") >= 0) {
         color = rgb2hex(color)
       }
       while (contrastRation < wcagContrast) {
         hex = (chroma(color).darken(i)).toString()
         rgbArray = hextoRGBArray(hex)
         if (mode == 'dark' && text_color == [255,255,255]) {
           var hex = rgb2hex(rgb)
           var colorHex = rgb2hex(color)
           var newHex = mixColors(colorHex,'#FFFFFF',mixer );
           var lightArray = hex2rgb(newHex)
           var lightArray = lightArray.replace('rgb(','')
           var lightArray = lightArray.replace(')','');
           text_color = lightArray.split(',');
         }
         var contrastRation = contrast(rgbArray, text_color);
         var contrastRation = contrastRation.toFixed(2)
         if (contrastRation >= wcagContrast){
          return(i)
         }
         i = i + .01
         color = hex
       }
     }


     // create color .01 darker //
     function adjustColorDarker(theme, color, text_color, contrastRation, mode) {
       var i = 0
       if (color.indexOf("rgb") >= 0) {
         color = rgb2hex(color)
       }
       if (mode == 'dark') {
         // adjust for elevations //
         var checkcolor = (mixColors(color,'#ffffff',.16 )).toString();
       } else {
         var checkcolor = color
       }

       while (contrastRation < wcagContrast) {
         hex = (chroma(checkcolor).darken(i)).toString()
         rgbArray = hextoRGBArray(hex)
         if (mode == 'dark' && text_color == [255,255,255]) {
           var hex = rgb2hex(rgb)
           var colorHex = rgb2hex(color)
           var newHex = mixColors(colorHex,'#FFFFFF',mixer );
           var newText = hextoRGBArray(newHex)
         } else {
           var newText = text_color
         }
         var contrastRation = contrast(rgbArray, newText);
         var contrastRation = contrastRation.toFixed(2)
         if (contrastRation >= wcagContrast){
          $('#' + theme ).addClass('darkened')
           buildColor(theme, mode,rgbArray,[255,255,255],contrastRation);
           break;
         }
         i = i + .01
         color = hex
       }
     }

     // create color .01 darker //
     function adjustColorDarker(theme, color, text_color, contrastRation, mode) {
       i = 0
       if (color.indexOf("rgb") >= 0) {
         color = rgb2hex(color)
       }
       while (contrastRation < wcagContrast) {
         hex = (chroma(color).darken(i)).toString()
         rgbArray = hextoRGBArray(hex)
         if (mode == 'dark' && text_color == '255,255,255') {
           var colorHex = rgb2hex(color)
           var newHex = mixColors(colorHex,'#FFFFFF',mixer );
           var lightArray = hextoRGBArray(newHex)
           var contrastRation = contrast(lightArray, text_color);
           var contrastRation = contrastRation.toFixed(2)
         } else {
           var contrastRation = contrast(rgbArray, text_color); // 1.0736196319018405
           contrastRation  = contrastRation.toFixed(2)
         }
         if (contrastRation >= wcagContrast){
          $('#' + theme ).addClass('darkened')
           buildColor(theme, mode,rgbArray,[255,255,255],contrastRation);
           break;
         }
         i = i + .01
         color = hex
       }
     }


     $(document).on('click', '.edit-color', function() {
       var colorName = $(this).parents('.title-area').find('.subtitle1').attr('name');
       alert(colorName)
     });

     $(document).on('click', '.delete-color', function() {
       var colorName = $(this).parents('.title-area').find('.subtitle1').attr('name');
       alert(colorName)
       var primaryName  = $('.default-primary').attr('name').split('-')[0];
       var seconaryName = $('.default-seconary').attr('name').split('-')[0];
       var tertiaryName = $('.default-tertiary').attr('name').split('-')[0];
       if (colorName != primaryName && colorName != secondaryName && colorName != tertiaryName) {
         $(this).parents('.title-area').remove()
       }
     });

     $(document).on('click', '.light-code-color', function() {
       var colorName = $(this).parents('.title-area').find('.subtitle1').attr('name');

       var color0 = rgb2hex($('#' + colorName + '-light-0 .Hex').css('backgroundColor'));
       var color1 = rgb2hex($('#' + colorName + '-light-100 .Hex').css('backgroundColor'));
       var color2 = rgb2hex($('#' + colorName + '-light-200 .Hex').css('backgroundColor'));
       var color3 = rgb2hex($('#' + colorName + '-light-300 .Hex').css('backgroundColor'));
       var color4 = rgb2hex($('#' + colorName + '-light-400 .Hex').css('backgroundColor'));
       var color5 = rgb2hex($('#' + colorName + '-light-500 .Hex').css('backgroundColor'));
       var color6 = rgb2hex($('#' + colorName + '-light-600 .Hex').css('backgroundColor'));
       var color7 = rgb2hex($('#' + colorName + '-light-700 .Hex').css('backgroundColor'));
       var color8 = rgb2hex($('#' + colorName + '-light-800 .Hex').css('backgroundColor'));
       var color9 = rgb2hex($('#' + colorName + '-light-900 .Hex').css('backgroundColor'));
       var oncolor0 = rgb2hex($('#' + colorName + '-light-0 .Hex').css('color'));
       oncolor0 = oncolor0.replace(/ /g, '')
       if (oncolor0 == 'rgb(255,255,255)') {
        oncolor0 = '{text.white}'
       } else {
        oncolor0 = '{text.dark}'
       }
       var oncolor1 = $('#' + colorName + '-light-100 .Hex').css('color');
        oncolor1 = oncolor1.replace(/ /g, '')
       if (oncolor1 == 'rgb(255,255,255)') {
         oncolor1= '{text.white}'
       } else {
         oncolor1= '{text.dark}'
       }
       var oncolor2 = $('#' + colorName + '-light-200 .Hex').css('color');
       alert('color2 - ' + oncolor2)
        oncolor2 = oncolor1.replace(/ /g, '')
       if (oncolor2 == 'rgb(255,255,255)') {
         oncolor2= '{text.white}'
       } else {
         oncolor2= '{text.dark}'
       }
       var oncolor3 = $('#' + colorName + '-light-300 .Hex').css('color');
        oncolor3 = oncolor3.replace(/ /g, '')
       if (oncolor3 == 'rgb(255,255,255)') {
         oncolor3= '{text.white}'
       } else {
         oncolor3= '{text.dark}'
       }
       var oncolor4 = $('#' + colorName + '-light-400 .Hex').css('color');
        oncolor4 = oncolor4.replace(/ /g, '')
       if (oncolor4 == 'rgb(255,255,255)') {
         oncolor4= '{text.white}'
       } else {
         oncolor4= '{text.dark}'
       }
       var oncolor5 = $('#' + colorName + '-light-500 .Hex').css('color');
        oncolor5 = oncolor5.replace(/ /g, '')
       if (oncolor5 == 'rgb(255,255,255)') {
         oncolor5= '{text.white}'
       } else {
         oncolor5= '{text.dark}'
       }
       var oncolor6 = $('#' + colorName + '-light-600 .Hex').css('color');
        oncolor6 = oncolor6.replace(/ /g, '')
       if (oncolor6 == 'rgb(255,255,255)') {
         oncolor6= '{text.white}'
       } else {
         oncolor6= '{text.dark}'
       }
       var oncolor7 = $('#' + colorName + '-light-700 .Hex').css('color');
        oncolor7 = oncolor7.replace(/ /g, '')
       if (oncolor7 == 'rgb(255,255,255)') {
         oncolor7= '{text.white}'
       } else {
         oncolor7= '{text.dark}'
       }
       var oncolor8 = $('#' + colorName + '-light-800 .Hex').css('color');
        oncolor8 = oncolor8.replace(/ /g, '')
       if (oncolor8 == 'rgb(255,255,255)') {
         oncolor8= '{text.white}'
       } else {
         oncolor8= '{text.dark}'
       }
       var oncolor9 = $('#' + colorName + '-light-900 .Hex').css('color');
        oncolor9 = oncolor9.replace(/ /g, '')
       if (oncolor9 == 'rgb(255,255,255)') {
         oncolor9= '{text.white}'
       } else {
         oncolor9= '{text.dark}'
       }
       var lightCode = '"' + colorName+'": {"color": {"100": {"type": "color","value": "'+ color1 +'"},"200": {"type": "color","value": "'+ color2 +'"},"300": {"type": "color","value": "'+ color3 +'"},"400": {"type": "color","value": "'+ color4 +'"},"500": {"type": "color","value": "'+ color5 +'"},"600": {"type": "color","value": "'+ color6 +'"},"700": {"type": "color","value": "'+ color7 +'"},"800": {"type": "color","value": "'+ color8 +'"},"900": {"type": "color","value": "'+ color9 +'"},"050": {"type": "color","value": "'+ color0 +'"}},"on-color": {"100": {"type": "color","value": "'+oncolor1+'"},"200": {"type": "color","value": "'+oncolor2+'"},"300": {"type": "color","value": "'+oncolor3+'"},"400": {"type": "color","value": "'+oncolor4+'"},"500": {"type": "color","value": "'+oncolor5+'"},"600": {"type": "color","value": "'+oncolor6+'"},"700": {"type": "color","value": "'+oncolor7+'"},"800": {"type": "color","value": "'+oncolor8+'"},"900": {"type": "color","value": "'+oncolor9+'"},"050": {"type": "color","value": "'+oncolor0+'"}}}'
       $('#code-light').html(lightCode);
       alert(lightCode);
     });

     $(document).on('click', '.dark-code-color', function() {
       var colorName = $(this).parents('.title-area').find('.subtitle1').attr('name');
       var darkcolor0 = rgb2hex($('#' + colorName + '-dark-0 .Hex').css('backgroundColor'));
       var darkcolor1 = rgb2hex($('#' + colorName + '-dark-100 .Hex').css('backgroundColor'));
       var darkcolor2 = rgb2hex($('#' + colorName + '-dark-200 .Hex').css('backgroundColor'));
       var darkcolor3 = rgb2hex($('#' + colorName + '-dark-300 .Hex').css('backgroundColor'));
       var darkcolor4 = rgb2hex($('#' + colorName + '-dark-400 .Hex').css('backgroundColor'));
       var darkcolor5 = rgb2hex($('#' + colorName + '-dark-500 .Hex').css('backgroundColor'));
       var darkcolor6 = rgb2hex($('#' + colorName + '-dark-600 .Hex').css('backgroundColor'));
       var darkcolor7 = rgb2hex($('#' + colorName + '-dark-700 .Hex').css('backgroundColor'));
       var darkcolor8 = rgb2hex($('#' + colorName + '-dark-800 .Hex').css('backgroundColor'));
       var darkcolor9 = rgb2hex($('#' + colorName + '-dark-900 .Hex').css('backgroundColor'));
       var darkoncolor0 = $('#' + colorName + '-dark-0 .Hex').css('color');
       if (darkoncolor0.includes('rgba')) {
         darkoncolor0 = mixColors('#FFFFFF',darkcolor0,dmOpacity );
       } else {
         darkoncolor0 = '{text.dark}'
       };
       var darkoncolor1 = $('#' + colorName + '-dark-100 .Hex').css('color');
       if (darkoncolor1.includes('rgba')) {
         darkoncolor1 = mixColors('#FFFFFF',darkcolor1,dmOpacity );
       } else {
         darkoncolor1= '{text.dark}'
       };
       var darkoncolor2 = $('#' + colorName + '-dark-200 .Hex').css('color');
       if (darkoncolor2.includes('rgba')) {
         darkoncolor2 = mixColors('#FFFFFF',darkcolor2,dmOpacity );
       } else {
         darkoncolor2= '{text.dark}'
       };
       var darkoncolor3 = $('#' + colorName + '-dark-300 .Hex').css('color');
       if (darkoncolor3.includes('rgba')) {
         darkoncolor3 = mixColors('#FFFFFF', darkcolor3,dmOpacity );
       } else {
         darkoncolor3 = '{text.dark}'
       };
       var darkoncolor4 = $('#' + colorName + '-dark-400 .Hex').css('color');
       if (darkoncolor4.includes('rgba')) {
         darkoncolor4 = mixColors('#FFFFFF', darkcolor4,dmOpacity);
       } else {
         darkoncolor4= '{text.dark}'
       };
       var darkoncolor5 = $('#' + colorName + '-dark-500 .Hex').css('color');
       if (darkoncolor5.includes('rgba')) {
         darkoncolor5= mixColors('#FFFFFF',darkcolor5,dmOpacity );
       } else {
         darkoncolor5= '{text.dark}'
       };
       var darkoncolor6 = $('#' + colorName + '-dark-600 .Hex').css('color');
       if (darkoncolor6.includes('rgba')) {
         darkoncolor6= mixColors('#FFFFFF',darkcolor6,dmOpacity );
       } else {
         darkoncolor6= '{text.dark}'
       };
       var darkoncolor7 = $('#' + colorName + '-dark-700 .Hex').css('color');
       if (darkoncolor7.includes('rgba')) {
         darkoncolor7= mixColors('#FFFFFF',darkcolor7,dmOpacity );
       } else {
         darkoncolor7= '{text.dark}'
       };
       var darkoncolor8 = $('#' + colorName + '-dark-800 .Hex').css('color');
       if (darkoncolor8.includes('rgba')) {
         darkoncolor8= mixColors('#FFFFFF',darkcolor8,dmOpacity );
       } else {
         darkoncolor8= '{text.dark}'
       };
       var darkoncolor9 = $('#' + colorName + '-dark-900 .Hex').css('color');
       if (darkoncolor9.includes('rgba')) {
         darkoncolor9= mixColors('#FFFFFF',darkcolor9,dmOpacity );
       } else {
         darkoncolor9= '{text.dark}'
       };
       var darkCode = '"' + colorName+ '": {"color": {"100": {"type": "color","value": "'+ darkcolor1 +'"},"200": {"type": "color","value": "'+ darkcolor2 +'"},"300": {"type": "color","value": "'+ darkcolor3 +'"},"400": {"type": "color","value": "'+ darkcolor4 +'"},"500": {"type": "color","value": "'+ darkcolor5 +'"},"600": {"type": "color","value": "'+ darkcolor6 +'"},"700": {"type": "color","value": "'+ darkcolor7 +'"},"800": {"type": "color","value": "'+ darkcolor8 +'"},"900": {"type": "color","value": "'+ darkcolor9 +'"},"050": {"type": "color","value": "'+ darkcolor0 +'"}},"on-color": {"100": {"type": "color","value": "'+darkoncolor1+'"},"200": {"type": "color","value": "'+darkoncolor2+'"},"300": {"type": "color","value": "'+darkoncolor3+'"},"400": {"type": "color","value": "'+darkoncolor4+'"},"500": {"type": "color","value": "'+darkoncolor5+'"},"600": {"type": "color","value": "'+darkoncolor6+'"},"700": {"type": "color","value": "'+darkoncolor7+'"},"800": {"type": "color","value": "'+darkoncolor8+'"},"900": {"type": "color","value": "'+darkoncolor9+'"},"050": {"type": "color","value": "'+darkoncolor0+'"}}}'
 alert(darkCode)
     });


     function getWCAGColor(hex,text_color,contrastRequirement) {
       var percentOpacity = .0;
       var contrastAmount = 0
       while (contrastAmount < contrastRequirement) {
         percentOpacity = percentOpacity + .01
         var newHex = (mixColors(text_color, hex,percentOpacity)).toString();
         var newHexArray = hextoRGBArray(newHex);
         var hexArray    = hextoRGBArray(hex)
         var contrastAmount = contrast(newHexArray, hexArray);
       }
       return(newHex)
     }

     function getWCAGText(hex,text_color,contrastRequirement,mode) {
       var percentOpacity = .7;
       var contrastAmount = 0
       var count = 0
       if (mode == 'dark') {
         // adjust for dark mode ///
         percentOpacity = .5
       }
       while (contrastAmount < contrastRequirement) {
         var newHex = (mixColors(text_color, hex,percentOpacity)).toString();
         var newHexArray = hextoRGBArray(newHex);
         var hexArray    = hextoRGBArray(hex)
         var contrastAmount = contrast(newHexArray, hexArray);
         percentOpacity = percentOpacity + .01
         count = count + 1
         if (count > 20) {
           break;
         }
       }
       return(newHex)
     }


     function getHotlink(hex,hotlink,contrastRequirement) {
       var hotlinkMix = 0;
       var contrastAmount = 0
       while (contrastAmount < contrastRequirement) {
         if (hotlinkMix > .75) {
           return('onColor')
         }
         var newHotlink = (chroma(hotlink).brighten(hotlinkMix)).toString()
         var hotlinkArray = hextoRGBArray(newHotlink);
         var hexArray    = hextoRGBArray(hex)
         var contrastAmount = contrast(hexArray, hotlinkArray);
         hotlinkMix = hotlinkMix + .25
       }
       return(newHotlink)
     }

     $(document).on('click', '.dark-border-color', function() {
       var defaultColor  = buildQuietBorder('default-0', 'dark');
       var neutral10  = buildQuietBorder('neutral-0', 'dark');
       var neutral20  = buildQuietBorder('neutral-100', 'dark');
       var neutral30  = buildQuietBorder('neutral-200', 'dark');
       var neutral40  = buildQuietBorder('neutral-300', 'dark');
       var neutral50  = buildQuietBorder('neutral-400', 'dark');
       var neutral60  = buildQuietBorder('neutral-500', 'dark');
       var neutral70  = buildQuietBorder('neutral-600', 'dark');
       var neutral80  = buildQuietBorder('neutral-700', 'dark');
       var neutral90  = buildQuietBorder('neutral-800', 'dark');
       var neutral100 = buildQuietBorder('neutral-900', 'dark');

       $('#code-dark').html('"Mode-Colors": {' + defaultColor + neutral10 + neutral20 + neutral30 + neutral40 + neutral50 + neutral60 + neutral70 + neutral80 + neutral90 + neutral100 + '}')
      });

     $(document).on('click', '.light-border-color', function() {
       var defaultColor  = buildQuietBorder('default-0', 'light');
       var neutral10     = buildQuietBorder('neutral-0', 'light');
       var neutral20  = buildQuietBorder('neutral-100', 'light');
       var neutral30  = buildQuietBorder('neutral-200', 'light');
       var neutral40  = buildQuietBorder('neutral-300', 'light');
       var neutral50  = buildQuietBorder('neutral-400', 'light');
       var neutral60  = buildQuietBorder('neutral-500', 'light');
       var neutral70  = buildQuietBorder('neutral-600', 'light');
       var neutral80  = buildQuietBorder('neutral-700', 'light');
       var neutral90  = buildQuietBorder('neutral-800', 'light');
       var neutral100 = buildQuietBorder('neutral-900', 'light');
       var magenta10  = buildQuietBorder('magenta-0', 'light');
       var magenta30  = buildQuietBorder('magenta-100', 'light');
       var magenta40  = buildQuietBorder('magenta-200', 'light');
       var magenta50  = buildQuietBorder('magenta-500', 'light');
       var yellow10  = buildQuietBorder('magenta-0', 'light');
       var yellow30  = buildQuietBorder('magenta-100', 'light');
       var yellow40  = buildQuietBorder('magenta-200', 'light');
       var yellow50  = buildQuietBorder('magenta-500', 'light');
       var green10   = buildQuietBorder('green-0', 'light');
       var green30   = buildQuietBorder('green-100', 'light');
       var green40   = buildQuietBorder('green-200', 'light');
       var green50   = buildQuietBorder('green-300', 'light');
       var aqua10    = buildQuietBorder('aqua-0', 'light');
       var aqua30    = buildQuietBorder('aqua-100', 'light');
       var aqua40    = buildQuietBorder('aqua-200', 'light');
       var aqua50    = buildQuietBorder('aqua-300', 'light');
       var blue10    = buildQuietBorder('blue-0', 'light');
       var blue30    = buildQuietBorder('blue-100', 'light');
       var blue40    = buildQuietBorder('blue-200', 'light');
       var blue50    = buildQuietBorder('blue-300', 'light');
       var violet10  = buildQuietBorder('violet-0', 'light');
       var violet30  = buildQuietBorder('violet-100', 'light');
       var violet40  = buildQuietBorder('violet-200', 'light');
       var violet50  = buildQuietBorder('violet-300', 'light');
       $('#code-light').html('"Mode-Colors": {' + defaultColor + neutral10 + neutral20 + neutral30 + neutral40 + neutral50 + neutral60 + neutral70 + neutral80 + neutral90 + neutral100 + magenta10 + magenta30 + magenta40 + magenta50 + yellow10 + yellow10 + yellow30 + yellow40 + yellow50 + green10 + green30 + green40 + green50 + aqua10 + aqua30 + aqua40 + aqua50 + blue10 + blue30 + blue40 + blue50 + violet10 + violet30 + violet40 + violet50  + '}')
     });
     function capitalize(word) {
         return $.camelCase("-" + word);
    }

     function buildQuietBorder(colorN, mode) {
       var colorName = colorN.split('-')[0];
       var colorShade = colorN.split('-')[1]
       if (colorName =="default") {
         if (mode == "dark") {
           colorName = "neutral"
           colorShade = '800'
         } else {
          colorName = "neutral"
          colorShade = '0'
         }
       }
       var colorTitle = colorName + '-' + colorShade;
       var color   = rgb2hex($('#' + colorName + '-' + mode + '-' + colorShade +  ' .Hex').css('backgroundColor'));
       var onColor = $('#' + colorName + '-' + mode + '-' + colorShade +  ' .Hex').css('color')
       onColor = onColor.replace(/ /g, '')
       if (onColor == 'rgba(255,255,255,0.7)') {
         onColor = '#ffffff'
       } else {
         rgb2hex(onColor)
       }
       var contrastRation = wcagContrast
       var hotlink     = '#3057B9';
       var elevationBG
       if (mode == 'dark') {
         if (contrastRation == '4.1') {
           var buttonHex   = '#dd733e'
           var buttonName  = 'Orange'
           var buttonShade = '400'
         } else {
           var buttonHex   = '#ea6a28'
           var buttonName  = 'Orange'
           var buttonShade = '600'
         }
         // text color //
         // accomidate for up to white with an opacity of .16 for elevations-9 //
         elevationBG = (mixColors('#ffffff', color, .86)).toString()
         // If the onColor does not provide enough contrast for all elevations - update it //
         if (onColor.indexOf("rgba") >= 0) {
           onColor = '#ffffff'
         }
         if (onColor.indexOf("rgb") >= 0) {
           onColor = rgb2hex(onColor)
         }
         var newOn = getWCAGText(elevationBG,onColor,contrastRation,mode)
         newOn = rgb2hex(newOn)
       } else {
         var newOn = onColor
         elevationBG = color;
         if (contrastRation == '4.1') {
           var buttonHex   = '#ea6a28'
           var buttonName  = 'Orange'
           var buttonShade = '400'
         } else {
           var buttonHex   = '#621200'
           var buttonName  = 'Orange'
           var buttonShade = '400'
         }
       }
       // on on Color //
       if (onColor == '#ffffff') {
         var ononColor = '{text.dark}'
       } else {
         var ononColor = '{text.white}'
       }
       // icons //
       // on on Color //
       if (onColor == '#ffffff') {
         var secondaryIcon = '{All-Colors.Yellow.Color.200}'
       } else {
         var secondaryIcon = buttonHex
       }
       // buttons //
       var elevationArray = hextoRGBArray(elevationBG);
       var buttonArray    = hextoRGBArray(buttonHex);
       var buttonContrast = contrast(elevationArray, buttonArray);
       if (buttonContrast < 3.1) {
         if (onColor == '#ffffff') {
           var button ="White"
         } else {
           var button = "Dark"
         }
       } else {
         var button ="Colored"
       }

       // hotlink //
       var hotlinkInfo = getHotlink(elevationBG,hotlink,contrastRation)
       if (hotlinkInfo == 'onColor') {
         hotlinkInfo = '{All-Colors.'+capitalize(colorName)+'.On-Color.'+colorShade+'}'
       }
       if (onColor.indexOf("rgba") >= 0) {
         onColor = '#ffffff'
       }
       if (onColor.indexOf("rgb") >= 0) {
         onColor = rgb2hex(onColor)
       }

       var border   = getWCAGColor(color,onColor,3.1,);
       var quiet    = getWCAGColor(color,onColor,contrastRation)
      if (colorShade = '0') {
        colorShade = '050'
      }
       return '"'+capitalize(colorTitle)+'": {"Background-Color": {"value": "{All-Colors.'+capitalize(colorName)+'.Color.'+colorShade+'}","type": "color"},"Alt-Background-Color": {"value": "{All-Colors.'+capitalize(colorName)+'.Color.'+colorShade+'}","type": "color","$extensions": {"studio.tokens": {"modify": {"type": "darken","value": ".1","space": "lch"}}}},"Background-On-Color": {"value": "'+newOn+'","type": "color"},"Background-On-Quiet": {"value": "'+quiet+'","type": "color"},"Background-On-On-Color": {"value": "'+ononColor+'","type": "color"},"Background-Button": {"value": "{Buttons.'+button+'.Color}","type": "color"},"Background-Button-Half": {"value": "{Buttons.'+button+'.Half}","type": "color"},"Background-On-Button": {"value": "{Buttons.'+button+'.On-Color}","type": "color"},"Background-Hotlink": {"value": "'+hotlinkInfo+'","type": "color"},"Background-Border": {"value": "'+border+'","type": "color"},"Secondary Icon Color": {"value": "'+secondaryIcon+'","type": "color"},"On Default Icon Color": {"value": "{Buttons.'+button+'.Color}","type": "color"}},'

     }

     $(document).on('click', '.adjust', function() {
       /// remove any colorRows or Hex classes with hueModify or adjusting ///
        $(document).find('.colorRow').removeClass('hueModify');
        $(document).find('.Hex').removeClass('adjusting')
        $(this).parents('.colorRow').addClass('hueModify');
        $(this).parent().find('.Hex').addClass('adjusting');
        var color    = $(document).find('.hueModify').find('.adjusting').css('backgroundColor');
        var endHex   = rgb2hex(color);
        var endHue   = Math.round(chroma(endHex).hcl()[0]);
        $('#hueModal').addClass('active');
        var y = $(document).find('.adjusting').offset();
        var adjustingShade = $(document).find('.adjusting').parent('.color-block').attr('id').match(/\d+/)
        var colorName = $(document).find('.adjusting').parent('.color-block').attr('id').replace('-' + adjustingShade, '');
        colorName = colorName.replace('-light','');
        $('#hueName span').html(colorName + '-' + adjustingShade)
        if (adjustingShade == 900) {
          $('#hueModal').css('left', 'unset')
          $('#hueModal').css('right', '27px');
          $('#hueModal').css('top',y.top - 290);
          $('#resetHue').attr('name', 900 )
        } else {
          $('#hueModal').css('right', 'unset');
          $('#hueModal').css('left', '310px')
          $('#hueModal').css('top',y.top - 290);
          $('#resetHue').attr('name', 0 )
        }
        $('#max-hue').slider('value', endHue)
        $('#newHue').html(endHue)
     });

     $(document).on('click', '#resetHue', function() {
       var adjustHue  = $(document).find('.hueModify').find('.adjusting').parents('.color-block').attr('id').match(/\d+/)
       var resetRGB      = $(document).find('.hueModify').find('.adjusting').attr('name').split('/')[0]
       var resetHCL      = chroma('rgb(' + resetRGB +')').hcl();
       var reset         = resetHCL[0];
       var primeShade = $(document).find('.hueModify').find('.prime').attr('id').match(/\d+/);
       var colorName  = $(document).find('.adjusting').parent('.color-block').attr('id').replace('-' + adjustHue, '');
       if (adjustHue == 900) {
          var i = parseInt(primeShade) + 100
          var n = 900
       } else {
          var i = 0
          var n =  primeShade - 100
       }
       console.log('i: ' + i  + ' n: ' + n)
        while (i <= n) {

          console.log('#' + colorName + '-' + i  + ' .Hex')
          var iName   = $(document).find('#' + colorName + '-' + i  + ' .Hex').attr('name');
          var iRGB    ='rgb(' + iName.split('/')[0]  + ')';
          var iHex    = iName.split('/')[1];
          console.log('iName:' + iName)
          console.log('iRGB:' + iRGB)
          console.log('iHex:' + iHex)
          $(document).find('#' + colorName + '-' + i + ' .Hex').css('background', iRGB);
          if (getContrast(iHex.toString()) == '#ffffff') {
            text_color = [255,255,255]; // white
          } else {
            text_color = darkTextArray; // black
          }
          // get the contrast ration of the color against the suggested text color //
          var contrastRation = contrast(resetRGB, text_color); // 1.0736196319018405
          console.log('contrastRation: ' + contrastRation)
          // based on the mode light or dark - run the appropriate check to see if the color and on color meet the contrats ratio of wcagContrast or if the shade needs to be lighted or darked //
          var darkName = colorName.replace('light','dark')

          var newHex = mixColors('#000000',iHex,.15);
          var newRGB = rgb2hex(newHex.toString())
          console.log(newRGB)
          //checkDM(darkName + '-' + i, newRGB)
          console.log('darkmode ')
          checkContrast(colorName + '-' + i, iHex, 'light')
          i = i + 100
        }
        console.log(reset.toFixed(2))
       $("#max-hue").slider('value',reset.toFixed(2));
       $('#newHue').html(reset.toFixed(2))

     });
     $(document).on('click', '#closeHue', function() {
        $('#hueModal').removeClass('active');
     });
     // build color //
      function buildColor(theme, mode,rgbArray,text_color,contrastRation) {
        console.log('theme: ' + theme  + ', mode: ' + mode + ' rgbArray:' + rgbArray + ' text_color: ' + text_color + ' contrastRation:'  +  contrastRation)
        var rgb = "rgb(" + rgbArray +")"
        var hex = rgb2hex(rgb)
        var onColor = rgb2hex("rgb(" + text_color +")")
        if (mode == 'dark') {
          // get the sautation value and enter it in the color infomation //
          var saturation = checkSaturation(hex)
          $('#'+ theme + ' .Saturation span').html(saturation)
          var rootTheme = theme.replace('-dark', '');
          // if the passed along text color is white - give it an opacity of .6 for dark mode //
          if (text_color == '255,255,255') {
            // update the swtaches css text color //
            $('#'+ theme + ' .Hex').css('color', 'rgba(255,255,255,'+dmOpacity+')');
            // enter the value into the color infomation for the user //
            $('#'+ theme + ' .OnColor span').html('rgba(255,255,255,'+dmOpacity+')')
            // update the root theme's text color //
            $('.' + theme).css('color', 'rgba(255,255,255,'+dmOpacity+')');
            // update the root variable //
            document.querySelector(':root').style.setProperty('--dm-on-' + rootTheme, 'rgba(255,255,255,'+dmOpacity+')');
            if (rootTheme == 'info' || rootTheme == 'success' || rootTheme == 'warning' || rootTheme == 'danger') {
              // for the state colors update the root with just the rgb values - this is done so that rgba values can be made with varying opacities //
              document.querySelector(':root').style.setProperty('--dm-' + rootTheme, rgbArray);
            } else {
              document.querySelector(':root').style.setProperty('--dm-' + rootTheme, rgb);
            }
          } else {
            $('#'+ theme + ' .Hex').css('color', darkText);
            $('#'+ theme + ' .OnColor span').html(darkText)
            $('.' + theme).css('color', darkText);
            document.querySelector(':root').style.setProperty('--dm-on-' + rootTheme, darkText);
            if (rootTheme == 'info' || rootTheme == 'success' || rootTheme == 'warning' || rootTheme == 'danger') {
              document.querySelector(':root').style.setProperty('--dm-' + rootTheme, rgbArray);
            } else {
              document.querySelector(':root').style.setProperty('--dm-' + rootTheme, rgb);
            }
          }
        } else {
            var rootTheme = theme.replace('-light', '');
            $('#'+ theme + ' .Hex').css('color', onColor);
            $('#'+ theme + ' .OnColor span').html(onColor);
            var name = $('#'+ theme + ' .Hex').attr('name');
            if (!name) {
              $('#'+ theme + ' .Hex').attr('name', rgbArray + '/' + hex);
            }
            $(document).find('.' + theme).css('color', onColor);
            $(document).find('.' + theme).css('background', rgb);
            var themeName  = rootTheme.split('-')[0];
            // a the 10 light shades to the THEME drop down menu options for the following: //
            // * Primary Color //
            // * Secondary Color //
            // * Tertiary Color //
            // * Gradient 1-a //
            // * Gradient 1-b //
            // * Gradient 2-a //
            // * Gradient 2-b //
            // * Icons //
            // * Buttons //
            // * Text Gradient 1-a //
            // * Text Gradient 1-b //
            if ($(document).find('#primary-'+ themeName).length == 0) {
              $('#themePrimary .dropdown-menu').append('<li><ul class="colorGroup" id="primary-' +themeName+'"></ul></li>')
              $('#themeSecondary .dropdown-menu').append('<li><ul class="colorGroup"  id="secondary-' +themeName+'"></ul></li>')
              $('#themeTertiary  .dropdown-menu').append('<li><ul class="colorGroup"  id="tertiary-' +themeName+'"></ul></li>')
              $('#themeGradient1-a  .dropdown-menu').append('<li><ul class="colorGroup hidden" id="gradient1-a-' +themeName+'"></ul></li>')
              $('#themeGradient1-b  .dropdown-menu').append('<li><ul class="colorGroup hidden" id="gradient1-b-' +themeName+'"></ul></li>')
              $('#themeGradient2-a  .dropdown-menu').append('<li><ul class="colorGroup hidden" id="gradient2-a-' +themeName+'"></ul></li>')
              $('#themeGradient2-b  .dropdown-menu').append('<li><ul class="colorGroup  hidden" id="gradient2-b-' +themeName+'"></ul></li>')
              $('#themeIcons .dropdown-menu').append('<li><ul class="colorGroup  hidden" id="themeIcons-' +themeName+'"></ul></li>')
              $('#themeButtons .dropdown-menu').append('<li><ul class="colorGroup  hidden" id="themeButtons-' +themeName+'"></ul></li>')
              $('#themeGradientText-a  .dropdown-menu').append('<li><ul class="colorGroup  hidden" id="themeGradientText-a-' +themeName+'"></ul></li>')
              $('#themeGradientText-b  .dropdown-menu').append('<li><ul class="colorGroup  hidden" id="themeGradientText-b-' +themeName+'"></ul></li>')
              $('#themeAccent .dropdown-menu').append('<li><ul class="colorGroup hidden" id="themeAccent-' +themeName+'"></ul></li>')

            }
            if (rootTheme.indexOf("-") >= 0) {
              var themeOrder = rootTheme.split('-')[1];
              if (themeOrder == '0') {
                themeOrder = '1'
              }
              $('#primary-'+ themeName).append('<li  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'"  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="'+ rootTheme +'">Aa</div></a></li>');
              $('#secondary-'+ themeName).append('<li  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' +  rootTheme +'"  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="'+ rootTheme +'">Aa</div></a></li>');
              $('#tertiary-'+ themeName).append('<li  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'"  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="'+ rootTheme +'">Aa</div></a></li>');
              $('#gradient1-a-'+ themeName).append('<li  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'"  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="'+ rootTheme +'">Aa</div></a></li>');
              $('#gradient1-b-'+ themeName).append('<li  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'"  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="'+ rootTheme +'">Aa</div></a></li>');
              $('#gradient2-a-'+ themeName).append('<li  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'"  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="'+ rootTheme +'">Aa</div></a></li>');
              $('#gradient2-b-'+ themeName).append('<li  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'"  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="'+ rootTheme +'">Aa</div></a></li>');
              $('#themeAccent-'+ themeName).append('<li  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'"  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="'+ rootTheme +'">Aa</div></a></li>');

              //  Get the current background color and show/hide the colors that will meet the contrast requirements of 3.1 or hight against the background //
              //  The colors have
              var backgroundColor = $('#themeBackground button .Hex').eq(0).css('backgroundColor').replace(/\s/g, '');
              if (backgroundColor == 'rgb(255,255,255)' ) {
                // if the color has a ration of 3.1 or higher agaist white then build an li and add the class 'for-white-bg' and make it active (visable) //
                if (contrast([255,255,255], rgbArray) >= 3.1) {
                  $('#themeButtons-'+ themeName).append('<li class="for-white-bg active" data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'" >Aa</div></a></li>');
                  $('#themeIcons-'+ themeName).append('<li class="for-white-bg active" data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'"  >Aa</div></a></li>');
                  $('#themeGradientText-a-'+ themeName).append('<li class="for-white-bg active" data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'" >Aa</div></a></li>');
                  $('#themeGradientText-b-'+ themeName).append('<li class="for-white-bg active" data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'" >Aa</div></a></li>');
                } else {
                  // else build an li and add the class 'for-black-bg' with NO active class //
                  $('#themeButtons-'+ themeName).append('<li class="for-black-bg"  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'">Aa</div></a></li>');
                  $('#themeIcons-'+ themeName).append('<li class="for-black-bg"  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'">Aa</div></a></li>');
                  $('#themeGradientText-a-'+ themeName).append('<li class="for-black-bg"  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'">Aa</div></a></li>');
                  $('#themeGradientText-b-'+ themeName).append('<li class="for-black-bg"  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'">Aa</div></a></li>');
                }
              } else {
                // if the color has a ration of 3.1 or higher agaist near black then build an li and add the class 'for-black-bg' and make it active (visable) //
                if (contrast(darkTextArray, rgbArray) >= 3.1) {
                  $('#themeButtons-'+ themeName).append('<li class="for-black-bg active"  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'">Aa</div></a></li>');
                  $('#themeIcons-'+ themeName).append('<li class="for-black-bg active"  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'">Aa</div></a></li>');
                  $('#themeGradientText-a-'+ themeName).append('<li class="for-black-bg active"  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'">Aa</div></a></li>');
                  $('#themeGradientText-b-'+ themeName).append('<li class="for-black-bg active"  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'">Aa</div></a></li>');
                } else {
                  // else build an li and add the class 'for-white-bg' with NO active class //
                  $('#themeButtons-'+ themeName).append('<li class="for-white-bg"  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'">Aa</div></a></li>');
                  $('#themeIcons-'+ themeName).append('<li class="for-white-bg"  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'">Aa</div></a></li>');
                  $('#themeGradientText-a-'+ themeName).append('<li class="for-white-bg"  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'">Aa</div></a></li>');
                  $('#themeGradientText-b-'+ themeName).append('<li class="for-white-bg"  data-order="'+ themeOrder  +'"><a class="dropdown-item" href="#"><div class="Hex ' + rootTheme +'">Aa</div></a></li>');
                }
              }
            } else {
              // add subtitle for the color in each dropdown //
              $( '<div class="dropdown-subtitle subtitle1">'+ rootTheme +'</div>' ).insertBefore( $('#primary-'+ themeName ) );
              $( '<div class="dropdown-subtitle subtitle1">'+ rootTheme +'</div>' ).insertBefore( $('#secondary-'+ themeName ) );
              $( '<div class="dropdown-subtitle subtitle1">'+ rootTheme +'</div>' ).insertBefore( $('#tertiary-'+ themeName ) );
              $( '<div class="dropdown-subtitle subtitle1">'+ rootTheme +'</div>' ).insertBefore( $('#themeIcons-'+ themeName ) );
              $( '<div class="dropdown-subtitle subtitle1">'+ rootTheme +'</div>' ).insertBefore( $('#themeButtons-'+ themeName ) );
              $( '<div class="dropdown-subtitle subtitle1">'+ rootTheme +'</div>' ).insertBefore( $('#gradient1-a-'+ themeName ) );
              $( '<div class="dropdown-subtitle subtitle1">'+ rootTheme +'</div>' ).insertBefore( $('#gradient1-b-'+ themeName ) );
              $( '<div class="dropdown-subtitle subtitle1">'+ rootTheme +'</div>' ).insertBefore( $('#gradient2-a-'+ themeName ) );
              $( '<div class="dropdown-subtitle subtitle1">'+ rootTheme +'</div>' ).insertBefore( $('#gradient2-b-'+ themeName ) );
              $( '<div class="dropdown-subtitle subtitle1">'+ rootTheme +'</div>' ).insertBefore( $('#themeGradientText-a-'+ themeName ) );
              $( '<div class="dropdown-subtitle subtitle1">'+ rootTheme +'</div>' ).insertBefore( $('#themeGradientText-b-'+ themeName ) );
              $( '<div class="dropdown-subtitle subtitle1">'+ rootTheme +'</div>' ).insertBefore( $('#themeDarkmode-BG-'+ themeName ) );
            }
            // update the base color swatches //
            $(document).find('.' + rootTheme).css('color', onColor);
            $(document).find('.' + rootTheme).css('background', rgb);

            document.querySelector(':root').style.setProperty('--on-' + rootTheme, onColor);
            // update the css root variable //
            if (rootTheme == 'info' || rootTheme == 'success' || rootTheme == 'warning' || rootTheme == 'danger') {
              // for the state colors update the root with just the rgb values - this is done so that rgba values can be made with varying opacities //
              document.querySelector(':root').style.setProperty('--' + rootTheme, rgbArray);
            } else {
              document.querySelector(':root').style.setProperty('--' + rootTheme, rgb);
            }
        }
        // update the color background and color information //
        $('#'+ theme + ' .Hex').css('background', hex);
        $('#'+ theme + ' .Contrast span').html(contrastRation)
        $('#'+ theme + ' .Color span').html(hex)

        $('#'+ theme + ' .OnColor span').html('rgba(255,255,255,'+dmOpacity+')')
        $('.' + theme).css('background', hex);

        // sort the shades in the various dropdowns from lighted to darkest using the 'themeOrder' value //
        getSorted();
      }



      // build darker tones of color varients //
      function buildShades(mode, theme, color, shade) {
        var i = 0;
        var prime = shade
        var rgbArray = hextoRGBArray(color);
        // calculate how many light shades need to get built //
        var lightColors = (prime/100) + 1;
        // calculate how many dark shades need to get built //
        var darkColors = ((900-prime)/100) + 1
        if (lightColors > 1)  {
          var lightscale  = chroma.scale([( '#FFFFFF') ,color]).correctLightness(true).colors(lightColors);
        } else {
          lightscale = [color]
        }
        if (darkColors > 1) {
          if (mode == 'dark') {
            var endColor  = mixColors('#000000',color.toString(),.98);
          } else {
            var endColor  = mixColors('#000000',color.toString(),.95);
          }
          var darkscale = chroma.scale([color,endColor]).correctLightness(true).colors(darkColors);
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
            var f = chroma.scale([( '#FFFFFF') ,color]);
            if (mode == 'light') {
              var scale = 100/(prime * 2)
            } else {
              var scale = (100/ (prime * 4)) * 3
            }
            newRGB  = (f(scale));
          } else {
            var newRGB = colorScale [i]
            // adjust saturation of each color to create triangel effect - most saturated color are 600 and 700 //
          }
          newRGB = triangle(color,i,prime, newRGB, mode)
          var shade = i * 100
            if (getContrast(newRGB) == '#ffffff') {
              text_color = [255,255,255]; // white
            } else {
              text_color = darkTextArray; // black
            }
            // get the contrast ration of the color against the suggested text color //
            var contrastRation = contrast(rgbArray, text_color); // 1.0736196319018405
            // convert the color to hex //
            newRGB = rgb2hex(newRGB)
            // based on the mode light or dark - run the appropriate check to see if the color and on color meet the contrats ratio of wcagContrast or if the shade needs to be lighted or darked //
            checkContrast(theme+'-'+mode+'-'+shade, newRGB, mode)
            //
            // loop through each shade //
            i++;
        }

        if (mode == "dark" && wcagContrast == 4.5) {
          if (theme == 'info' || theme == 'success'  || theme == 'warning' || theme == 'danger') {
          } else {
            adjust(theme,'dark');
          }
        }
        if (wcagContrast == 7.1) {
          if (theme == 'info' || theme == 'success'  || theme == 'warning' || theme == 'danger') {
          } else {
            adjust(theme,'light');
            adjust(theme,'dark')
          }
        }
      }


      function adjusttoMaxContrast(color,text,mode) {
        /// get shades as close to contrast requiement as possible ///
        var i = 0
        var hex = (chroma(color).darken(i)).toString()
        var startHex = hex
        var newText, textArray, rbgArray, contrastRatio
        // get the dark mode text color //
        if (text == '#ffffff') {
           if (mode == 'dark') {
             newText = lighten(color,mixer).toString()
             textArray = hextoRGBArray(newText);
           } else {
             textArray = [255,255,255]
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
            hex = lighten(color,1 - i)
            if (mode == 'dark') {
              newText = lighten(color,mixer).toString()
              textArray = hextoRGBArray(newText);
            } else {
              textArray = [255,255,255]
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
          var hex = lighten(color,1 - i)
          if (mode == 'dark') {
            newText = lighten(color,mixer).toString()
            textArray = hextoRGBArray(newText);
          } else {
            textArray = [255,255,255]
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
        return(hex)
      }

      function adjust(colorName, mode) {
        var lastChar = dmOpacity[dmOpacity.length - 1];
        if (lastChar == "0") {
          dmOpacity = dmOpacity.slice(0, -1);
        }
        i = 100
        var firstLightText;
        while (i <= 900){
          var text = $(document).find('#' + colorName + '-'+mode+'-' + i + ' .Hex').css('color');
          var darkTextRGB = hex2rgb(darkText)
          text = text.replace(/ /g, '');
          if (text == 'rgba(255,255,255,'+dmOpacity+')' || text == 'rgb(255,255,255)') {
            firstLightText = i
            lastDarkText = i - 100;
            var startLightShade = rgb2hex($(document).find('#' + colorName + '-'+mode+'-0 .Hex').css('backgroundColor'));
            var endLightShade          = rgb2hex($(document).find('#' + colorName + '-'+mode+'-' + lastDarkText + ' .Hex').css('backgroundColor'));
            var nexttoLast = lastDarkText - 100
            var nexttoLastLightShade   = rgb2hex($(document).find('#' + colorName + '-'+mode+'-' + nexttoLast + ' .Hex').css('backgroundColor'));
            // check to see if the last and 2nd to last colors are close ///
            var difference = chroma.deltaE(endLightShade , nexttoLastLightShade);
            // if the color
            if ($('#' + colorName + '-'+mode+'-' + lastDarkText + ' .Hex').hasClass('lightened') || $('#' + colorName + '-'+mode+'-' + lastDarkText + ' .Hex').hasClass('darkened') || difference < 1.5) {
              var endLightShade   = rgb2hex($(document).find('#' + colorName + '-'+mode+'-' + nexttoLast  + ' .Hex').css('backgroundColor'));
            } else {
              var endLightShade   = rgb2hex($(document).find('#' + colorName + '-'+mode+'-' + lastDarkText + ' .Hex').css('backgroundColor'));
            }
            // adjust the color to have the max possible contrast //
            endLightShade = adjusttoMaxContrast(endLightShade, darkTextArray, mode);
            //alert(colorName+'-'+mode+': ' + endLightShade)
            $(document).find('#' + colorName + '-'+mode+'-' + lastDarkText + ' .Hex').addClass('lastDarkText');
            checkContrast(colorName+'-'+mode+'-'+lastDarkText, hex2rgb(endLightShade), mode);
            var d = firstLightText
            var startDarkShade = rgb2hex($(document).find('#' + colorName + '-'+mode+'-' + firstLightText + ' .Hex').css('backgroundColor'));
            startDarkShade = adjusttoMaxContrast(startDarkShade,'#ffffff',mode)
            $(document).find('#' + colorName + '-'+mode+'-' + firstLightText + ' .Hex').addClass('firstLightText')
            checkContrast(colorName+'-'+mode+'-'+d, hex2rgb(startDarkShade), mode);
            rescale(colorName,mode,lastDarkText );
            return false;
          }
          i = i + 100
        }
      }

      function rescale(colorName, mode, lastDarkText ) {
        // get the lights shade //
        var startLightShade = rgb2hex($(document).find('#' + colorName + '-'+ mode +'-0 .Hex').css('backgroundColor'));
        // get the last shade with dark text //
        var endLightShade  = rgb2hex($(document).find('#' + colorName + '-'+ mode +'-'+ lastDarkText + ' .Hex').css('backgroundColor'));
        var colorCount = lastDarkText/100 + 1
        var newLightShades = chroma.scale([startLightShade,endLightShade]).colors(colorCount);
        // cycle through the new chroma scale and assign to the shades //
        var firstLightText = lastDarkText + 100
        var n = 0
        while (n < firstLightText  ) {
          var shadeIndex = n/100
          var newColor = newLightShades[shadeIndex]
          var newRGB   = hex2rgb(newColor);
          checkContrast(colorName+'-'+mode+'-'+n, newRGB, mode)
          n = n + 100
        }
        // get the darkest shade //
        var endDarkShade   = rgb2hex($(document).find('#' + colorName + '-'+mode+'-900 .Hex').css('backgroundColor'));
        // get the first shade with light text //
        var startDarkShade = rgb2hex($(document).find('#' + colorName + '-'+ mode +'-'+ firstLightText+' .Hex').css('backgroundColor'));
        var d = firstLightText
        while (d <= 900) {
          if (d == 900) {
            var endDarkShade   = rgb2hex($(document).find('#' + colorName + '-'+mode+'-900 .Hex').css('backgroundColor'));
            var newRGB = hex2rgb(endDarkShade)
            checkContrast(colorName+'-'+mode+'-'+d, newRGB, mode)
          } else {
            // cycle through the new chroma scale and assign to the shades //
            var colorCount = (900 - lastDarkText)/100
            var newDarkShades = chroma.scale([startDarkShade,endDarkShade]).colors(colorCount);
            var shadeIndex = (d - firstLightText)/100
            var newColor = newDarkShades[shadeIndex]
            var newRGB   = hex2rgb(newColor);
            checkContrast(colorName+'-'+mode+'-'+d, newRGB, mode)
          }
        d = d + 100
       }
      }

     $('#setchromaMax').click(function() {
       if ($('#setchromaMax').is(':checked')) {
         $('#maxChromaInfo').addClass('active')
       } else {
         $('#maxChromaInfo').removeClass('active')
       }
     });

      // updade sautation //
      function triangle(color,i,prime, newRGB, mode) {
        var maxChroma, dmmaxChroma
        if ($('#setchromaMax').is(':checked')) {
          maxChroma   = $('#chromaMax').val();
          dmmaxChroma = $('#dmchromaMax').val();
        } else {
          maxChroma = 100
          dmmaxChroma = 40
        }
        prime = prime/100
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
                change =.75/prime
            } else {
                change =.5/prime
            }
          }
          else if (i <= 7) {
            change = i/prime
          } else {
            change = (7 - (i - 7) - 1)/7
          }
          var newChroma = primeChroma * change
        } else {
          var seven = (7/(7 - (prime - 7) - 1)) * primeChroma
          if (seven > maxChroma) {
            seven = maxChroma
          }
          console.log('7: '  + seven)
          if (i <= 7) {
            if (i == 0) {
               var change = .75/7
            } else {
               var change = i/7
            }
            console.log('change:'  + change + ', seven: ' + seven)
            newChroma = seven * change
            console.log('i: ' + i + ', newChroma: ' + newChroma)
          } else {
            var change = (7 - (i - 7) - 1)/7
            newChroma = seven * change
            console.log('i: ' + i + ', newChroma: ' + newChroma)
          }
        }
        /// don't let the chroma be over the max of less than 4 ///
        if (newChroma > maxChroma) {
          newChroma = maxChroma
        } else if (newChroma < 4){
          newChroma = 4
        }
        newChroma = newChroma
        console.log('prime:'  + prime + ', i: ' + i + ', change: ' + change + ' Chroma:' + newChroma)
        console.log('h: ' + ihcl[0]  +  ', c: ' + newChroma + ' , l: ' + ihcl[2])
        var newHCL = chroma.hcl(ihcl[0], newChroma , ihcl[2]).hex();
        console.log('i:'  + i + ', hex: ' + newHCL + ' , chroma:'  + chroma(newHCL).hcl()[1]);
        return(newHCL)
      }

      // desaturate color //
      function desaturate(theme, color, mode, saturation) {
        if (color.indexOf("rgb") >= 0) {
          color = rgb2hex(color)
        }
        var rgbIntArray = [];
        var r = hexToRgb(color).r;
        var g = hexToRgb(color).g;
        var b = hexToRgb(color).b;
        rgbIntArray.push(r);
        rgbIntArray.push(g);
        rgbIntArray.push(b);
        var rgb = 'rgb(' + r + ',' + g + ', ' + b + ')'
        const grayVal = getLightnessOfRGB(rgb)*255;
        const [lowest,middle,highest] = getLowestMiddleHighest(rgbIntArray);
        if(lowest.val===highest.val){return color;}
        // So a gray version of our color would look like rgb(217,217,217);
        // Now let's get the saturation range available:
        const saturationRange =  Math.round(Math.min(255-grayVal,grayVal));
        // Get the maximum change by getting the minimum out of:
        // (255 - the highest value) OR (the lowest value)
        const maxChange = Math.min((255-highest.val),lowest.val);
        const changeAmount = Math.min(saturationRange/-5, maxChange);
        const middleValueRatio =(grayVal-middle.val)/(grayVal-highest.val);
        const returnArray=[];
        returnArray[highest.index]= Math.round(highest.val+changeAmount);
        returnArray[lowest.index]= Math.round(lowest.val-changeAmount);
        returnArray[middle.index]= Math.round(grayVal+(returnArray[highest.index]-grayVal)*middleValueRatio);
        var rgb = 'rgb('+ returnArray +')';
        var color = rgb2hex(rgb)
        var newSaturation = checkSaturation(color)

        var rgb = 'rgb('+ returnArray +')';
        var hex = rgb2hex(rgb);
        var onColor = getContrast(hex);
        checkContrast(theme, hex, 'dark') ;

      }
      /// RGB to HSV ///
      function RGBtoHSV(color) {
        var r,g,b,h,s,v;
        r= color[0];
        g= color[1];
        b= color[2];
        min = Math.min( r, g, b );
        max = Math.max( r, g, b );
        v = max;
        delta = max - min;
        if( max != 0 )
            s = delta / max;        // s
        else {
            // r = g = b = 0        // s = 0, v is undefined
            s = 0;
            h = -1;
            return [h, s, undefined];
        }
        if( r === max )
            h = ( g - b ) / delta;      // between yellow & magenta
        else if( g === max )
            h = 2 + ( b - r ) / delta;  // between cyan & yellow
        else
            h = 4 + ( r - g ) / delta;  // between magenta & cyan
        h *= 60;                // degrees
        if( h < 0 )
            h += 360;
        if ( isNaN(h) )
            h = 0;
        return [h,s,v];
    };

     /// HSV to RGB ///
     function HSVtoRGB(color) {
        var i;
        var h,s,v,r,g,b;
        h = color[0];
        s = color[1];
        v = color[2];
        if(s === 0 ) {
            // achromatic (gray)
            r = g = b = v;
            return [r,g,b];
        }
        h /= 60;            // sector 0 to 5
        i = Math.floor( h );
        f = h - i;          // factorial part of h
        p = v * ( 1 - s );
        q = v * ( 1 - s * f );
        t = v * ( 1 - s * ( 1 - f ) );
        switch( i ) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            default:        // case 5:
                r = v;
                g = p;
                b = q;
                break;
        }

        if (r <= 0 ){
          r = 0;
        }
        if (g <= 0 ){
          g = 0;
        }
        if (b <= 0 ){
          b = 0;
        }
        if (r >= 255 ){
          r = 255;
        }
        if (g >= 255 ){
          g = 255;
        }
        if (b >= 255 ){
          b = 255;
        }
        return [Math. round(r),Math.round(g),Math.round(b)];

    }

    /// rgn to hsl ///
    function rgbToHsl(r, g, b){
      r /= 255, g /= 255, b /= 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if(max == min){
          h = s = 0; // achromatic
      }else{
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch(max){
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
      }
      return [h, s, l];
    }

    /// HSL to RGB ///
    function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
        r = Math.round(r * 255)
        g = Math.round(g * 255)
        b = Math.round(b * 255)

        if (r <= 0 ){
          r = 0;
        }
        if (g <= 0 ){
          g = 0;
        }
        if (b <= 0 ){
          b = 0;
        }
        if (r >= 255 ){
          r = 255;
        }
        if (g >= 255 ){
          g = 255;
        }
        if (b >= 255 ){
          b = 255;
        }

    return [r, g, b];
  }


      //  Create darker Shades //
      function darkenColor(color) {
        color = color.toString();
        if (color.indexOf("rgb") >= 0) {
          color = rgb2hex(color)
        }
        var i = 1
        var multiplier = .99
        var rgbArray = [];
        var r = hexToRgb(color).r;
        var g = hexToRgb(color).g;
        var b = hexToRgb(color).b;
        var newR = Math. round(r * multiplier)
        var newG = Math. round(g * multiplier)
        var newB = Math. round(b * multiplier)
        if (newR <= 0) {
          newR = 0
        }
        if (newG <= 0) {
          newG = 0
        }
        if (newB <= 0) {
          newB = 0
        }
        rgbArray.push(newR);
        rgbArray.push(newG);
        rgbArray.push(newB);
        var rgb = 'rgb('+rgbArray+')'
        var hex = rgb2hex(rgb)
        return hex;
    }




  /// COLOR CALCULATIONS  ///
  // convert hex color to rgb //
    function hexToRgb(hex) {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
      });
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    // convert rgb to hex //
    function rgb2hex(rgb) {
      console.log('rgbtoHex  rgb:' + rgb)
       if (  rgb.indexOf("rgb") == -1 ) {
            return rgb;
       } else {
            rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
            function hex(x) {
                 return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
       }
    }

    // create rgb array fron hex //
    function hextoRGBArray(color) {
      if (color.indexOf('rgb') >= 0) {
        return([0,0,0])
      }
      color  = color.toString()
      var bgArray = [];
      var r = hexToRgb(color).r;
      var g = hexToRgb(color).g;
      var b = hexToRgb(color).b;

      bgArray.push(r);
      bgArray.push(g);
      bgArray.push(b);
      return(bgArray)
    }


 // get perceived lightness of color //
    function getLightnessOfRGB(rgbString) {
      // First convert to an array of integers by removing the whitespace, taking the 3rd char to the 2nd last then splitting by ','
      const rgbIntArray = (rgbString.replace(/ /g, '').slice(4, -1).split(',').map(e => parseInt(e)));
      // Get the highest and lowest out of red green and blue
      const highest = Math.max(...rgbIntArray);
      const lowest = Math.min(...rgbIntArray);
      // Return the average divided by 255
      return (highest + lowest) / 2 / 255;
    }

    // get lowest middle and hightest rgb //
    function getLowestMiddleHighest(rgbIntArray) {
      let highest = {val:-1,index:-1};
      let lowest = {val:Infinity,index:-1};
 
      rgbIntArray.map((val,index)=>{
        if(val>highest.val){
          highest = {val:val,index:index};
        }
        if(val<lowest.val){
          lowest = {val:val,index:index};
        }
      });
 
      if(lowest.index===highest.index){
        lowest.index=highest.index+1;
      }
      let middle = {index: (3 - highest.index - lowest.index)};
      middle.val = rgbIntArray[middle.index];
      return [lowest,middle,highest];
    }

    // calculate color saturation //
     function checkSaturation(color) {
       color = color.toString()
       if (color.toString().indexOf('rgb') >= 0) {
         color = rgb2hex(color);
       }
       var lumArray = [];
       var r = ((hexToRgb(color).r) / 255).toFixed(2);
       var g = ((hexToRgb(color).g) / 255).toFixed(2);
       var b = ((hexToRgb(color).b) / 255).toFixed(2);
       lumArray.push(r);
       lumArray.push(g);
       lumArray.push(b);
       var max = Math.max.apply(Math, lumArray);
       var min = Math.min.apply(Math, lumArray);
       var lum = (1 / 2) * (max + min);
       var saturation = (max - min) / (1 - ( 2 * lum - 1));
       saturation = saturation.toFixed(2)
       return(saturation)
     }



     // check if color should have dark or light text //
     function getContrast(hexcolor){
       if (hexcolor.length > 7) {
         hexcolor = rgb2hex(hexcolor)
       }
         // If a leading # is provided, remove it
         if (hexcolor.slice(0, 1) === '#') {
           hexcolor = hexcolor.slice(1);
         }
         // Convert to RGB value
         var r = parseInt(hexcolor.substr(0,2),16);
         var g = parseInt(hexcolor.substr(2,2),16);
         var b = parseInt(hexcolor.substr(4,2),16);
      // Get YIQ ratio
      var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
      // Check contrast
      return (yiq >= 128) ? '#121212' : '#ffffff';
     };

     // Sort List by Order //
       function getSorted() {
         $('.colorGroup').each(function() {
          var id = $(this).attr('id')
          $(function() {
            $('#' + id + '> li').sort(sort_li).appendTo('#' + id );
            function sort_li(a, b) {
              return ($(b).data('order')) < ($(a).data('order')) ? 1 : -1;
            }
          })
       });
     }

     function hex2rgb(color) {
       var r = hexToRgb(color).r;
       var g = hexToRgb(color).g;
       var b = hexToRgb(color).b;
       var rgb = 'rgb(' + r + ',' + g + ',' + b + ')'
       return(rgb)
     }
     // check contrast for WCAG 2.1 AA contrast requirements //
     function contrast(rgb1, rgb2) {
       var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
       var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);

       var brightest = Math.max(lum1, lum2);
       var darkest = Math.min(lum1, lum2);
       return (brightest + 0.05) /
         (darkest + 0.05);
     }

     // calculate luminance //
     function luminance(r, g, b) {
       var a = [r, g, b].map(function(v) {
         v /= 255;
         return v <= 0.03928 ?
           v / 12.92 :
           Math.pow((v + 0.055) / 1.055, 2.4);
       });
       return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
     }

     function light(rgb) {
       var lum = luminance(rgb[0], rgb[1], rgb[2]);
       var lightness = YtoLstar(lum)
       return lightness
     }

     // perceiveed lightness //
     function YtoLstar(Y) {
       // Send this function a luminance value between 0.0 and 1.0,
       // and it returns L* which is "perceptual lightness"
       if ( Y <= (216/24389)) {       // The CIE standard states 0.008856 but 216/24389 is the intent for 0.008856451679036
               return Y * (24389/27);  // The CIE standard states 903.3, but 24389/27 is the intent, making 903.296296296296296
           } else {
               return Math.pow(Y,(1/3)) * 116 - 16;
           }
       }

     // check saturation of color for dark mode //
     function checkDM(theme, color) {
       var saturation = checkSaturation(color);
       if (saturation <= .50) {
          checkContrast(theme, color, 'dark') ;
        } else if (saturation = 1) {
          $('#' + theme ).addClass('blacken')
          color = darkenColor(color);
          checkDM(theme, color)
        } else if (saturation > .50 && saturation != 1){
          //desaturate(theme, color, 'dark', saturation)
        }
     }
    function lighten(color,amount) {
      return((mixColors(color,'#ffffff',amount )).toString())
    }

    function checkContrast(theme, color, mode) {
      var lightTextArray = hextoRGBArray(lightText);
      var rgbArray       = hextoRGBArray(rgb2hex(color));
      var shade = theme.split('-')[2];
      var newRGB = "rgb(" + rgbArray +")"
      var lightArray = lightTextArray
      var light = contrast(lightArray, rgbArray);
      var dark  = contrast(darkTextArray, rgbArray);
      var text_color, textTint, contrastRatio
      var contrastRatio = contrast(lightArray, rgbArray);
      var elevationHex;
      if ( light > dark ) {
        text_color = lightArray; // white
        var textTint = 'light';
        if (mode == 'dark') {
          var colorHex = rgb2hex(color)
          /// for dark mode - lighten color light text ///
          var newText = lighten(colorHex,mixer)
          var newArray = hextoRGBArray(colorHex);
          var lightArray = hextoRGBArray(newText)
          var elevationHex, textHex
          contrastRatio = contrast(lightArray, newArray);
          var i = .00
          while (contrastRatio < wcagContrast) {
            var hex = (chroma(color).darken(i)).toString()
            var textHex =  (mixColors(hex,'#ffffff',mixer )).toString();
            var textArray = hextoRGBArray(textHex);
            var newArray = hextoRGBArray(hex);
            var contrastRatio = contrast(newArray, textArray);
            i = i + .01
          }
          var newHex   = (chroma(rgb2hex(color)).darken(i)).toString()
          var rgbArray = hextoRGBArray(newHex);
          var textTint = 'light';
          buildColor(theme,mode,rgbArray,text_color,contrastRatio)
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
        var buildText =  darkTextArray
      }
      contrastRatio  = contrastRatio.toFixed(2)
      if (contrastRatio < wcagContrast) {
        var darkCount      = adjustDarkerCount(theme, newRGB, lightArray, contrastRatio, mode)
        var lightCount     = adjustLighterCount(theme, newRGB, darkTextArray, contrastRatio, mode)
        if (darkCount < lightCount || shade >= 600) {
          adjustColorDarker(theme, newRGB, lightArray, contrastRatio, mode)
        } else {
          adjustColorLighter(theme, newRGB, darkTextArray, contrastRatio, mode)
        }
      } else {
        console.log('theme: ' + theme + ' ,text color:' + text_color + ', rgbArray' +  rgbArray  + ', contrastRatio: ' + contrastRatio)
        buildColor(theme,mode,rgbArray,buildText,contrastRatio)
      }
    }

    /// CHECK THE CLOSETS COLOR TO THE PROVIDED HEX ///

    var colorTable = [
    {name:'black', hex: '#000000'},
    {name:'silver', hex: '#C0C0C0'},
    {name:'gray', hex: '#808080'},
    {name:'white', hex: '#FFFFFF'},
    {name:'maroon', hex: '#800000'},
    {name:'red', hex: '#FF0000'},
    {name:'purple', hex: '#800080'},
    {name:'fuchsia', hex: '#FF00FF'},
    {name:'green', hex: '#008000'},
    {name:'lime', hex: '#00FF00'},
    {name:'olive', hex: '#808000'},
    {name:'yellow', hex: '#FFFF00'},
    {name:'orange', hex: '#FFA500'},
    {name:'navy', hex: '#000080'},
    {name:'blue', hex: '#0000FF'},
    {name:'teal', hex: '#008080'},
    {name:'aqua', hex: '#00FFFF'}
    ];

    var cbTable1 = [
    {name:'cb1', hex: '#011C37'},
    {name:'cb2', hex: '#044181'},
    {name:'cb3', hex: '#278DF6'},
    {name:'cb4', hex: '#7C4DEF'},
    {name:'cb5', hex: '#C22167'},
    {name:'cb6', hex: '#EC6B29'},
    {name:'cb7', hex: '#440476'},
    {name:'cb8', hex: '#DA5EDD'},
    {name:'cb9', hex: '#639791'},
    {name:'cb10', hex: '#EAC970'},
    ];

    var cbTable2 = [
    {name:'cb1', hex: '#011C37'},
    {name:'cb2', hex: '#044181'},
    {name:'cb3', hex: '#278DF6'},
    {name:'cb4', hex: '#7C4DEF'},
    {name:'cb5', hex: '#C22167'},
    {name:'cb6', hex: '#EC6B29'},
    {name:'cb7', hex: '#478325'},
    {name:'cb8', hex: '#80D2C7'},
    {name:'cb9', hex: '#6E9691'},
    {name:'cb10', hex: '#EBC870'},
    ];

    var cbTable3 = [
    {name:'cb1', hex: '#000101'},
    {name:'cb2', hex: '#464645'},
    {name:'cb3', hex: '#5D5D5D'},
    {name:'cb4', hex: '#737273'},
    {name:'cb5', hex: '#919191'},
    {name:'cb6', hex: '#B7B7B7'},
    {name:'cb7', hex: '#CCCDCC'},
    {name:'cb8', hex: '#E4E3E4'},
    {name:'cb9', hex: '#EFEFEF'},
    {name:'cb10', hex: '#FAFAFA'},
    ];

    function findClosestColorHex(hex, table)
    {
      var rgb = hex2rgb(hex);
      var delta = 3 * 256*256;
      var temp = {r:0, g:0, b:0};
      var nameFound = 'black';

      for(i=0; i<table.length; i++)
      {
        temp = hex2rgb(table[i].hex);
        if(Math.pow(temp.r-rgb.r,2) + Math.pow(temp.g-rgb.g,2) + Math.pow(temp.b-rgb.b,2) < delta)
        {
            delta = Math.pow(temp.r-rgb.r,2) + Math.pow(temp.g-rgb.g,2) + Math.pow(temp.b-rgb.b,2);
          nameFound = table[i].name;
        }
      }
      return nameFound;
    }

    function findClosestColorRGB(r, g, b, table)
    {
      var rgb = {r:r, g:g, b:b};
      var delta = 3 * 256*256;
      var temp = {r:0, g:0, b:0};
      var nameFound = 'black';

      for(i=0; i<table.length; i++)
      {
        temp = hexToRgb(table[i].hex);
        if(Math.pow(temp.r-rgb.r,2) + Math.pow(temp.g-rgb.g,2) + Math.pow(temp.b-rgb.b,2) < delta)
        {
            delta = Math.pow(temp.r-rgb.r,2) + Math.pow(temp.g-rgb.g,2) + Math.pow(temp.b-rgb.b,2);
          nameFound = table[i].name;
        }
      }
      return nameFound;
    }

    function hexToRgb(hex) {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }


    /// THIS FUNCTION IS NOT CURENTLY USED BUT MAY BE USED TO GENERATE A COMPLEMENTARY GRAY SHADE (EITHER WARM OR COLD) IN THE FUTURE ///
    // check is color is warm or cold - not currently used but could be used to determine warm or cool gray tones//
    function checkHot(color) {
      color = rgb2hex(color);
      var lumArray = [];
      var r = ((hexToRgb(color).r) / 255).toFixed(2);
      if (r > 128) {
        gray = 'hot'
      } else {
        gray = 'cool'
      }
      return gray
    }

  // color blind simulations ///

var modP = [ .7465, .2535, 1.273463, -0.073894],
    modD = [ 1.4, -.04, .968437, .003331 ],
    modT = [ 1.748, 0, .062921, .292119 ];

function convert( hex, mod ){
  var r = parseInt( hex.substring(0,2), 16 ),
      g = parseInt(  hex.substring(2,4), 16 ),
      b = parseInt( hex.substring(4,6), 16 ),
      confuseX = mod[0],
      confuseY = mod[1],
      confuseM = mod[2],
      confuseInt = mod[3],
      amount = 1;
  //convert to XYZ color space
  var powR = Math.pow( r, 2.2 ),
      powG = Math.pow( g, 2.2 ),
      powB = Math.pow( b, 2.2 ),
      X = powR*.412424 + powG*.357579 + powB*.180464,
      Y = powR*.212656 + powG*.715158 + powB*.072185,
      Z = powR*.019332 + powG*.119193 + powB*.950444;

  //convert XYZ to xyY
  var chromaX = X/(X+Y+Z),
      chromaY = Y/(X+Y+Z);

  //generate confusion line
  var slope = ( chromaY - confuseY ) / ( chromaX - confuseX ),
      int = chromaY - chromaX * slope;

  //calculate deviation
  var deviationX = ( confuseInt - int ) / ( slope - confuseM ),
      deviationY = ( slope * deviationX ) + int;

  //compute simulated color with confusion
  X = deviationX * Y / deviationY;
  Z = (1 - ( deviationX + deviationY ) ) * Y / deviationY;

  //neutral gray
  var neutralX = .312713 * Y / .329016,
      neutralZ = .358271 * Y / .329016;

  //diff between color and gray
  var diffX = neutralX - X,
      diffZ = neutralZ - Z,
      diffR = diffX * 3.24071 + diffZ * -0.498571,
      diffG = diffX * -0.969258 + diffZ * .0415557,
      diffB = diffX * .0556352 + diffZ * 1.05707;

  //convert back to RBG
  var rgbR = X * 3.24071 + Y * -1.53726 + Z * -0.498571,
      rgbG = X * -0.969258 + Y * 1.87599 + Z * .0415557,
      rgbB = X * .0556352 + Y * -.203996 + Z * 1.05707;

  //compensate towards neutral
  var fitR = ( ( diffR < 0 ? 0 : 1 ) - rgbR ) / diffR,
      fitG = ( ( diffG < 0 ? 0 : 1 ) - rgbG ) / diffG,
      fitB = ( ( diffB < 0 ? 0 : 1 ) - rgbB ) / diffB;

  var adjust = [
    ( fitR > 1 || fitR < 0 ) ? 0 : fitR,
    ( fitG > 1 || fitG < 0 ) ? 0 : fitG,
    ( fitB > 1 || fitG < 0 ) ? 0 : fitB
  ];

  adjust = Math.max.apply( null, adjust );

  //shift proportional to the greatest shift
  rgbR = rgbR + ( adjust * diffR );
  rgbG = rgbG + ( adjust * diffG );
  rgbB = rgbB + ( adjust * diffB );

  //gamma correct
  rgbR = Math.pow( rgbR, 1/2.2 );
  rgbG = Math.pow( rgbG, 1/2.2 );
  rgbB = Math.pow( rgbB, 1/2.2 );

  var rgb = ('rgb(' +   Math.round(rgbR) + ',' +   Math.round(rgbG) + ',' +   Math.round(rgbB) + ')')
  return rgb;

  //back to hex
  r = Math.ceil(rgbR).toString(16);
  g = Math.ceil(rgbG).toString(16);
  b = Math.ceil(rgbB).toString(16);
  if( r.length === 1 ) r = '0'+r;
  if( g.length === 1 ) g = '0'+g;
  if( b.length === 1 ) b = '0'+b;



}

function monochrome( hex ){
  var r = parseInt( hex.substring(0,2), 16 ),
      g = parseInt(  hex.substring(2,4), 16 ),
      b = parseInt( hex.substring(4,6), 16 ),
      color = Math.ceil( (r * 0.212656 + r * 0.715158 + r * 0.072186) ).toString(16);

  return '#'+color+color+color;
}

function updateColors( string ){
  var list = string.split(',');
  list = list.filter(function(n){return n});
  var colorCount = list.length;
  $( '.box' ).each( function(i){
    var index = i % colorCount;
    $(this).css( 'background-color', '#'+list[index] )
      .attr( 'data-color', list[index] );
  } );
}

$( '#input' ).keydown( function(e){
  if( e.which === 188 || e.which === 13 || $(this).val().length === 6 ){
    updateColors( $(this).val() );
  }
  if( e.which === 13 ){
    $(this).blur();
    e.preventDefault();
  }
} );



  function convertCB(color, type) {
    if ( type === 'm' ){
      var newColor = monochrome(color);
    } else if (type === 'p' ) {
      var newColor = convert(color,  modP)
    } else if ( type === 'd' ) {
      var newColor = convert(color,  modD)
    } else if ( type === 't' ) {
      var newColor = convert(color,  modT)
    } else if ( type === 'none' ) {
      var newColor = hex2rgb('#' + color)
    }
    return newColor
  }

  function updateHexcolor() {
    /// fist build all the colors ///

    $('#non-cb-colors .primary').css('background', primary )
    $('#non-cb-colors .secondary').css('background', secondary );
    $('#non-cb-colors .tertiary').css('background', tertiary );
    $('#non-cb-colors .background').css('background', backgroundPrimary)
    $('#non-cb-colors .background-secondary').css('background', backgroundSecondary )
    $('#non-cb-colors .button').css('background', buttons)
    $('#non-cb-colors .icon').css('background', icons)
    $('#non-cb-colors .gradient1a').css('background', gradient1a )
    $('#non-cb-colors .gradient1b').css('background', gradient1b )
    $('#non-cb-colors .gradient2a').css('background', gradient2a )
    $('#non-cb-colors .gradient2b').css('background', gradient2b )
    $('#non-cb-colors .textgradient1a').css('background', gradientTexta)
    $('#non-cb-colors .textgradient1b').css('background', gradientTextb)
    $('#non-cb-colors .hotlink').css('background', hotlink);

    $('#fcb-colors .primary').css('background', primaryName )
    $('#fcb-colors .secondary').css('background', secondaryName );
    $('#fcb-colors .tertiary').css('background', tertiaryName );
    $('#fcb-colors .background').attr('name',backgroundPrimaryName);
    $('#fcb-colors .background-secondary').attr('name',backgroundSecondaryName);
    $('#fcb-colors .button').attr('name',buttonsName);
    $('#fcb-colors .icon').attr('name',iconsName);
    $('#fcb-colors .gradient1a').attr('name', gradient1aName);
    $('#fcb-colors .gradient1b').attr('name', gradient1bName);
    $('#fcb-colors .gradient2a').attr('name', gradient2aName);
    $('#fcb-colors .gradient2b').attr('name', gradient2bName);
    $('#fcb-colors .textgradient1a').attr('name', textGradientName.split(',')[0]);
    $('#fcb-colors .textgradient1b').attr('name', textGradientName.split(',')[2]);
    $('#fcb-colors .hotlink').attr('name','');

    $('.background-cb').attr('name',backgroundPrimaryName )
    $('.background-secondary-cb').attr('name', backgroundSecondaryName )
    $('.primary-cb').attr('name', primaryName )
    $('.secondary-cb').attr('name', secondaryName )
    $('.tertiary-cb').attr('name', tertiaryName )
    $('.icon-cb').attr('name', iconsName )
    $('.button-cb').attr('name', buttonsName )
    $('.gradient1a-cb').attr('name', gradient1Name.split(',')[0] )
    $('.gradient1b-cb').attr('name', gradient1Name.split(',')[1] )
    $('.gradient2a-cb').attr('name', gradient2Name.split(',')[0] )
    $('.gradient2b-cb').attr('name', gradient2Name.split(',')[1] )
    $('.textgradient1a-cb').attr('name', textGradientName.split(',')[0] )
    $('.textgradient1b-cb').attr('name', textGradientName.split(',')[1] )
    $('.hotlink-cb').attr('name', buttonsName )


  }

  function updateThemetoCB(){
    /// convert all the colors ///
    $('#non-cb-colors .Hex').each(function() {
      var className = $(this).attr('name');
      var rgb = $(this).css('backgroundColor');
       if (rgb) {
          var color = rgb2hex(rgb);
          var color = color.replace('#','')
          var type = $('input[name=cb-mode]:checked').val();
          var newColor = convertCB(color, type);
          $('#cb-colors .' + className + '-cb').css('background', newColor)
       }
    });
  }

  function updateModifiedThemetoCB(){
    /// convert all the colors ///
    $('#mcb-colors .Hex').each(function() {
      var className = $(this).attr('class').replace('Hex','').replace(/\s/g, '');
      if (className == 'background-cb') {
        $('#fcb-colors .' + className).css('background', '#ffffff')
      } else if (className == 'secondary-background-cb') {
        $('#fcb-colors .' + className).css('background', '#fafafa')
      } else {
        var rgb = $(this).css('backgroundColor');
         if (rgb) {
            var color = rgb2hex(rgb);
            var color = color.replace('#','')
            var type = $('input[name=cb-mode]:checked').val();
            var newColor = convertCB(color, type);
            $('#fcb-colors .' + className).css('background', newColor)
         }
      }

    });
  }

  var webColors = new Object();
  webColors.red	    = '#FF0000'
  webColors.orange  = '#FFA500'
  webColors.maroon	= '#800000'
  webColors.yellow	= '#FFFF00'
  webColors.olive	  = '#808000'
  webColors.lime	  = '#00FF00'
  webColors.green	  = '#008000'
  webColors.aqua	  = '#00FFFF'
  webColors.teal    = '#008080'
  webColors.blue    = '#0000FF'
  webColors.navy    = '#000080'
  webColors.fuchsia	= '#FF00FF'
  webColors.purple  = '#800080'

  var cbColors = new Object();
  // tritanopia colors //
  cbColors.cbtTeal0   = '#E8F1FE'
  cbColors.cbtTeal100 = '#BCDEEE'
  cbColors.cbtTeal200 = '#95CBDC'
  cbColors.cbtTeal300 = '#71ACBB'
  cbColors.cbtTeal400 = '#4598A4'
  cbColors.cbtTeal500 = '#377C86'
  cbColors.cbtTeal600 = '#29636A'
  cbColors.cbtTeal700 = '#1C4A4E'
  cbColors.cbtTeal800 = '#123234'
  cbColors.cbtTeal900 = '#081E20'
  cbColors.oncbtTeal0   = '#121212'
  cbColors.oncbtTeal100 = '#121212'
  cbColors.oncbtTeal200 = '#121212'
  cbColors.oncbtTeal300 = '#121212'
  cbColors.oncbtTeal400 = '#121212'
  cbColors.oncbtTeal500 = '#ffffff'
  cbColors.oncbtTeal600 = '#ffffff'
  cbColors.oncbtTeal700 = '#ffffff'
  cbColors.oncbtTeal800 = '#ffffff'
  cbColors.oncbtTeal900 = '#ffffff'
  cbColors.cbtRed0   = '#F3D7E0'
  cbColors.cbtRed100 = '#EFCAD6'
  cbColors.cbtRed200 = '#E4ACB6'
  cbColors.cbtRed300 = '#DB9097'
  cbColors.cbtRed400 = '#D17376'
  cbColors.cbtRed500 = '#B15A5D'
  cbColors.cbtRed600 = '#A14443'
  cbColors.cbtRed700 = '#732F2E'
  cbColors.cbtRed800 = '#551A18'
  cbColors.cbtRed900 = '#3A0C03'
  cbColors.oncbtRed0   = '#121212'
  cbColors.oncbtRed100 = '#121212'
  cbColors.oncbtRed200 = '#121212'
  cbColors.oncbtRed300 = '#121212'
  cbColors.oncbtRed400 = '#121212'
  cbColors.oncbtRed500 = '#ffffff'
  cbColors.oncbtRed600 = '#ffffff'
  cbColors.oncbtRed700 = '#ffffff'
  cbColors.oncbtRed800 = '#ffffff'
  cbColors.oncbtRed900 = '#ffffff'
  cbColors.cbtPlum0   = '#EBE4F4'
  cbColors.cbtPlum100 = '#D4CAD9'
  cbColors.cbtPlum200 = '#BEB1BE'
  cbColors.cbtPlum300 = '#A498A2'
  cbColors.cbtPlum400 = '#908089'
  cbColors.cbtPlum500 = '#79686F'
  cbColors.cbtPlum600 = '#635157'
  cbColors.cbtPlum700 = '#4C3D41'
  cbColors.cbtPlum800 = '#3A3235'
  cbColors.cbtPlum900 = '#342F31'
  cbColors.oncbtPlum0   = '#121212'
  cbColors.oncbtPlum100 = '#121212'
  cbColors.oncbtPlum200 = '#121212'
  cbColors.oncbtPlum300 = '#121212'
  cbColors.oncbtPlum400 = '#121212'
  cbColors.oncbtPlum500 = '#ffffff'
  cbColors.oncbtPlum600 = '#ffffff'
  cbColors.oncbtPlum700 = '#ffffff'
  cbColors.oncbtPlum800 = '#ffffff'
  cbColors.oncbtPlum900 = '#ffffff'
  // tritanopia dark mode colors //
  cbColors.dmcbtTeal0   = '#CADBEB'
  cbColors.dmcbtTeal100 = '#B6D5E4'
  cbColors.dmcbtTeal200 = '#98C0CE'
  cbColors.dmcbtTeal300 = '#7CB2C1'
  cbColors.dmcbtTeal400 = '#6798A4'
  cbColors.dmcbtTeal500 = '#547D86'
  cbColors.dmcbtTeal600 = '#42646C'
  cbColors.dmcbtTeal700 = '#304B50'
  cbColors.dmcbtTeal800 = '#1F3336'
  cbColors.dmcbtTeal900 = '#0C1B1E'
  cbColors.dmoncbtTeal0   = '#121212'
  cbColors.dmoncbtTeal100 = '#121212'
  cbColors.dmoncbtTeal200 = '#121212'
  cbColors.dmoncbtTeal300 = '#121212'
  cbColors.dmoncbtTeal400 = '#121212'
  cbColors.dmoncbtTeal500 = '#ffffff'
  cbColors.dmoncbtTeal600 = '#ffffff'
  cbColors.dmoncbtTeal700 = '#ffffff'
  cbColors.dmoncbtTeal800 = '#ffffff'
  cbColors.dmoncbtTeal900 = '#ffffff'
  cbColors.dmcbtRed0   = '#E8CAD7'
  cbColors.dmcbtRed100 = '#D8A6B1'
  cbColors.dmcbtRed200 = '#CE8F99'
  cbColors.dmcbtRed300 = '#BF7073'
  cbColors.dmcbtRed400 = '#B14B4B'
  cbColors.dmcbtRed500 = '#A54544'
  cbColors.dmcbtRed600 = '#963F3E'
  cbColors.dmcbtRed700 = '#863636'
  cbColors.dmcbtRed800 = '#742D2B'
  cbColors.dmcbtRed900 = '#4D1917'
  cbColors.dmoncbtRed0   = '#121212'
  cbColors.dmoncbtRed100 = '#121212'
  cbColors.dmoncbtRed200 = '#121212'
  cbColors.dmoncbtRed300 = '#121212'
  cbColors.dmoncbtRed400 = '#ffffff'
  cbColors.dmoncbtRed500 = '#ffffff'
  cbColors.dmoncbtRed600 = '#ffffff'
  cbColors.dmoncbtRed700 = '#ffffff'
  cbColors.dmoncbtRed800 = '#ffffff'
  cbColors.dmoncbtRed900 = '#ffffff'
  cbColors.dmcbtPlum0   = '#EBE4F4'
  cbColors.dmcbtPlum100 = '#BFA8B4'
  cbColors.dmcbtPlum200 = '#AC959F'
  cbColors.dmcbtPlum300 = '#947980'
  cbColors.dmcbtPlum400 = '#7D5C62'
  cbColors.dmcbtPlum500 = '#71565B'
  cbColors.dmcbtPlum600 = '#644E52'
  cbColors.dmcbtPlum700 = '#59454B'
  cbColors.dmcbtPlum800 = '#554A4E'
  cbColors.dmcbtPlum900 = '#363135'
  cbColors.dmoncbtPlum0   = '#121212'
  cbColors.dmoncbtPlum100 = '#121212'
  cbColors.dmoncbtPlum200 = '#121212'
  cbColors.dmoncbtPlum300 = '#121212'
  cbColors.dmoncbtPlum400 = '#ffffff'
  cbColors.dmoncbtPlum500 = '#ffffff'
  cbColors.dmoncbtPlum600 = '#ffffff'
  cbColors.dmoncbtPlum700 = '#ffffff'
  cbColors.odmncbtPlum800 = '#ffffff'
  cbColors.dmoncbtPlum900 = '#ffffff'
  // Deuteranopia colors //
  cbColors.deuYellow0   = '#FDF0EA'
  cbColors.deuYellow100 = '#F9DABA'
  cbColors.deuYellow200 = '#F0C47D'
  cbColors.deuYellow300 = '#C1A06D'
  cbColors.deuYellow400 = '#AC8A44'
  cbColors.deuYellow500 = '#8E7237'
  cbColors.deuYellow600 = '#715A29'
  cbColors.deuYellow700 = '#55441A'
  cbColors.deuYellow800 = '#3B2F0A'
  cbColors.deuYellow900 = '#271F05'
  cbColors.ondeuYellow0   = '#121212'
  cbColors.ondeuYellow100 = '#121212'
  cbColors.ondeuYellow200 = '#121212'
  cbColors.ondeuYellow300 = '#121212'
  cbColors.ondeuYellow400 = '#121212'
  cbColors.ondeuYellow500 = '#ffffff'
  cbColors.ondeuYellow600 = '#ffffff'
  cbColors.ondeuYellow700 = '#ffffff'
  cbColors.ondeuYellow800 = '#ffffff'
  cbColors.ondeuYellow900 = '#ffffff'
  cbColors.deuBlue0   = '#F5E3FD'
  cbColors.deuBlue100 = '#D0CDF6'
  cbColors.deuBlue200 = '#ABB6F2'
  cbColors.deuBlue300 = '#839FEC'
  cbColors.deuBlue400 = '#548AE6'
  cbColors.deuBlue500 = '#3372C6'
  cbColors.deuBlue600 = '#265A9B'
  cbColors.deuBlue700 = '#1A4371'
  cbColors.deuBlue800 = '#102E4D'
  cbColors.deuBlue900 = '#0A2136'
  cbColors.ondeuBlue0   = '#121212'
  cbColors.ondeuBlue100 = '#121212'
  cbColors.ondeuBlue200 = '#121212'
  cbColors.ondeuBlue300 = '#121212'
  cbColors.ondeuBlue400 = '#121212'
  cbColors.ondeuBlue500 = '#ffffff'
  cbColors.ondeuBlue600 = '#ffffff'
  cbColors.ondeuBlue700 = '#ffffff'
  cbColors.ondeuBlue800 = '#ffffff'
  cbColors.ondeuBlue900 = '#ffffff'
  cbColors.deuBrown0   = '#F9F0F4'
  cbColors.deuBrown100 = '#E0CCD7'
  cbColors.deuBrown200 = '#C7B6C0'
  cbColors.deuBrown300 = '#B1A0A9'
  cbColors.deuBrown400 = '#93868D'
  cbColors.deuBrown500 = '#877A7E'
  cbColors.deuBrown600 = '#6E6261'
  cbColors.deuBrown700 = '#554942'
  cbColors.deuBrown800 = '#3B3226'
  cbColors.deuBrown900 = '#281F08'
  cbColors.ondeuBrown0   = '#121212'
  cbColors.ondeuBrown100 = '#121212'
  cbColors.ondeuBrown200 = '#121212'
  cbColors.ondeuBrown300 = '#121212'
  cbColors.ondeuBrown400 = '#121212'
  cbColors.ondeuBrown500 = '#121212'
  cbColors.ondeuBrown600 = '#ffffff'
  cbColors.ondeuBrown700 = '#ffffff'
  cbColors.ondeuBrown800 = '#ffffff'
  cbColors.ondeuBrown900 = '#ffffff'
  // Dark colors Deuteranopia colors //
  cbColors.dmdeuYellow0   = '#FAE3B4'
  cbColors.dmdeuYellow100 = '#F8DAA4'
  cbColors.dmdeuYellow200 = '#E2BB7E'
  cbColors.dmdeuYellow300 = '#D5AB5E'
  cbColors.dmdeuYellow400 = '#A5843D'
  cbColors.dmdeuYellow500 = '#866A30'
  cbColors.dmdeuYellow600 = '#685323'
  cbColors.dmdeuYellow700 = '#4B3C17'
  cbColors.dmdeuYellow800 = '#30270C'
  cbColors.dmdeuYellow900 = '#191408'
  cbColors.dmondeuYellow0   = '#121212'
  cbColors.dmondeuYellow100 = '#121212'
  cbColors.dmondeuYellow200 = '#121212'
  cbColors.dmondeuYellow300 = '#121212'
  cbColors.dmondeuYellow400 = '#121212'
  cbColors.dmondeuYellow500 = '#ffffff'
  cbColors.dmondeuYellow600 = '#ffffff'
  cbColors.dmondeuYellow700 = '#ffffff'
  cbColors.dmondeuYellow800 = '#ffffff'
  cbColors.dmondeuYellow900 = '#ffffff'
  cbColors.dmdeuBlue0   = '#DBCFED'
  cbColors.dmdeuBlue100 = '#ABB0DF'
  cbColors.dmdeuBlue200 = '#8495D3'
  cbColors.dmdeuBlue300 = '#6984C7'
  cbColors.dmdeuBlue400 = '#356DBC'
  cbColors.dmdeuBlue500 = '#2B65AF'
  cbColors.dmdeuBlue600 = '#265B9D'
  cbColors.dmdeuBlue700 = '#205089'
  cbColors.dmdeuBlue800 = '#1B4575'
  cbColors.dmdeuBlue900 = '#14375B'
  cbColors.dmondeuBlue0   = '#121212'
  cbColors.dmondeuBlue100 = '#121212'
  cbColors.dmondeuBlue200 = '#121212'
  cbColors.dmondeuBlue300 = '#121212'
  cbColors.dmondeuBlue400 = '#ffffff'
  cbColors.dmondeuBlue500 = '#ffffff'
  cbColors.dmondeuBlue600 = '#ffffff'
  cbColors.dmondeuBlue700 = '#ffffff'
  cbColors.dmondeuBlue800 = '#ffffff'
  cbColors.dmondeuBlue900 = '#ffffff'
  cbColors.dmdeuBrown0   = '#F9F0F4'
  cbColors.dmdeuBrown100 = '#E0CCD7'
  cbColors.dmdeuBrown200 = '#C7B6C0'
  cbColors.dmdeuBrown300 = '#B1A0A9'
  cbColors.dmdeuBrown400 = '#93868D'
  cbColors.dmdeuBrown500 = '#877A7E'
  cbColors.dmdeuBrown600 = '#6E6261'
  cbColors.dmdeuBrown700 = '#554942'
  cbColors.dmdeuBrown800 = '#3B3226'
  cbColors.dmdeuBrown900 = '#281F08'
  cbColors.dmondeuBrown0   = '#121212'
  cbColors.dmondeuBrown100 = '#121212'
  cbColors.dmondeuBrown200 = '#121212'
  cbColors.dmondeuBrown300 = '#121212'
  cbColors.dmondeuBrown400 = '#121212'
  cbColors.dmondeuBrown500 = '#121212'
  cbColors.dmondeuBrown600 = '#ffffff'
  cbColors.dmondeuBrown700 = '#ffffff'
  cbColors.dmondeuBrown800 = '#ffffff'
  cbColors.dmondeuBrown900 = '#ffffff'

  // Protanopia colors //
  cbColors.proYellow0   = '#FBF2DE'
  cbColors.proYellow100 = '#ECE0AC'
  cbColors.proYellow200 = '#DDCC7D'
  cbColors.proYellow300 = '#9C9056'
  cbColors.proYellow400 = '#7F7545'
  cbColors.proYellow500 = '#817741'
  cbColors.proYellow600 = '#665E32'
  cbColors.proYellow700 = '#4F4826'
  cbColors.proYellow800 = '#363118'
  cbColors.proYellow900 = '#25220E'
  cbColors.onproYellow0   = '#121212'
  cbColors.onproYellow100 = '#121212'
  cbColors.onproYellow200 = '#121212'
  cbColors.onproYellow300 = '#121212'
  cbColors.onproYellow400 = '#121212'
  cbColors.onproYellow500 = '#ffffff'
  cbColors.onproYellow600 = '#ffffff'
  cbColors.onproYellow700 = '#ffffff'
  cbColors.onproYellow800 = '#ffffff'
  cbColors.onproYellow900 = '#ffffff'
  cbColors.proBlue0   = '#E7E7FA'
  cbColors.proBlue100 = '#C5CBF6'
  cbColors.proBlue200 = '#A3B2F4'
  cbColors.proBlue300 = '#869EF1'
  cbColors.proBlue400 = '#4F7FF3'
  cbColors.proBlue500 = '#2B67D7'
  cbColors.proBlue600 = '#2253AA'
  cbColors.proBlue700 = '#244B88'
  cbColors.proBlue800 = '#0F2C5B'
  cbColors.proBlue900 = '#081F40'
  cbColors.onproBlue0   = '#121212'
  cbColors.onproBlue100 = '#121212'
  cbColors.onproBlue200 = '#121212'
  cbColors.onproBlue300 = '#121212'
  cbColors.onproBlue400 = '#121212'
  cbColors.onproBlue500 = '#ffffff'
  cbColors.onproBlue600 = '#ffffff'
  cbColors.onproBlue700 = '#ffffff'
  cbColors.onproBlue800 = '#ffffff'
  cbColors.onproBlue900 = '#ffffff'
  cbColors.proBrown0   = '#EEEAEA'
  cbColors.proBrown100 = '#D6D2D2'
  cbColors.proBrown200 = '#BDBBBB'
  cbColors.proBrown300 = '#A6A3A1'
  cbColors.proBrown400 = '#8F8C8B'
  cbColors.proBrown500 = '#747170'
  cbColors.proBrown600 = '#575655'
  cbColors.proBrown700 = '#3F3D3A'
  cbColors.proBrown800 = '#333337'
  cbColors.proBrown900 = '#242113'
  cbColors.onproBrown0   = '#121212'
  cbColors.onproBrown100 = '#121212'
  cbColors.onproBrown200 = '#121212'
  cbColors.onproBrown300 = '#121212'
  cbColors.onproBrown400 = '#121212'
  cbColors.onproBrown500 = '#ffffff'
  cbColors.onproBrown600 = '#ffffff'
  cbColors.onproBrown700 = '#ffffff'
  cbColors.onproBrown800 = '#ffffff'
  cbColors.onproBrown900 = '#ffffff'
  // Dark mode //
  cbColors.dmproYellow0   = '#E8DEBF'
  cbColors.dmproYellow100 = '#E0D39C'
  cbColors.dmproYellow200 = '#D2C177'
  cbColors.dmproYellow300 = '#C3B556'
  cbColors.dmproYellow400 = '#A29548'
  cbColors.dmproYellow500 = '#877D3E'
  cbColors.dmproYellow600 = '#655D29'
  cbColors.dmproYellow700 = '#49421C'
  cbColors.dmproYellow800 = '#332F10'
  cbColors.dmproYellow900 = '#25220E'
  cbColors.dmonproYellow0   = '#121212'
  cbColors.dmonproYellow100 = '#121212'
  cbColors.dmonproYellow200 = '#121212'
  cbColors.dmonproYellow300 = '#121212'
  cbColors.dmonproYellow400 = '#121212'
  cbColors.dmonproYellow500 = '#ffffff'
  cbColors.dmonproYellow600 = '#ffffff'
  cbColors.dmonproYellow700 = '#ffffff'
  cbColors.dmonproYellow800 = '#ffffff'
  cbColors.dmonproYellow900 = '#ffffff'
  cbColors.dmproBlue0   = '#D2D2E7'
  cbColors.dmproBlue100 = '#AEB5D8'
  cbColors.dmproBlue200 = '#939ED1'
  cbColors.dmproBlue300 = '#7A88C1'
  cbColors.dmproBlue400 = '#6878B4'
  cbColors.dmproBlue500 = '#5C6FB7'
  cbColors.dmproBlue600 = '#4B5E9D'
  cbColors.dmproBlue700 = '#445897'
  cbColors.dmproBlue800 = '#344983'
  cbColors.dmproBlue900 = '#1A356C'
  cbColors.dmonproBlue0   = '#121212'
  cbColors.dmonproBlue100 = '#121212'
  cbColors.dmonproBlue200 = '#121212'
  cbColors.dmonproBlue300 = '#121212'
  cbColors.dmonproBlue400 = '#121212'
  cbColors.dmonproBlue500 = '#ffffff'
  cbColors.dmonproBlue600 = '#ffffff'
  cbColors.dmonproBlue700 = '#ffffff'
  cbColors.dmonproBlue800 = '#ffffff'
  cbColors.dmonproBlue900 = '#ffffff'
  cbColors.dmproBrown0   = '#D6D3D3'
  cbColors.dmproBrown100 = '#B7B3B5'
  cbColors.dmproBrown200 = '#A4A19D'
  cbColors.dmproBrown300 = '#8B8887'
  cbColors.dmproBrown400 = '#727067'
  cbColors.dmproBrown500 = '#696660'
  cbColors.dmproBrown600 = '#605D56'
  cbColors.dmproBrown700 = '#55524B'
  cbColors.dmproBrown800 = '#49463E'
  cbColors.dmproBrown900 = '#3A382D'
  cbColors.dmonproBrown0   = '#121212'
  cbColors.dmonproBrown100 = '#121212'
  cbColors.dmonproBrown200 = '#121212'
  cbColors.dmonproBrown300 = '#121212'
  cbColors.dmonproBrown400 = '#ffffff'
  cbColors.dmonproBrown500 = '#ffffff'
  cbColors.dmonproBrown600 = '#ffffff'
  cbColors.dmonproBrown700 = '#ffffff'
  cbColors.dmonproBrown800 = '#ffffff'
  cbColors.dmonproBrown900 = '#ffffff'

  var commonObject = new Object();
  commonObject.web  = ['red','maroon','orange','yellow','olive','lime','green','aqua','teal','blue','navy','fuchsia','purple']

  $('input[name=cb-mode]').click(function() {
    if ($(this).val() == 'tritanopia' || $(this).val() == 'deuteranopia' || $(this).val() == 'protanopia' ) {
      resetCBColors()
      var orginalprimaryName = primaryName.split('-')[0];
      var orginalsecondaryName = secondaryName.split('-')[0];
      var orginaltertiaryName = tertiaryName.split('-')[0];
      converttoCBColors(window.primary500,'primary')
      converttoCBColors(window.secondary500,'secondary')
      converttoCBColors(window.tertiary500,'tertiary')
    }
    if ($(this).val() == 'none') {
      resetCBColors()
    }
  });

   function resetCBColors() {
     var orginalprimaryName   = primaryName.split('-')[0];
     var orginalsecondaryName = secondaryName.split('-')[0];
     var orginaltertiaryName  = tertiaryName.split('-')[0];
     resetCBModes('primary',orginalprimaryName)
     resetCBModes('secondary',orginalsecondaryName)
     resetCBModes('tertiary',orginaltertiaryName)
   }


    // step 1.a  find out the closest html color //
    function converttoCBColors(color,theme) {
     // get the closest color to the primary 500 color //
      if (color.indexOf('rgb') > 0) {
        var color = rgb2hex(rgb);
      }
      color = color.replace('#','')
      //  var type = $('input[name=cb-mode]:checked').val();
      var newBase = closestColor(color,'web',theme)
      //  updatetoCB('primary',cbBase)
    }

  // Step 1.b find out the colorest html color //
  function closestColor(hex, array, theme) {
    var closestcolor;
    var closesttName
    var array = commonObject[array]
    var smallest = 500;
    var i = 0;
    while (i < array.length ) {
      var colorName  = array[i];
      var cbColor    = webColors[colorName];
      if (chroma.distance(hex, cbColor)<smallest) {
          smallest  = chroma.distance(hex, cbColor);
          closestcbcolor = cbColor
          closestName = colorName
      }
      i++
    }
    var type = $('input[name=cb-mode]:checked').val();
    if (type === 'protanopia' ) {
      protanopia(closestName, theme)
    } else if ( type === 'deuteranopia' ) {
      deuteranopia(closestName, theme)
    } else if ( type === 'tritanopia' ) {
      tritanopia(closestName, theme)
    } else if ( type === 'none' ) {
      var newColor = hex2rgb('#' + color)
    }
  }
  // step 1.c. identify what is the color blind shade for the given color ///
  function tritanopia(closestName, theme) {
    if (closestName == 'red' || closestName == 'maroon' || closestName == 'orange' ) {
      var newBase = 'cbtRed'
    } else if (closestName == 'yellow' || closestName == 'olive' || closestName == 'lime' || closestName == 'green' || closestName == 'aqua'  || closestName == 'teal' || closestName == 'blue'   || closestName == 'navy') {
      var newBase = 'cbtTeal'
    } else {
      var newBase = 'cbtPlum'
    }
    updatetoCB(theme,newBase)
  }

  function protanopia(closestName, theme) {
    if (closestName == 'red' || closestName == 'maroon' || closestName == 'orange' ) {
      var newBase = 'proBrown'
    } else if (closestName == 'fuchsia' || closestName == 'purple' || closestName == 'lime' || closestName == 'green' || closestName == 'aqua'  || closestName == 'teal' || closestName == 'blue'   || closestName == 'navy') {
      var newBase = 'proBlue'
    } else {
      var newBase = 'proYellow'
    }
    updatetoCB(theme,newBase)
  }

  function deuteranopia(closestName, theme) {
    if (closestName == 'red' || closestName == 'maroon' || closestName == 'orange' ) {
      var newBase = 'deuBrown'
    } else if (closestName == 'fuchsia' || closestName == 'purple' || closestName == 'lime' || closestName == 'green' || closestName == 'aqua'  || closestName == 'teal' || closestName == 'blue'   || closestName == 'navy') {
      var newBase = 'deuBlue'
    } else {
      var newBase = 'deuYellow'
    }
    updatetoCB(theme,newBase)
  }

  // step 1.d. update the theme colors to the new color blind friendly colors //
  function updatetoCB(theme,cbBase) {
    var i = 0;
    var shade;
    while(i < 10) {
      shade = i * 100;
      var newColor  = cbBase + shade
      window[theme + shade] = cbColors[newColor];
      document.querySelector(':root').style.setProperty('--' + theme + '-' + shade, window[theme + shade]);
      document.querySelector(':root').style.setProperty('--on-' + theme + '-' + shade, window['on' + theme + shade]);
      document.querySelector(':root').style.setProperty('--dm-' + theme + '-' + shade, window['dm' + theme + shade]);
      document.querySelector(':root').style.setProperty('--dm-on-' + theme + '-' + shade, window['dmon' + theme + shade]);
      i++
    }
    if (theme == 'primary') {
      var primaryShade = primaryName.split('-')[1];
      primary  = cbColors[cbBase + primaryShade]
      onPrimary =  cbColors['on' + cbBase + primaryShade]
      document.querySelector(':root').style.setProperty('--primary', primary);
      document.querySelector(':root').style.setProperty('--on-primary', onPrimary );
      var bgScale = chroma.scale(['#FFFFFF',rgb2hex(primary)]).correctLightness(true).colors(5);
      primaryHalf    = bgScale[1]
      primaryQuarter = bgScale[2]
      document.querySelector(':root').style.setProperty('--primaryHalf', primaryHalf );
      document.querySelector(':root').style.setProperty('--primaryQuarter', primaryQuarter );
      var bgScale = chroma.scale([rgb2hex(window.primary900),'#000000']).correctLightness(true).colors(5);
      primaryDarkBG          = bgScale[2]
      secondaryDarkBG        = bgScale[3]
    }
    if (theme == 'secondary') {
      var secondaryShade = secondaryName.split('-')[1];
      secondary  = cbColors[cbBase + secondaryShade ]
      onSecondary =  cbColors['on' + cbBase + secondaryShade ]
      document.querySelector(':root').style.setProperty('--secondary', secondary);
      document.querySelector(':root').style.setProperty('--on-secondary', onSecondary );
    }
    if (theme == 'tertiary') {
      var tertiaryShade = tertiaryName.split('-')[1];
      tertiary  = cbColors[cbBase + tertiaryShade ]
      onTertiary =  cbColors['on' + cbBase + tertiaryShade ]
      document.querySelector(':root').style.setProperty('--tertiary', tertiary);
      document.querySelector(':root').style.setProperty('--on-tertiary', onTertiary );
    }
    if (cbBase.indexOf('Brown') > 0 || cbBase.indexOf('Yellow') > 0 || cbBase.indexOf('Red') > 0 ) {
      if (backgroundPrimaryName == 'primaryDarkBG') {
        document.querySelector(':root').style.setProperty('--background', 'var(--nearblack)' );
        document.querySelector(':root').style.setProperty('--background-secondary', 'var(--black)' );
      }
    }

  }



  function resetCBModes(theme, originalName) {
    setThemeShades(theme, originalName)
    if (theme == 'primary') {
      var primaryShade = primaryName.split('-')[1];
      primary                 = $('#' + activeTheme + ' .lightmode .default-primary').css('backgroundColor');
      onPrimary               = $('#' + activeTheme + ' .lightmode .default-primary').css('color');
      document.querySelector(':root').style.setProperty('--primary', primary);
      document.querySelector(':root').style.setProperty('--on-primary', onPrimary );
      var bgScale = chroma.scale(['#FFFFFF',rgb2hex(primary)]).correctLightness(true).colors(5);
      primaryHalf    = bgScale[1]
      primaryQuarter = bgScale[2]
      document.querySelector(':root').style.setProperty('--primaryHalf', primaryHalf );
      document.querySelector(':root').style.setProperty('--primaryQuarter', primaryQuarter );
      var bgScale = chroma.scale([rgb2hex(window.primary900),'#000000']).correctLightness(true).colors(5);
      primaryDarkBG          = bgScale[2]
      secondaryDarkBG        = bgScale[3]
    }
    if (theme == 'secondary') {
      var secondaryShade = secondaryName.split('-')[1];
      secondary                = $('#' + activeTheme + ' .lightmode .default-secondary').css('backgroundColor');
      onSecondary              = $('#' + activeTheme + ' .lightmode .default-secondary').css('color');
      document.querySelector(':root').style.setProperty('--secondary', secondary);
      document.querySelector(':root').style.setProperty('--on-secondary', onSecondary );
    }
    if (theme == 'tertiary') {
      var tertiaryShade = tertiaryName.split('-')[1];
      tertiary                = $('#' + activeTheme + ' .lightmode .default-tertiary').css('backgroundColor');
      onTertiary              = $('#' + activeTheme + ' .lightmode .default-tertiary').css('color');
      document.querySelector(':root').style.setProperty('--tertiary', tertiary);
      document.querySelector(':root').style.setProperty('--on-tertiary', onTertiary );
    }
    if (backgroundPrimaryName == 'primaryDarkBG') {
      document.querySelector(':root').style.setProperty('--background', 'var(--primaryDarkBG)' );
      document.querySelector(':root').style.setProperty('--background-secondary', 'var(--secondaryDarkBG)' );
    }


  }

  function modifyThemeCB(mode){
    var type = $('input[name=cb-mode]:checked').val();
    var primaryId      = $('#' + primaryName.split('-')[0] + '-' + mode + ' .color-block.prime').attr('id').split('-')[2];
    var primeColor     = $('#' + primaryName.split('-')[0] + '-' + mode + ' .color-block.prime .Hex').css('backgroundColor')
    var primeColor  = rgb2hex(primeColor );
    var primeColor  = primeColor.replace('#','')
    var newPrime = convertCB(primeColor,  type)
    addtoTheme('primaryCB', rgb2hex(newPrime))
    var secondaryId    = $('#' + secondaryName.split('-')[0] + '-' + mode + ' .color-block.prime').attr('id').split('-')[2];
    var secondaryColor = $('#' + secondaryName.split('-')[0] + '-' + mode + ' .color-block.prime .Hex').css('backgroundColor');
    var secondaryColor  = rgb2hex(secondaryColor );
    var secondaryColor  = secondaryColor.replace('#','')
    var newSecondary = convertCB(secondaryColor,  type)
    addtoTheme('secondaryCB', rgb2hex(newSecondary))
    var tertiaryId     = $('#' + tertiaryName.split('-')[0] + '-' + mode +  ' .color-block.prime').attr('id').split('-')[2];
    var tertiaryColor  = $('#' + tertiaryName.split('-')[0] + '-' + mode +  ' .color-block.prime .Hex').css('backgroundColor')
    var tertiaryColor  = rgb2hex(tertiaryColor);
    var tertiaryColor  = tertiaryColor.replace('#','')
    var newTertiary = convertCB(tertiaryColor,  type)
    addtoTheme('tertiaryCB',  rgb2hex(tertiaryColor))


    $('#cb-colors .Hex').each(function(){
      var name = $(this).attr('name')
      var className = $(this).attr('class').replace('Hex','').replace(/\s/g, '');
      if (name == 'white-bg' || name == 'nearblack-bg') {

      } else {
        var colorName  = $(this).attr('name').split('-')[0];
        var themeType;
        if ( name.split('-')[0] == primaryName.split('-')[0] ){
          themeType = 'primaryCB'
        } else if ( name.split('-')[0] == secondaryName.split('-')[0] ){
          themeType = 'secondaryCB'
        } else {
          themeType = 'tertiaryCB'
        }
        var shade = name.split('-')[1]

          var newColor   = $('#' + themeType + '-light-' + shade + ' .Hex').css('backgroundColor')
          var newOnColor = $('#' + themeType + '-light-' + shade + ' .Hex').css('color')


        $('#mcb-colors .' + className).css('background', newColor)
      }
    });

  }

 function clearThemeCBShades() {
   $('#primaryCB-light').prev('div').remove();
   $('#primaryCB-light').remove();
   $('#primaryCB-dark').remove();
   $('#secondaryCB-light').prev('div').remove();
   $('#secondaryCB-light').remove();
   $('#secondaryCB-dark').remove();
   $('#tertiaryCB-light').prev('div').remove();
   $('#tertiaryCB-light').remove();
   $('#tertiaryCB-dark').remove();
 }


   // make adjustments //
   function adjustments(colorClass, mode) {
      // usually the colors that have the color with the last black text or first light text have to be lightened or darkened to meet the contrast ratio of 4:5:1 //
      // if the last color with dark text has bee adjusted - adjust all the other colors around it //
      // if the first color with light text has bee adjusted - adjust all the other colors around it //
      if (mode == 'light') {
        textColor = 'rgb(255,255,255)'
      } else {
        textColor = 'rgba(255,255,255,'+dmOpacity+')'
      }
      var lightTextArray = [];
      $(document).find('#' + colorClass + '-'+ mode +'-100').nextAll('.color-block').each(function () {
        var blockColor = $(this).find('.Hex').css('color').replace(/\s/g, '');
        var shade = $(this).attr('id')
        if (blockColor == textColor) {
          lightTextArray.push(shade);
        }
      });
      var firstLight = lightTextArray[0];
      var lastDark   = firstLight.split('-')[2]

      if ($('#' + firstLight).hasClass('darkened') || $('#' + firstLight ).hasClass('blacken') || $('#' + firstLight ).hasClass('lightened')) {
         var startedShade = firstLight.split('-')[2];
         var currentColor = rgb2hex($('#' + firstLight).find('.Hex').css('backgroundColor'))
         var endColor     = rgb2hex($('#' + colorClass + '-'+ mode +'-900').find('.Hex').css('backgroundColor'))
         // adjust all the colors after //
         $('#' + firstLight).nextAll().attr('class','color-block');
         var nextAll = $('#' + firstLight).nextAll()
         nextAll.each(function () {
           var name = $(this).attr('id');
           var theme = name.split('-')[0];
           var blockshade = parseInt(name.split('-')[2]);
           var level = ((blockshade - startedShade)/(900-startedShade + 100));
           //var colorRGB = $.xcolor.gradientlevel(currentColor , endColor , level, 100).getHex();
           var colorRGB = 'rgb(' + chroma.mix(currentColor, endColor, level).rgb() + ')';
           $(this).removeClass('darkened').removeClass('lightened').removeClass('darkened')
           if (mode == 'light') {
             checkContrast(colorClass+'-'+mode+'-'+blockshade, colorRGB, mode)
           } else {
             checkDM(colorClass+'-'+ mode +'-' + blockshade, colorRGB )
           }

          });

        }

        if ($('#' + lastDark).hasClass('darkened') || $('#' + firstLight ).hasClass('blacken') || $('#' + firstLight ).hasClass('lightened')) {
           var startedShade = lastDark.split('-')[2];
           var currentColor = rgb2hex($('#' + firstLight).find('.Hex').css('backgroundColor'))
           var endColor = rgb2hex($('#' + colorClass + '-'+ mode +'-900').find('.Hex').css('backgroundColor'))
            // adjust all the colors before //
            var endColor = rgb2hex($('#' + colorClass + '-'+ mode +'-0').find('.Hex').css('backgroundColor'))
            $(this).prevAll().attr('class','color-block');
            $(this).prevAll('.color-block').each(function () {
              var name = $(this).attr('id');
              var theme = name.split('-')[0];
              var blockshade = parseInt(name.split('-')[2]);
              var level = ((startedShade - blockshade)/(startedShade + 100));
              var colorRGB = 'rgb(' + chroma.mix(currentColor, endColor, level).rgb() + ')';
              $(this).removeClass('darkened').removeClass('lightened').removeClass('darkened')
              if (mode == 'light') {
                checkContrast(colorClass+'-'+mode+'-'+blockshade, colorRGB, mode)
              } else {
                checkDM(colorClass+'-'+ mode +'-' + blockshade, colorRGB )
              }
            });
          }

    }




///  Step 2 - Build theme //



    // Make the 'To Color' in gradient1 wcag compliant to the 'From Color' //
    $(document).on('click', '#themeGradient1-a .colorGroup li', function() {
      var onColor1 = $('#themeGradient1-a button .Hex').css('color');
      $('#themeGradient1-b .colorGroup .Hex').each(function() {
        var onColor2 = $(this).css('color');

        if (onColor1 == onColor2) {
          $(this).parent().parent().css('display','block')
        } else {
          $(this).parent().parent().css('display','none')
        }
      });
    });

    // Make the 'To Color' in gradient2 wcag compliant to the 'From Color' //
    $(document).on('click', '#themeGradient2-a .colorGroup li', function() {
      var onColor1 = $('#themeGradient2-a button .Hex').css('color');
      $('#themeGradient2-b .colorGroup .Hex').each(function() {
        var onColor2 = $(this).css('color');

        if (onColor1 == onColor2) {
          $(this).parent().parent().css('display','block')
        } else {
          $(this).parent().parent().css('display','none')
        }
      });
    });

    // Create sample gradeint for gradient 1 //
    $(document).on('click', '#themeGradient1-b .colorGroup li', function() {
      var color1 = $('#themeGradient1-a button .Hex').css('backgroundColor');
      var color2 = $(this).find('.Hex').css('backgroundColor');
      var onColor = $(this).find('.Hex').css('color');
      $('#themeGradient1-sample').css('background','linear-gradient(135deg, '+ color1 +' 0%, '+ color2 +' 100%)');
      $('#themeGradient1-sample').css('color', onColor);
      $('#themeGradient1-sample').parent().addClass('active')
    });

    // Create sample gradeint for gradient2 //
    $(document).on('click', '#themeGradient2-b .colorGroup li', function() {
      var color1 = $('#themeGradient2-a button .Hex').css('backgroundColor');
      var color2 = $(this).find('.Hex').css('backgroundColor');
      var onColor = $(this).find('.Hex').css('color');
      $('#themeGradient2-sample').css('background','linear-gradient(135deg, '+ color1 +' 0%, '+ color2 +' 100%)');
      $('#themeGradient2-sample').css('color', onColor);
      $('#themeGradient2-sample').parent().addClass('active')
    });


    // Create sample gradeint for gradient2 //
    $(document).on('click', '#icons.colorGroup li', function() {
      var color1 = $('#iconsbutton .Hex').css('backgroundColor');
      $('#themeIcon-sample svg path').css('fill', color1);
      $('#themeIcon-sample').parent().addClass('active')
    });

    // Create sample gradeint for gradient2 //
    $(document).on('click', '#icons.colorGroup li', function() {
      var color1 = $('#iconsbutton .Hex').css('backgroundColor');
      $('#themeIcon-sample svg path').css('fill', color1);
      $('#themeIcon-sample').parent().addClass('active')
    });


    $(document).on('click', '#themeGradientText-b .colorGroup li', function() {
      var color1 = $('#themeGradientText-a button .Hex').css('backgroundColor');
      var color2 = $(this).find('.Hex').css('backgroundColor');
      $('#themeGradientText-sample .gradiemt-title').css({
         'background' : color1,
         'background' : '-webkit-linear-gradient(15deg, ' +color1+ ', ' + color2+ ')',
         '-webkit-background-clip' : 'text',
         '-webkit-text-fill-color' : 'transparent'
      });
      $('#themeGradientText-sample').parent().addClass('active')
    });

  function updateNames(name, themeName) {
    var i = 0;
    while (i < 10) {
      var shade = i * 100
      // update an divs with the class of a color //
      $('#themeGradient1-a').find('.'  + name + '-' + shade).removeClass(name + '-' + shade).addClass(themeName + '-' + shade).attr('name',themeName + '-' + shade);
      $('#themeGradient1-b').find('.'  + name + '-' + shade).removeClass(name + '-' + shade).addClass(themeName + '-' + shade).attr('name',themeName + '-' + shade);
      $('#themeGradient2-a').find('.'  + name + '-' + shade).removeClass(name + '-' + shade).addClass(themeName + '-' + shade).attr('name',themeName + '-' + shade);
      $('#themeGradient2-b').find('.'  + name + '-' + shade).removeClass(name + '-' + shade).addClass(themeName + '-' + shade).attr('name',themeName + '-' + shade);
      $('#themeButtons').find('.'  + name + '-' + shade).removeClass(name + '-' + shade).addClass(themeName + '-' + shade).attr('name',themeName + '-' + shade);
      $('#themeIcons').find('.'  + name + '-' + shade).removeClass(name + '-' + shade).addClass(themeName + '-' + shade).attr('name',themeName + '-' + shade);
      $('#themeGradientText-a').find('.'  + name + '-' + shade).removeClass(name + '-' + shade).addClass(themeName + '-' + shade).attr('name',themeName + '-' + shade);
      $('#themeGradientText-b ').find('.'  + name + '-' + shade).removeClass(name + '-' + shade).addClass(themeName + '-' + shade).attr('name',themeName + '-' + shade);
      $('#themeAccent').find('.'  + name + '-' + shade).removeClass(name + '-' + shade).addClass(themeName + '-' + shade).attr('name',themeName + '-' + shade);
      // update an divs with the name of a color //
      $('#themeGradient1-a').find('.Hex[name=' + name + '-' + shade + ']').attr('name',themeName + '-' + shade);
      $('#themeGradient1-b').find('.Hex[name=' + name + '-' + shade + ']').attr('name',themeName + '-' + shade);
      $('#themeGradient2-a').find('.Hex[name=' + name + '-' + shade + ']').attr('name',themeName + '-' + shade);
      $('#themeGradient2-b').find('.Hex[name=' + name + '-' + shade + ']').attr('name',themeName + '-' + shade);
      $('#themeButtons').find('.Hex[name='  + name + '-' + shade + ']').attr('name',themeName + '-' + shade);
      $('#themeIcons').find('.Hex[name='  + name + '-' + shade + ']').attr('name',themeName + '-' + shade);
      $('#themeGradientText-a').find('.Hex[name='  + name + '-' + shade + ']').attr('name',themeName + '-' + shade);
      $('#themeGradientText-b ').find('.Hex[name='  + name + '-' + shade+ ']').attr('name',themeName + '-' + shade);
      $('#themeAccent').find('.Hex[name='  + name + '-' + shade + ']').attr('name',themeName + '-' + shade);
      i++
    }
  }

  function buildDMTextgradient() {
    testdmbackground        = hextoRGBArray(dmbackgroundPrimary);
    // dm text gradient //
    var dmtextgradient1aName   = textGradientName.split('-')[0] + '-200';
    var dmtextgradient1bName   = textGradientName.split('-')[0] + '-300';
    dmgradientTexta       = window[dmtextgradient1aName.replace('-','')]
    dmgradientTextb       = window[dmtextgradient1bName.replace('-','')]
    // text to make sure the header has the a wcagContrast:1 contrast ration  if not update the values by reducing the shades//
    var testTextB = rgb2hex(dmgradientTextb);
    testTextB = hextoRGBArray(testTextB);
    var contrastRation = contrast(testTextB, testdmbackground)
    if (contrast < wcagContrast) {
      var dmtextgradient1aName = textgradientName.split('-')[0] + '-100';
      var dmtextgradient1bName = textgradientName.split('-')[0] + '-200';
      dmgradientTexta     = window[dmtextgradient1aName.replace('-','')]
      dmgradientTextb     = window[dmtextgradient1bName.replace('-','')]
    }
    dmtextgradientName         = dmtextgradient1aName + ',' + dmtextgradient1bName;
    return(dmtextgradientName )
  }

  function buildDMIcons() {
    testdmbackground        = hextoRGBArray(dmbackgroundPrimary);
    // test colors for dark mode icons which must have a 3.1 contrast to the selected dark mode background  //
    var dmIconShade            = getDMShade(iconsName ,testdmbackground, 3.1)
    dmiconsName                = iconsName.split('-')[0] + '-' + dmIconShade
    dmicons                     = window[dmiconsName.replace('-','')]
  }


  $('#addTheme').click(function() {
    var error = 'false';
    var missing = []
    primary                 = $('#themePrimary button .Hex').css('backgroundColor');
    primaryName             = $('#themePrimary button .Hex').attr('name')
    onPrimary               = $('#themePrimary button .Hex').css('color');
    setThemeShades('primary', primaryName.split('-')[0]);
    secondary               = $('#themeSecondary button .Hex').css('backgroundColor');
    secondaryName           = $('#themeSecondary button .Hex').attr('name')
    onSecondary             = $('#themeSecondary button .Hex').css('color');
    setThemeShades('secondary', secondaryName.split('-')[0]);
    tertiary                = $('#themeTertiary button .Hex').css('backgroundColor');
    tertiaryName            = $('#themeTertiary button .Hex').attr('name')
    onTertiary              = $('#themeTertiary button .Hex').css('color');
    setThemeShades('tertiary', tertiaryName.split('-')[0]);
    updateNames(primaryName.split('-')[0], 'primary')
    updateNames(secondaryName.split('-')[0] , 'secondary')
    updateNames(tertiaryName.split('-')[0] , 'tertiary')
    backgroundPrimary       = $('#themeBackground button .Hex').eq(0).css('backgroundColor');
    onbackgroundPrimary     = $('#themeBackground button .Hex').eq(0).css('color');
    backgroundPrimaryName   = $('#themeBackground button .Hex').eq(0).attr('name');
    backgroundSecondary     = $('#themeBackground button .Hex').eq(1).css('backgroundColor');
    if (backgroundPrimaryName == 'white-bg') {
      backgroundSecondaryName = 'gray-050-bg';
      onbackgroundSecondary   = '#121212';
      colorDrop               = $(document).find('#primary-light-100 .Hex').css('backgroundColor')
      borderColor             = 'rgba(0,0,0,.15)'
      chip                    = 'rgba(0,0,0,.25)'
      onchip                  =  black
      groupButtonBG           =  inputDefault
      lineColor               = 'rgba(0,0,0,0.05)'
    } else if (backgroundPrimaryName == 'primary-half-bg') {
      backgroundSecondaryName = 'primary-quarter-bg'
      onbackgroundSecondary   = '#121212';
      colorDrop               = $(document).find('#primary-light-100 .Hex').css('backgroundColor')
      borderColor             = 'rgba(0,0,0,.15)'
      chip                    = 'rgba(0,0,0,.25)'
      onchip                  =  black
      groupButtonBG           =  inputDefault
      lineColor               = 'rgba(0,0,0,0.05)'
    } else if(backgroundPrimaryName == 'primaryDarkBG') {
      backgroundSecondaryName = 'secondaryDarkBG'
      onbackgroundSecondary   = '#ffffff';
      colorDrop               = '#000000'
      borderColor             = 'rgba(255,255,255,.15)'
      chip                    = 'rgba(255,255,255,.25)'
      onchip                  =  white
      groupButtonBG           =  'rgba(255,255,255,.1)';
      lineColor               = 'rgba(255,255,255,0.05)'
    } else {
      backgroundSecondaryName = 'black-bg'
      onbackgroundSecondary   = '#ffffff';
      colorDrop               = '#000000'
      borderColor             = 'rgba(255,255,255,.15)'
      chip                    = 'rgba(255,255,255,.25)'
      onchip                  =  white
      groupButtonBG           =  'rgba(255,255,255,.1)';
      lineColor               = 'rgba(255,255,255,0.05)'
    }
    document.querySelector(':root').style.setProperty('--chip' , chip);
    document.querySelector(':root').style.setProperty('--on-chip' , onchip);
    document.querySelector(':root').style.setProperty('--color-drop' , colorDrop );
    document.querySelector(':root').style.setProperty('--border' , borderColor );
    document.querySelector(':root').style.setProperty('--chart-lineColor' , lineColor);
    document.querySelector(':root').style.setProperty('--groupButtonBG' , groupButtonBG );
    document.querySelector(':root').style.setProperty('--primary' , primary);
    document.querySelector(':root').style.setProperty('--secondary' , secondary);
    document.querySelector(':root').style.setProperty('--tertiary' , tertiary);
    document.querySelector(':root').style.setProperty('--on-primary' , onPrimary);
    document.querySelector(':root').style.setProperty('--on-secondary' , onSecondary);
    document.querySelector(':root').style.setProperty('--on-tertiary' , onTertiary);
    gradient1aName             = $('#themeGradient1-a button .Hex').attr('name')
    gradient1a                 = window[gradient1aName.replace('-','')]
    ongradient1a               = window['on' + gradient1aName.replace('-','')]
    gradient1bName             = $('#themeGradient1-b button .Hex').attr('name')
    gradient2b                 = window[gradient1bName.replace('-','')]
    themeGradient1a(gradient1aName, gradient1a, ongradient1a)
    themeGradient1b(gradient1bName, gradient2b, ongradient1a)
    gradient2aName             = $('#themeGradient2-a button .Hex').attr('name')
    gradient2a                 = window[gradient1aName.replace('-','')]
    ongradient2a               = window['on' + gradient2aName]
    gradient2bName             = $('#themeGradient2-b button .Hex').attr('name')
    gradient2b                 = window[gradient2bName.replace('-','')]
    themeGradient2a(gradient2aName, gradient2a, ongradient2a)
    themeGradient2b(gradient2bName, gradient2b, ongradient2a)
    gradientTextaName         = $('#themeGradientText-a button .Hex').attr('name')
    gradientTextbName         = $('#themeGradientText-b button .Hex').attr('name')
    textGradientName          = gradientTextaName  + ',' + gradientTextbName
    gradientTexta             = window[gradientTextaName.replace('-','')]
    gradientTextb             = window[gradientTextbName.replace('-','')]
    dmtextGradientName        = buildDMTextgradient();
    accentName                = $('#themeAccent button .Hex').attr('name')
    accent                    = window[accentName.replace('-','')]
    themeAccent(accentName , accent)
    if ($('#themePrimary').hasClass('no-selection')) {
        missing.push('Primary Theme Color')
    }
    if ($('#themeSecondary').hasClass('no-selection')) {
        var error = 'true'
        missing.push('Secondary Theme Color')
    }
    if ($('#themeTertiary').hasClass('no-selection')) {
        var error = 'true'
        missing.push('Teritary Theme Color')
    }
    if ($('#themeAccent').hasClass('no-selection')) {
        var error = 'true'
        missing.push('Accent Theme Color')
    }
    // DARK MODE //
    dmprimaryName           = $('#themePrimary button .Hex').attr('name');
    dmprimary               = $(document).find('#' + dmprimaryName.split('-')[0] + '-dark-' + dmprimaryName.split('-')[1] + ' .Hex').css('backgroundColor');
    dmonprimary             = $(document).find('#' + dmprimaryName.split('-')[0] + '-dark-' + dmprimaryName.split('-')[1] + ' .Hex').css('color');
    dmsecondaryName         = $('#themeSecondary button .Hex').attr('name');
    dmsecondary             = $(document).find('#' + dmsecondaryName.split('-')[0] + '-dark-' + dmsecondaryName.split('-')[1] + ' .Hex').css('backgroundColor');
    dmonsecondary           = $(document).find('#' + dmsecondaryName.split('-')[0] + '-dark-' + dmsecondaryName.split('-')[1] + ' .Hex').css('color');
    dmtertiaryName          = $('#themeTertiary button .Hex').attr('name');
    dmtertiary              = window[dmtertiaryName]
    dmontertiary            = window['on'+ dmtertiaryName]
    dmtooltip               = elevationShades(dmbackgroundPrimary, .06)
    document.querySelector(':root').style.setProperty('--dmtooltip' , dmtooltip);
    buildDMIcons()
    // dm text gradient //

    // set dark mode of addiional items //


    if (error == 'true') {
      alert(missing)
    } else {

      if ($('.theme-name').css('display') == 'none') {
        activeTheme = system + 'Default';
        themeName   = 'Default'
        var themeDropdown = activeTheme + '-theme';

        $('#createdDefault').clone().insertAfter('#createdDefault').attr('id', activeTheme ).addClass(system + '-theme')
        $('#composer .content').removeClass('active')
        $(document).find('#' + system + 'Default').addClass('active');
        $('.nav-item').removeClass('disabled');
        $('.step2').removeClass('disabled');
        $('#assign-intro').addClass('active')
        $('#default.theme-container').parents('li').clone().appendTo('#selectedTheme ul').find('.theme-container').attr('id', system + 'Default-theme').addClass('system-theme ' + system + '-theme')
        $(document).find('.theme-container').removeClass('active');
        $(document).find('#' + system + 'Default-theme').addClass('active');
      } else {
        themeName = $('#themeName').val();
        alert(themeName)
        themeName = themeName.replace(/\s/g, '');
        activeTheme = system + themeName;
        var themeDropdown = activeTheme + '-theme';
        // create page for theme //
        $('#createdDefault').clone().insertAfter('#createdDefault').attr('id', activeTheme).addClass(system + '-theme')
        $(document).find('#' + activeTheme + ' h5').eq(0).html(themeName);
        //$(document).find('#' + activeTheme + ' [class*="default-"]').each(function() {
        //  var className = $(this).attr('class');
        //  className = className.replace('default-', theme + '-');
        //  $(this).attr('class', className)
        //});
        // add link to theme //
        $('.sub-section').removeClass('active');
        $('.sub-section.themeGenerator').clone().insertAfter('.sub-section.themeGenerator').attr('name', activeTheme).html(themeName).addClass('system-theme active');
        // add theme to dropdown theme selector //
        $('#default.theme-container').parents('li').clone().appendTo('#selectedTheme ul').find('.theme-container').attr('id', themeDropdown).addClass('system-theme ' + system + '-theme')
      //  $(document).find('#' + activeTheme  + '-theme [class*="default-"]').each(function() {
        //  var className = $(this).attr('class');
        //  className = className.replace('default', theme );
        //  $(this).attr('class', className)
      //  });
        $(document).find('.sub-section[name='+activeTheme +']').addClass('active');
        $('.main.active .content').removeClass('active');
        $('#' + activeTheme ).addClass('active')
      }
      var buttonColor = $('#buttons button .Hex').attr('name');
      $(document).find('#' + system + ' .default-button-color').html(buttonColor);
      var iconColor = $('#iconsbutton .Hex').attr('name');
      $(document).find('#' + system + ' .default-icon-color').html(iconColor );
      $(document).find('#' + activeTheme + ' .default-primary').attr('name', $('#themePrimary button .Hex').attr('name')).css({'background': primary, 'color': onPrimary});
      $(document).find('#' + activeTheme + ' .default-secondary').attr('name', $('#themeSecondary button .Hex').attr('name')).css({'background': secondary, 'color': onSecondary});
      $(document).find('#' + activeTheme + ' .default-tertiary').attr('name', tertiaryName).css({'background': tertiary, 'color': onTertiary});
      $(document).find('#' + activeTheme + ' .default-button').attr('name', buttonsName).css({'background': buttons, 'color': onButtons});
      $(document).find('#' + activeTheme + ' .default-icon').attr('name', iconsName ).css({'background': icons, 'color': onIcons});
      $(document).find('#' + activeTheme + ' .default-background').attr('name', $('#themeBackground button .Hex').eq(0).attr('name')).css({'background': backgroundPrimary, 'color': onbackgroundPrimary});
      $(document).find('#' + activeTheme + ' .default-background-secondary').attr('name', $('#themeBackground button .Hex').eq(1).attr('name')).css({'background': backgroundSecondary, 'color': onbackgroundSecondary});
      $(document).find('#' + activeTheme + ' .lightmode .default-gradient-1').attr('name', gradient1aName  + gradient1bName).css({'background': 'linear-gradient(90deg, '+ gradient1a +' 0%, '+ gradient1b +' 100%)', 'color': ongradient1a});
      $(document).find('#' + activeTheme + ' .lightmode .default-gradient-2').attr('name', gradient2aName  + gradient2bName).css({'background': 'linear-gradient(90deg, '+ gradient2a +' 0%, '+ gradient2b +' 100%)', 'color': ongradient2a});
      $(document).find('#' + activeTheme + ' .default-gradient-title').attr('name', textgradient1aName  + textgradient1bName);
      $(document).find('#' + activeTheme + ' .darkmode .default-primary').attr('name', dmprimaryName.split('-')[0] + '-' + dmprimaryName.split('-')[1]).css({'background': dmprimary, 'color': dmonprimary});
      $(document).find('#' + activeTheme + ' .darkmode .default-secondary').attr('name', dmsecondaryName.split('-')[0] + '-' + dmsecondaryName.split('-')[1]).css({'background': dmsecondary, 'color': dmonsecondary });
      $(document).find('#' + activeTheme + ' .darkmode .default-tertiary').attr('name', dmtertiaryName  ).css({'background': dmtertiary, 'color': dmontertiary });
      $(document).find('#' + activeTheme + ' .darkmode .default-button').attr('name', dmbuttonsName).css({'background': dmbuttons, 'color': dmonbuttons  });
      $(document).find('#' + activeTheme + ' .darkmode .default-icon').css({'background': dmiconsName }).css({'background':  dmicons, 'color': dmonicons });
      $(document).find('#' + activeTheme + ' .darkmode .default-background').attr('name', $('#themeDarkmode-BG button .Hex').eq(0).attr('name')).css({'background': dmbackgroundPrimary, 'color': dmonbackgroundPrimary});
      $(document).find('#' + activeTheme + ' .darkmode .default-background-secondary').attr('name', $('#themeDarkmode-BG button .Hex').eq(1).attr('name')).css({'background': dmbackgroundSecondary, 'color': dmonbackgroundSecondary});
      $(document).find('#' + activeTheme + ' .darkmode .default-background-tertiary').attr('name', 'primary-700').css({'background': dmbackgroundTertiary, 'color': dmonbackgroundTertiary});
      $(document).find('#' + activeTheme + ' .darkmode').css({'background': dmbackgroundPrimary, 'color': 'rgba(255, 255, 255, '+dmOpacity+')'});
      $(document).find('#' + activeTheme + ' .darkmode .default-gradient-1').attr('name', dmgradient1Name).css({'background': 'linear-gradient(90deg, '+ dmgradient1a +' 0%, '+ dmgradient1b +' 100%)', 'color': 'rgba(255, 255, 255, '+dmOpacity+')'});
      $(document).find('#' + activeTheme + ' .darkmode .default-gradient-2').attr('name', dmgradient2Name).css({'background': 'linear-gradient(90deg, '+ dmgradient2a +' 0%, '+ dmgradient2b +' 100%)', 'color': 'rgba(255, 255, 255, '+dmOpacity+')'});
      $(document).find('#' + activeTheme + ' .darkmode .default-gradient-title').attr('name', dmtextgradientName  ).css({'background': 'linear-gradient(90deg, '+ dmgradientTexta  +' 0%, '+ dmgradientTextb  +' 100%)', '-webkit-background-clip' : 'text', '-webkit-text-fill-color': 'transparent'});
      $(document).find('#' + themeDropdown +' .default-primary-half').attr('name', $('#themePrimary button .Hex').attr('name')).css({'background': primaryHalf, 'color': '#121212'});
      $(document).find('#' + themeDropdown +' .default-primary-quarter').attr('name', $('#themePrimary button .Hex').attr('name')).css({'background': primaryQuarter, 'color': '#121212'});
      $(document).find('#' + themeDropdown +' .default-primary').attr('name', $('#themePrimary button .Hex').attr('name')).css({'background': primary, 'color': onPrimary});
      $(document).find('#' + themeDropdown +' .default-secondary').attr('name', $('#themeSecondary button .Hex').attr('name')).css({'background': secondary, 'color': onSecondary});
      $('#default.theme-container').parents('li').hide();

      additionalThemeSettings()

    }

});
 function getDMShade(name,background,contrastRation) {
   var testdmColor
   var dmName    = name.split('-')[0];
   var dmShade   = parseInt(name.split('-')[1]);
   if (dmName == 'primary' || dmName == 'secondary' || dmName == 'tertiary' ) {
     var dmColor   = window[dmName + dmShade]
   } else {
     var dmColor   = $(document).find('#' + dmName + '-dark-' + dmShade + ' .Hex').css('backgroundColor');
   }
   // test colors for dark mode which must have the passed contrast Ratio against the dark mode background  //
   testdmColor = rgb2hex(dmColor)
   var testit = hextoRGBArray(testdmColor)
   var i = 0;
  // if (i != 600 || i != 700 )
   while (contrast(testit, background) < contrastRation)  {
     i = i + 100;
     var newShade = dmShade - i ;

     if (dmName == 'primary' || dmName == 'secondary' || dmName == 'tertiary' ) {
       var dmColor   = window[dmName + newShade]
     } else {
       var dmColor   = $(document).find('#' + dmName + '-dark-' + newShade + ' .Hex').css('backgroundColor');
     }
     testdmColor = rgb2hex(dmColor);
     testit = hextoRGBArray(testdmColor);
   }
   return(dmShade - i)
 }


 //// Step 3. Set the rest of the atomic settings /////
 // Grid //
 $("input[type='radio'][name='grid']").click(function() {
     grid = parseInt($(this).val());
     setGrid(grid)
     $(document).find('#' + system + ' .default-grid').html(grid + 'px');
     $('.min1').attr('class','')
     $('.spacing-min').html(44/grid + 'px');
     setSpacing();
 });
 function loadGrid() {
   grid = $(document).find('#' + system + ' .default-grid' ).html();
   document.querySelector(':root').style.setProperty('--spacing-1', grid);
   setSpacing()

 }

 function setSpacing() {
   var gridNum = grid.replace('px','').replace(/\s/g, '');
   $('.spacing-0').html('0px').parent().attr('data-order',0);
   $('.spacing-1').html(gridNum + 'px').parent().attr('data-order',gridNum )
   $('.spacing-2').html(gridNum * 2 + 'px').parent().attr('data-order',gridNum  * 2)
   $('.spacing-3').html(gridNum  * 3 + 'px').parent().attr('data-order',gridNum  * 3)
   $('.spacing-4').html(gridNum  * 4 + 'px').parent().attr('data-order',gridNum  * 4)
   $('.spacing-min').html('44px').parent().attr('data-order',44)
   $('.spacing-5').html(gridNum  * 5 + 'px').parent().attr('data-order',gridNum  * 5)
   $('.spacing-6').html(gridNum  * 6 + 'px').parent().attr('data-order',gridNum  * 6)
   $('.spacing-7').html(gridNum  * 7 + 'px').parent().attr('data-order',gridNum  * 7)
   $('.spacing-8').html(gridNum  * 8  + 'px').parent().attr('data-order',gridNum  * 8)
   $('.spacing-9').html(gridNum  * 9 + 'px').parent().attr('data-order',gridNum  * 9)
   $('.spacing-10').html(gridNum  * 10 + 'px').parent().attr('data-order',gridNum  * 10)
   $('.spacing-half').html(gridNum /2 + 'px').parent().attr('data-order',gridNum /2)
   if (gridNum  = 8) {
      $('.wcag-min').addClass('hidden')
   } else {
     $('.wcag-min').removeClass('hidden')
   }
   sortSpacing();
   minTargetArea()
 }

 function minTargetArea(){
    minTarget = $('#min-target button').html().replace(/\s/g, '');
    var minTargetNum = minTarget.replace('px','').replace(/\s/g, '');
   $('.spacing-min').attr('data-order',minTargetNum).attr('name',minTargetNum/grid).html(minTargetNum + 'px');
   $('.mintarget').each(function() {
     var currentTarget = $(this).find('button').html().replace('px','').replace(/\s/g, '');
     if (currentTarget < minTargetNum  || $(this).hasClass('spacing-min')) {
       $('.mintarget button').html(minTarget)
       $(this).attr('class','dropdown-toggle spacing-min')
     }
   });
   $('.mintarget .dropdown-item').removeClass('hidden');
   $('.mintarget .dropdown-item').each(function() {
     var height = $(this).html().replace('px','').replace(/\s/g, '');
     if (height < minTargetNum) {
       $(this).addClass('.hidden');
     }
     var id = $(this).parent().attr('id')
     document.querySelector(':root').style.setProperty('--id', height);
     var objectName = $(this).parent().attr('name')
     if (objectName) {
       this[objectName] = height
     }
     //$('#' + id + ' button').html(height + 'px')
   })

   // update the root css //
   document.querySelector(':root').style.setProperty('--min-target', minTarget);


 }

 function setGrid(grid) {
   if (grid == 6) {
     var boxWidth = 300;
     var lines = 50
   } else if (grid == 8) {
     var boxWidth = 304;
     var lines = 38
   } else {
     var boxWidth = 300;
     var lines = 30
   }
   $('.gridBox').css('width', boxWidth);
   $('.gridBox').css('height', boxWidth);
   $('.vertical-lines').empty();
   $('.horizontal-lines').empty();

   i = 0;
   while (i < lines) {
     $('.vertical-lines').append('<div class="line-vertical" style="width:'+ grid +'px"></div>');
     $('.horizontal-lines').append('<div class="line-horizontal" style="height:'+ grid +'px"></div>');
     i++
   }

   document.querySelector(':root').style.setProperty('--spacing-1' , grid +'px');
   //setSpacing(grid)
   //setBorder(grid)

 }


 function setBorder(grid) {
   $('#baseRadius').val(grid + 'px')
   $('.radius-0').html('0px');
   $('.radius-1').html(grid + 'px');
   $('.radius-2').html(grid * 2 + 'px');
   $('.radius-3').html(grid * 3 + 'px');
   $('.radius-4').html(grid * 4 + 'px');
   $('.radius-5').html(grid * 5 + 'px');
   $('.radius-6').html(grid * 6 + 'px');
   $('.radius-7').html(grid * 7 + 'px');
   $('.radius-8').html(grid * 8  + 'px');
   $('.radius-9').html(grid * 9 + 'px');
   $('.radius-10').html(grid * 10 + 'px');
   $('.radius-half').html(grid/2 + 'px');
   $('.radius-quarter').html(grid/4 + 'px');
 }

 ///// TYPOGRAPHY ////

 $('.edit-text').click(function() {
   var fontName = $(this).attr('name')
   var capName = capitalizeFirstLetter(fontName)
   $('#fontEdit').modal('show').attr('name',fontName);

   if (fontName == 'display1' || fontName == 'display2' ){
     $('#family-row').hide()
   }  else {

     $('#family-row').show()
   }
   $('#sample-text').html('<div class="new">'+capName+'</div>')
   var spacing = $('#composer').find('.' + fontName).css('letter-spacing');
   var family  = $('#composer').find('.' + fontName).css('font-family');
   var weight  = $('#composer').find('.' + fontName).css('font-weight');
   var lh      = $('#composer').find('.' + fontName).css('line-height');
   var size    = $('#composer').find('.' + fontName).css('font-size');
   lh = Math.floor(parseInt(lh)/parseInt(size)*100) + '%';
   var fontWeight0 = $('#fontWeight-0').val();
   var fontWeight1 = $('#fontWeight-1').val();
   var fontWeight2 = $('#fontWeight-2').val();
   var fontWeight3 = $('#fontWeight-3').val();
   var fontWeight4 = $('#fontWeight-4').val();
   var fontFamily1 = $('#primaryFont').val();
   var fontFamily2 = $('#secondaryFont').val();
   var lineHeight =  $('#Standard-LineHeight').val();
   var smLineHeight = $('#Sm-LineHeight').val()
   $('#sample-text .new').css({
     'font-size': size,
     'font-weight': weight,
     'font-family': family,
     'line-height': lh,
     'letter-spacing': spacing
   })
   $("#text-family button" ).html(family);
   $('#text-family li a').eq(0).html(fontFamily1)
   $('#text-family li a').eq(1).html(fontFamily2)
   $("#text-weight button" ).html(weight);
   $('#text-weight li a').eq(0).html(fontWeight0);
   $('#text-weight li a').eq(1).html(fontWeight1);
   $('#text-weight li a').eq(2).html(fontWeight2);
   $('#text-weight li a').eq(3).html(fontWeight3);
   $('#text-weight li a').eq(4).html(fontWeight4);
   $("#text-line-height button" ).html(lh);
   $('#text-line-height li a').eq(0).html(lineHeight);
   $('#text-line-height li a').eq(1).html(smLineHeight);
   $("#text-letter-spacing-info span" ).html(spacing)
   $("#text-size-info span" ).html(size)
 });


 $('#save-text').click(function() {
   var font = $('#fontEdit').attr('name');
   var system = $('.system.active').attr('id');
   $(document).find('#' + system + ' .default-' + font).addClass('editted');
   var family    = $("#text-family button" ).html();
   var weight    = $("#text-weight button" ).html()
   var lh        = $("#text-line-height button" ).html()
   var spacing   = $("#text-letter-spacing-info span" ).html();
   var size      = $("#text-size-info span" ).html();
   $(document).find('#' + system + 'Default .default-' + font + ' .font-family').html(family);
   $(document).find('#' + system + 'Default .default-' + font + ' .font- weight ').html( weight )
   $(document).find('#' + system + 'Default .default-' + font + ' .font-line-height').html(lh)
   $(document).find('#' + system + 'Default .default-' + font + ' .font-size').html(size)
   $(document).find('#' + system + 'Default .default-' + font + ' .character-spacing').html(spacing);

   if (font == 'display1' || font == 'display2') {
     $('h1.' + font).css({
       'font-family': family,
       'font-weight': weight,
        'line-height': lh,
        'letter-spacing': spacing,
        'font-size': size
     });
   } else {
     $('.' + font).css({
       'font-family': family,
       'font-weight': weight,
       'line-height': lh,
       'letter-spacing': spacing,
       'font-size': size
     });
   }
   $('#fontEdit').modal('hide');
   document.querySelector(':root').style.setProperty('--' + font+'-weight', weight);
   updateTextStyles()
 });


 $("#max-hue" ).slider({
   min: 0,
   max: 360,
   value: 0,
   slide: function( event, ui ) {
     updateHue(ui.value)
   }
 });

 function updateHue(hue) {
   var color = $(document).find('.adjusting').css('backgroundColor');
   var adjustingShade = $(document).find('.adjusting').parent('.color-block').attr('id').match(/\d+/)
   var primeShade = $(document).find('.hueModify').find('.prime').attr('id').match(/\d+/)
   var colorName  = $(document).find('.hueModify').find('.prime').attr('id').replace(primeShade,"");
   var primeColor = $(document).find('.hueModify').find('.prime .Hex').css('backgroundColor');
   var primeHex   = rgb2hex(primeColor);
   var endHex     = rgb2hex(color);
   var primeHue   = chroma(primeHex).hcl()[0];
   endHue =  hue
   $('#newHue').html(hue)

   var endRGB = chroma.hcl(endHue,chroma(endHex).hcl()[1],chroma(endHex).hcl()[2]).rgb();
   var endHex = chroma.hcl(endHue,chroma(endHex).hcl()[1],chroma(endHex).hcl()[2]).hex();
   $(document).find('#' + colorName + adjustingShade).find('.Hex').css('background','rgb(' + endRGB + ')');
   $(document).find('#' + colorName + adjustingShade).find('.Color span').html(endHex);
   if (adjustingShade == 900) {
     var i = parseInt(primeShade) + 100
     var hueChange = (endHue - primeHue) / ((900 - primeShade) / 100)
     while (i < 900) {
       var iRGB = $(document).find('#' + colorName + i.toString()).find('.Hex').css('backgroundColor')
       var iHex = rgb2hex(iRGB);
       var iHCL = chroma(iRGB).hcl();
       var newHue = (((i - primeShade)/100) * hueChange) + primeHue
       $('#newHue').html(newHue.toFixed(2));
       var newColor = chroma.hcl(newHue,iHCL[1],iHCL[2]).rgb();
       var newHex = chroma.hcl(newHue,iHCL[1],iHCL[2]).hex();
       $(document).find('#' + colorName + i.toString()).find('.Hex').css('background','rgb(' + newColor + ')');
       $(document).find('#' + colorName + i.toString()).find('.Color span').html(newHex);
       if (getContrast(newHex.toString()) == '#ffffff') {
         text_color = [255,255,255]; // white
       } else {
         text_color = darkTextArray; // black
       }
       // get the contrast ration of the color against the suggested text color //
       var contrastRation = contrast(newColor, text_color); // 1.0736196319018405
       // based on the mode light or dark - run the appropriate check to see if the color and on color meet the contrats ratio of wcagContrast or if the shade needs to be lighted or darked //
       var darkName = colorName.replace('light','dark')
       //var newRGB = mixColors('#000000',newHex,.15);
       //checkDM(darkName + i, newRGB)
       checkContrast(colorName + i, newHex, 'light')
       i = i + 100
     }
   } else {
     var i = parseInt(primeShade) - 100
     var hueChange = (primeHue - endHue) / (primeShade / 100)
     while (i >= 0 && i < primeShade){
       var iRGB = $(document).find('#' + colorName + i.toString()).find('.Hex').css('backgroundColor')
       var iHex = rgb2hex(iRGB);
       var iHCL = chroma(iRGB).hcl();
       if (i == 0) {
         var newHue = hue
       } else {
         var newHue = (hueChange * (i/100)) + hue
       }
       $('#newHue').html(newHue.toFixed(2));
       var newColor = chroma.hcl(newHue,iHCL[1],iHCL[2]).rgb();
       var newHex = chroma.hcl(newHue,iHCL[1],iHCL[2]).hex();
       $(document).find('#' + colorName + i.toString()).find('.Hex').css('background','rgb(' + newColor + ')');
       $(document).find('#' + colorName + i.toString()).find('.Color span').html(newHex);
       if (getContrast(newHex.toString()) == '#ffffff') {
         text_color = [255,255,255]; // white
       } else {
         text_color = darkTextArray; // black
       }
       // get the contrast ration of the color against the suggested text color //
       var contrastRation = contrast(newColor, text_color); // 1.0736196319018405
       // based on the mode light or dark - run the appropriate check to see if the color and on color meet the contrats ratio of wcagContrast or if the shade needs to be lighted or darked //
       var darkName = colorName.replace('light','dark')
       var newRGB = mixColors('#000000',newHex,.15);
       //checkDM(darkName + i, newRGB)
       checkContrast(colorName + i, newHex, 'light')
       i = i - 100
     }
   }
 }



 $( "#text-letter-spacing" ).slider({
   min: -10,
   max: 10,
   step: .05, //
   value: 2,
   slide: function( event, ui ) {
     $('#text-letter-spacing-info span').html( ui.value + 'px');
     updateText();
   }
 });

 $( "#text-size" ).slider({
   min: 0,
   max: 800,
   step: .25, //
   value: 500,
   slide: function( event, ui ) {
     var font = $('#fontEdit').attr('name');
     var base = $('#baseFont').val().replace('px','');
     var fontSize = base * ui.value/100;
     $('#text-size-info span').html(fontSize  + 'px');
     $('#text-percent-info span').html(ui.value + '%');
      updateText();
   }
 });

 $( "#typography-change" ).slider({
   create: function() {
     handle.text( $( this ).slider({
       value: 42
     }) );
   },
   slide: function( event, ui ) {
     handle.text( ui.value );
     $('#typography-change').attr('name', ui.value/100);
     var system = $('.system.active').attr('id');
     $(document).find('#' + system + ' .headerChange').html( ui.value/100);
     document.querySelector(':root').style.setProperty('--headerChange', ui.value/100);
   }
 });
 ///// ELEVATIONS /////
  $( "#change" ).slider({
    create: function() {
      handle.text( $( this ).slider({
        value: 6
      }) );
    },
    slide: function( event, ui ) {
      handle.text( ui.value );
      $('#change').attr('name', ui.value/100)
      document.querySelector(':root').style.setProperty('--elevation-change', ui.value/100);
      var system = $('.system.active').attr('id');
      $(document).find('#' + system + ' .default-elevation-change').html(ui.value/100)
    }
  });

  $( "#horizontal" ).slider({
    create: function() {
      handle.text( $( this ).slider({
        value: 6
      }) );
    },
    slide: function( event, ui ) {
      handle.text( ui.value );
      $( "#horizontal" ).attr('name', ui.value + 'px')
      document.querySelector(':root').style.setProperty('--elevation-horizontal', ui.value  + 'px');
      var system = $('.system.active').attr('id');
      $(document).find('#' + system + ' .default-elevation-horizontal').html(ui.value + 'px')
      updateElevation()
    }
  });

  $( "#vertical" ).slider({
    create: function() {
      handle.text( $( this ).slider({
        value: 6
      }) );
    },
    slide: function( event, ui ) {
      handle.text( ui.value );
      $( "#vertical" ).attr('name', ui.value + 'px')
      document.querySelector(':root').style.setProperty('--elevation-vertical', ui.value + 'px' );
      var system = $('.system.active').attr('id');
      $(document).find('#' + system + ' .default-elevation-veritcal').html(ui.value + 'px')
      updateElevation()
    }
  });

  $( "#blur" ).slider({
    create: function() {
      handle.text( $( this ).slider({
        value: 6
      }) );
    },
    slide: function( event, ui ) {
      handle.text( ui.value );
      $( "#blur" ).attr('name', ui.value + 'px')
      document.querySelector(':root').style.setProperty('--elevation-blur', ui.value + 'px' );
      var system = $('.system.active').attr('id');
      $(document).find('#' + system + ' .default-elevation-blur').html(ui.value+ 'px')
      updateElevation()
    }
  });

  $( "#spread" ).slider({
    create: function() {
      handle.text( $( this ).slider({
        value: 6
      }) );
    },
    slide: function( event, ui ) {
      handle.text( ui.value );
      $( "#spread" ).attr('name', ui.value + 'px')
      document.querySelector(':root').style.setProperty('--elevation-spread', ui.value + 'px');
      var system = $('.system.active').attr('id');
      $(document).find('#' + system + ' .default-elevation-spread').html(ui.value+ 'px')
      updateElevation()
    }
  });

  $( "#base-blur" ).slider({
    create: function() {
      handle.text( $( this ).slider({
        value: 6
      }) );
    },
    slide: function( event, ui ) {
      handle.text( ui.value );
      $( "#base-blur" ).attr('name', ui.value + 'px')
      document.querySelector(':root').style.setProperty('--base-elevation-blur', ui.value + 'px' );
      var system = $('.system.active').attr('id');
      $(document).find('#' + system + ' .default-base-blur').html(ui.value  + 'px')
      updateElevation()
    }
  });

  $( "#base-spread" ).slider({
    create: function() {
      handle.text( $( this ).slider({
        value: 6
      }) );
    },
    slide: function( event, ui ) {
      handle.text( ui.value );
      $( "#base-spread" ).attr('name', ui.value + 'px')
      document.querySelector(':root').style.setProperty('--base-elevation-spread', ui.value + 'px');
      var system = $('.system.active').attr('id');
      $(document).find('#' + system + ' .default-base-spread').html(ui.value + 'px')
      updateElevation()
    }
  });

  $( "#opacity" ).slider({
    create: function() {
      handle.text( $( this ).slider({
        value: 6
      }) );
    },
    slide: function( event, ui ) {
      handle.text( ui.value );
      var color = $('#elevation-rgb').val();
      if (color.indexOf("rgb") >= 0) {
        color = rgb2hex(color)
      }
      var r = hexToRgb(color).r;
      var g = hexToRgb(color).g;
      var b = hexToRgb(color).b;
      var elevationColor = 'rgba('+r +','+ g +',' + b + ',.1)'
      $('#opacity').attr('name',ui.value/100)
      document.querySelector(':root').style.setProperty('--elevation-opacity', ui.value + '%');
      var system = $('.system.active').attr('id');
      $(document).find('#' + system + ' .default-elevation-opacity').html(ui.value + '%')
      updateElevation()
    }
  });

  $( "#base-opacity" ).slider({
    create: function() {
      handle.text( $( this ).slider({
        value: 6
      }) );
    },
    slide: function( event, ui ) {
      handle.text( ui.value );
      var color = $('#elevation-rgb').val();
      if (color.indexOf("rgb") >= 0) {
        color = rgb2hex(color)
      }
      var r = hexToRgb(color).r;
      var g = hexToRgb(color).g;
      var b = hexToRgb(color).b;
      var elevationColor = 'rgba('+r +','+ g +',' + b + ',.1)'
      $('#base-opacity').attr('name',ui.value/100)
      document.querySelector(':root').style.setProperty('--base-elevation-opacity', ui.value + '%');
      var system = $('.system.active').attr('id');
      $(document).find('#' + system + ' .default-base-opacity').html(ui.value + '%')
      updateElevation()
    }
  });

  // color of elevation drop shadow //
  $('#elevation-rgb').blur(function() {
    var color = $(this).val();
    var rgbArray = hextoRGBArray(color);
    document.querySelector(':root').style.setProperty('--elevation-rgb', rgbArray);
    var system = $('.system.active').attr('id');
    $(document).find('#' + system + ' .default-elevation-rgb').html(rgbArray);
    updateElevation();
  });


  function calculateElevations(color) {
     elevation1 = $.xcolor.opacity(color, 'white', 0.05);
     document.querySelector(':root').style.setProperty('--elevation-bg-1', elevation1);

     elevation2 = $.xcolor.opacity(color, 'white', 0.07);
     document.querySelector(':root').style.setProperty('--elevation-bg-2', elevation2);

     elevation3 = $.xcolor.opacity(color, 'white', 0.08);
     document.querySelector(':root').style.setProperty('--elevation-bg-3', elevation3);

     elevation4 = $.xcolor.opacity(color, 'white', 0.09);
     document.querySelector(':root').style.setProperty('--elevation-bg-4', elevation4);

     elevation5 = $.xcolor.opacity(color, 'white', 0.11);
     document.querySelector(':root').style.setProperty('--elevation-bg-5', elevation5);

     elevation6 = $.xcolor.opacity(color, 'white', 0.12);
     document.querySelector(':root').style.setProperty('--elevation-bg-6', elevation6);

     elevation7 = $.xcolor.opacity(color, 'white', 0.14);
     document.querySelector(':root').style.setProperty('--elevation-bg-7', elevation7);

     elevation8 = $.xcolor.opacity(color, 'white', 0.15);
     document.querySelector(':root').style.setProperty('--elevation-bg-8', elevation8);

     elevation9 = $.xcolor.opacity(color, 'white', 0.16);
     document.querySelector(':root').style.setProperty('--elevation-bg-9', elevation9);

 }



 // update elevations //
 function updateElevation() {
   var system = $('.system.active').attr('id')
   $(document).find('#' + system + ' .default-elevation-rgb').html($('#elevation-rgb').val());
   $(document).find('#' + system + ' .default-elevation-change').html($('#elevation-change').attr('name'));
   $(document).find('#' + system + ' .default-base-blur').html($('#base-blur').attr('name'));
   $(document).find('#' + system + ' .default-base-spread').html($('#base-spread').attr('name'));
   $(document).find('#' + system + ' .default-base-opacity').html($('#base-opacity').attr('name'));
   $(document).find('#' + system + ' .default-elevation-horizontal').html($('#elevation-horizontal').attr('name'));
   $(document).find('#' + system + ' .default-elevation-veritcal').html($('#elevation-veritcal').attr('name'));
   $(document).find('#' + system + ' .default-elevation-spread').html($('#elevation-spread').attr('name'));
   $(document).find('#' + system + ' .default-elevation-blur').html($('#elevation-blur').attr('name'));
   $(document).find('#' + system + ' .default-elevation-opacity').html($('#elevation-opacity').attr('name'));
 }

 ////  BEVELS  ///
 $( "#bevel-change" ).slider({
   create: function() {
     handle.text( $( this ).slider({
       value: 24
     }) );
   },
   slide: function( event, ui ) {
     handle.text( ui.value );
     $( "#bevel-change" ).attr('name', ui.value/100)
     document.querySelector(':root').style.setProperty('--bevel-change', ui.value/100);
     var system = $('.system.active').attr('id');
     $(document).find('#' + system + ' .default-bevel-change').html(ui.value/100)
   }
 });

 $( "#bevel-horizontal" ).slider({
   create: function() {
     handle.text( $( this ).slider({
       value: 6
     }) );
   },
   slide: function( event, ui ) {
     handle.text( ui.value );
     $( "#bevel-horizontal" ).attr('name', ui.value + 'px')
     document.querySelector(':root').style.setProperty('--bevel-horizontal', ui.value  + 'px');
     // update system //
     $(document).find('#' + system + ' .default-bevel-horizontal').html(ui.value + 'px');
   }
 });

 $( "#bevel-vertical" ).slider({
   create: function() {
     handle.text( $( this ).slider({
       value: 6
     }) );
   },
   slide: function( event, ui ) {
     handle.text( ui.value );
     $( "#bevel-vertical" ).attr('name', ui.value + 'px')
     document.querySelector(':root').style.setProperty('--bevel-vertical', ui.value + 'px' );
     // update system //
     $(document).find('#' + system + ' .default-bevel-vertical').html(ui.value + 'px')
     updateBevels()
   }
 });

 $( "#bevel-blur" ).slider({
   create: function() {
     handle.text( $( this ).slider({
       value: 6
     }) );
   },
   slide: function( event, ui ) {
     handle.text( ui.value );
     $( "#bevel-blur" ).attr('name', ui.value + 'px')
     document.querySelector(':root').style.setProperty('--bevel-blur', ui.value + 'px' );
     var system = $('.system.active').attr('id');
     $(document).find('#' + system + ' .default-bevel-blur').html(ui.value + 'px')
     updateBevels()
   }
 });

 $( "#bevel-spread" ).slider({
   create: function() {
     handle.text( $( this ).slider({
       value: 2
     }) );
   },
   slide: function( event, ui ) {
     handle.text( ui.value );
    $( "#bevel-spread" ).attr('name', ui.value + 'px')
     document.querySelector(':root').style.setProperty('--bevel-spread', ui.value + 'px');
     $(document).find('#' + system + ' .default-bevel-spread').html(ui.value + 'px')
     updateBevels()
   }
 });



 $( "#bevel-light-opacity" ).slider({
   create: function() {
     handle.text( $( this ).slider({
       value: 30
     }) );
   },
   slide: function( event, ui ) {
     handle.text( ui.value );
     var color = '#FFFFFF';

     var r = hexToRgb(color).r;
     var g = hexToRgb(color).g;
     var b = hexToRgb(color).b;
     var elevationColor = 'rgba('+r +','+ g +',' + b + ',.1)'
     $( "#bevel-light-opacity" ).attr('name',ui.value/100)
     document.querySelector(':root').style.setProperty('--bevel-light-opacity', ui.value + '%');
     $(document).find('#' + system + ' .default-bevel-light-opacity').html(ui.value + '%')
   }
 });

 $( "#bevel-dark-opacity" ).slider({
   create: function() {
     handle.text( $( this ).slider({
       value: 5
     }) );
   },
   slide: function( event, ui ) {
     handle.text( ui.value );
     var color = '#000000';
     var r = hexToRgb(color).r;
     var g = hexToRgb(color).g;
     var b = hexToRgb(color).b;
     var elevationColor = 'rgba('+r +','+ g +',' + b + ',.1)'
     $( "#bevel-dark-opacity" ).attr('name',ui.value/100)
     document.querySelector(':root').style.setProperty('--bevel-dark-opacity', ui.value + '%');
     $(document).find('#' + system + ' .default-bevel-dark-opacity').html(ui.value + '%')
     updateBevels()
   }
 });

 function updateBevels() {
   $(document).find('#' + system + ' .default-bevel-horizontal').html($('#bevel-horizontal').val());
   $(document).find('#' + system + ' .default-reverse-horizontal').html('-'+ $('#bevel-horizontal').attr('name'));
   var horz = 0 - parseInt($('#bevel-horizontal').attr('name'));
   $(document).find('#' + system + ' .default-bevel-vertical').html(horz);
   var vert = 0 - parseInt($('#bevel-vertical').attr('name'));
   $(document).find('#' + system + ' .default-reverse-vertical').html(vert);
   $(document).find('#' + system + ' .default-bevel-spread').html($('#bevel-spread').attr('name'));
   $(document).find('#' + system + ' .default-bevel-blur').html($('#bevel-blur').attr('name'));
   $(document).find('#' + system + ' .default-bevel-light-opacity').html($('#bevel-light-opacity').attr('name'));
   $(document).find('#' + system + ' .default-bevel-dark-opacity').html($('#bevel-dark-opacity').attr('name'));
   $(document).find('#' + system + ' .default-bevel-change').html($('#bevel-change').attr('name'));
 }

 ////  Inverse BEVELS  ///
 $( "#inbevel-change" ).slider({
   create: function() {
     handle.text( $( this ).slider({
       value: 24
     }) );
   },
   slide: function( event, ui ) {
     handle.text( ui.value );
     $( "#inbevel-change" ).attr('name', ui.value/100)
     document.querySelector(':root').style.setProperty('--inbevel-change', ui.value/100);
     var system = $('.system.active').attr('id');
     $(document).find('#' + system + ' .default-inbevel-change').html(ui.value/100)

     inbevelchange = ui.value/100
   }
 });

 $( "#inbevel-horizontal" ).slider({
   create: function() {
     handle.text( $( this ).slider({
       value: 6
     }) );
   },
   slide: function( event, ui ) {
     handle.text( ui.value );
     $( "#inbevel-horizontal" ).attr('name', ui.value + 'px')
     document.querySelector(':root').style.setProperty('--inbevel-horizontal', ui.value  + 'px');
     // update system //
     $(document).find('#' + system + ' .default-inbevel-horizontal').html(ui.value + 'px');
     inbevelhorizontal = ui.value + 'px'
   }
 });

 $( "#inbevel-vertical" ).slider({
   create: function() {
     handle.text( $( this ).slider({
       value: 6
     }) );
   },
   slide: function( event, ui ) {
     handle.text( ui.value );
     $( "#inbevel-vertical" ).attr('name', ui.value + 'px')
     document.querySelector(':root').style.setProperty('--inbevel-vertical', ui.value + 'px' );
     // update system //
     $(document).find('#' + system + ' .default-inbevel-vertical').html(ui.value + 'px')
     inbevelvertical = ui.value + 'px'

   }
 });

 $( "#inbevel-blur" ).slider({
   create: function() {
     handle.text( $( this ).slider({
       value: 6
     }) );
   },
   slide: function( event, ui ) {
     handle.text( ui.value );
     $( "#bevel-blur" ).attr('name', ui.value + 'px')
     document.querySelector(':root').style.setProperty('--inbevel-blur', ui.value + 'px' );
     $(document).find('#' + system + ' .default-inbevel-blur').html(ui.value + 'px')
     inbevelBlur = ui.value + 'px'
   }
 });

 $( "#inbevel-spread" ).slider({
   create: function() {
     handle.text( $( this ).slider({
       value: 2
     }) );
   },
   slide: function( event, ui ) {
     handle.text( ui.value );
    $( "#bevel-spread" ).attr('name', ui.value + 'px')
     document.querySelector(':root').style.setProperty('--inbevel-spread', ui.value + 'px');
     $(document).find('#' + system + ' .default-inbevel-spread').html(ui.value + 'px')
     inbevelSpread = ui.value + 'px'
   }
 });

 $( "#inbevel-dark-opacity" ).slider({
   create: function() {
     handle.text( $( this ).slider({
       value: 5
     }) );
   },
   slide: function( event, ui ) {
     handle.text( ui.value );
     var color = '#000000';
     var r = hexToRgb(color).r;
     var g = hexToRgb(color).g;
     var b = hexToRgb(color).b;
     var elevationColor = 'rgba('+r +','+ g +',' + b + ',.1)'
     $( "#bevel-dark-opacity" ).attr('name',ui.value/100)
     document.querySelector(':root').style.setProperty('--inbevel-dark-opacity', ui.value + '%');
     $(document).find('#' + system + ' .default-inbevel-dark-opacity').html(ui.value + '%')
     inbeveldarkOpacity = ui.value + '%'
   }
 });



 /// MIN WIDTH ///
 $('#min-width').on('keypress',function(e) {
     if(e.which == 13) {
       var min = $(this).val();
       min = min.replace(/[^\d.-]/g, '');
       document.querySelector(':root').style.setProperty('--button-minwidth', min + 'px');
       var system = $(document).find('.system.active').attr('id');
       $(document).find('#' + system + ' .default-button-min-width').html(min+ 'px')
     }
 });

 var grid = parseInt($("input[type='radio'][name='grid']:checked").val());
 var defaultWidth = grid  * 10;

 $( "#minWidth" ).slider({
   create: function() {
     handle.text( $( this ).slider({
       value: defaultWidth
     }) );
   },
   slide: function( event, ui ) {
     handle.text( ui.value );
     document.querySelector(':root').style.setProperty('--button-minwidth', ui.value + 'px');
     var system = $('.system.active').attr('id');
     $(document).find('#' + system + ' .default-button-minwidth').html(ui.value + 'px')
   }
 });

///  LINES ////
 $('#baseRadius').on('keypress',function(e) {
     if(e.which == 13) {
       var radius = $(this).val();
       radius = radius.replace(/[^\d.-]/g, '');
       document.querySelector(':root').style.setProperty('--radius-1', radius  + 'px');
       $('#radius-half').html(radius/2 + 'px');
       $('#radius-1').html(radius + 'px');
       $('#radius-2').html(radius * 2 + 'px');
       $('#radius-3').html(radius * 3 + 'px');
       $('#radius-4').html(radius * 4 + 'px');
       $('#radius-5').html(radius * 5 + 'px');
       $('#radius-6').html(radius * 6 + 'px');
       $('#radius-7').html(radius * 7 + 'px');
       $('#radius-8').html(radius * 8 + 'px');
       $('#radius-9').html(radius * 9 + 'px');
       $('#radius-10').html(radius * 10 + 'px');
     }
 });

 /// STATES ////
 $('.stateColor').focus(function() {
    var color = $(this).val();
    $(this).attr('name', color)
 });

 $('.stateColor').blur(function() {
    var color = $(this).val();
    var onenter = $(this).attr('name');
    if (color != onenter) {
      var name = $(this).attr('id').replace('Color','')
      buildStates(color, name);
    }
 });

 function loadStates() {
    $('#States .stateColor:not(:disabled)').each(function() {
      var color = $(this).val();
      var name = $(this).attr('id').replace('Color','')
      buildStates(color, name);
    });
 }


   function buildStates(color, name) {
     addtoTheme(name, color)
     var system = $('.system.active').attr('id');
     var background = $(document).find('#' + system + 'Default .lightmode .default-background' ).css('backgroundColor');
     var colorName = $(document).find('#buildColor #' + name + '-light .prime').attr('id')
     var dmonBackground = $(document).find('#' + system + 'Default .darkmode .default-background' ).css('backgroundColor');

     // test colors which must have a 3.1 contrast to the selected light mode background  //
     var color = rgb2hex(color);
     color  = hextoRGBArray(color);
     stateRGB = color;
     var testbackground = rgb2hex(background);
     testbackground = hextoRGBArray(background);
     var i = colorName.split('-')[2];
     var contrastRation = contrast(color, testbackground)
     while (contrastRation < 3.1)  {
       if (colorName == 'nearblack-bg' || 'primary-900-bg') {
         i = i - 100;
       } else {
         i = i + 100;
       }
       stateRGB = color;
       var color   = $(document).find('#' + colorName.split('-')[0] + '-light-' + (colorName.split('-')[2] - i) + ' .Hex').css('backgroundColor');
       var onColor = $(document).find('#' + colorName.split('-')[0] + '-light-' + (colorName.split('-')[2] - i) + ' .Hex').css('color');
       var color = rgb2hex(color);
       color = hextoRGBArray(color);
       contrastRation = contrast(color, testbackground)
     }
     if (i < 0) {
       i = 0
     }
     colorName = colorName.split('-')[0] + colorName.split('-')[2] - i;
     color = 'rgb(' + color + ')'
     checkContrast(name, color, 'light') ;
     var stateColor   = $(document).find('#'+ name + '-light-' + i + ' .Hex').css('backgroundColor');
     var stateRGB = stateColor.replace('rgb(','').replace(')','')
     var onstateColor = $(document).find('#'+ name + '-light-' + i).css('color');

     var dmstateColor   = $(document).find('#'+ name + '-dark-400 .Hex').css('backgroundColor');
     var dmstateRGB = dmstateColor.replace('rgb(','').replace(')','')
     var dmonstateColor = $(document).find('#'+ name + '-dark-400 .Hex').css('color');
     // test colors which must have a 3.1 contrast to the selected dark mode background  //
     var testdmbackground = rgb2hex( dmonBackground);
     testdmbackground = hextoRGBArray( dmonBackground);
     var dmstateColor = rgb2hex(dmstateColor);
     dmstateColor  = hextoRGBArray(dmstateColor);
     i = 400
     dmstateRGB = dmstateColor
     while (contrast(dmstateColor, testdmbackground) < 3.1)  {
       i = i - 100;
       var dmstateColor   = $(document).find('#' + name + '-dark-' + i + ' .Hex').css('backgroundColor');
       var dmonstateColor = $(document).find('#' + name + '-dark-' + i + ' .Hex').css('color');
       var dmstateColor = rgb2hex(dmstateColor);
       dmstateRGB = hextoRGBArray(dmstateColor);
     }
     dmstateColor = 'rgb(' + dmstateRGB  + ')'
     if (name == 'info') {
       info     =  stateColor
       oninfo   =  onstateColor
       dminfo   =  dmstateColor
       ondminfo =  dmonstateColor
     } else if (name == 'warning'){
       warning     =  stateColor
       onwarning   =  onstateColor
       dmwarning   =  dmstateColor
       ondmwarning =  dmonstateColor
     } else if (name == 'success'){
       success     =  stateColor
       onsuccess   =  onstateColor
       dmsuccess   =  dmstateColor
       ondmsuccess =  dmonstateColor
     } else if (name == 'danger'){
       danger     =  stateColor
       ondanger   =  onstateColor
       dmdanger   =  dmstateColor
       ondmdanger =  dmonstateColor
     }
     $(document).find('#' + system + ' .default-' + name).html(stateColor)
     $(document).find('#' + system + ' .default-on' + name).html(onstateColor)
     $(document).find('#' + system + ' .default-dm' + name).html(dmstateColor)
     $(document).find('#' + system + ' .default-dmon' + name).html(dmonstateColor)
     document.querySelector(':root').style.setProperty('--'+ name, stateRGB);
     document.querySelector(':root').style.setProperty('--on-'+ name, onstateColor);
     document.querySelector(':root').style.setProperty('--dm-'+ name, dmstateRGB);
     document.querySelector(':root').style.setProperty('--dm-on-'+ name, dmonstateColor);
     $(document).find('#dm-'+ name + 'Color').val(rgb2hex(dmstateColor));
     $(document).find('#' + name + 'Color').val(rgb2hex(stateColor));
     //  $(document).find('#' + name + 'Color').val(stateColor);
     $(document).find('#'+ name + '-light').remove();
     $(document).find('#'+ name + '-dark').remove();
     $(document).find('.subtitle1[name="' + name + '"').parents('.title-area').remove();
     $(document).find('.subtitle1[name="' + name + '"').remove();
     //$(document).find('.subtitle1[name="' + name + '"').parents('.title-area').remove();
   }

function upperCase(string) {
  newString = string[0].toUpperCase() + string.slice(1);
  return newString
}

//// OTHE ATOMS ///

$('.assign .dropdown-item').click(function(e) {
  var name = $(this).parents('.dropdown').attr('name')
  var update = $(this).html();
  var onUpdate = $(this).css('color');
  var className = $(this).attr('class');
  className = className.replace("dropdown-item ", "");
  var id = $(this).parents('.assign').attr('id');
  $(this).parents('.dropdown').find('.dropdown-toggle').html(update);
  $(this).parents('.dropdown').find('.dropdown-toggle').attr('class', 'dropdown-toggle show ' + className)
  document.querySelector(':root').style.setProperty('--' + id , update);
  document.querySelector(':root').style.setProperty('--on-' + id , onUpdate);
  $(document).find('#' + system + ' .default-' + id).html(update)

  var objectName = $(this).parents('.assign').attr('name').replace(/\s/g, '')

  if (objectName) {
    // find object
    var fn = window[objectName];
    // is object a function?
    if (typeof fn === "function") {
      console.log('funtion:' + objectName)
      fn();
    }
    if (objectName == 'minTargetArea') {
      minTargetArea()
    }
    this[objectName] = update
    console.log(objectName + ': ' + update)
    console.log('--'+ id+ ': ' + update)
  }

 });

 $('.assign-container .dropdown-item').click(function(e) {
   var name = $(this).parents('.dropdown').attr('name')
   var update = $(this).attr('name');
   var id = $(this).parents('.assign').attr('id');
   $(this).parents('.dropdown').find('.dropdown-toggle').html(update);

   $('.'+name+'-container .chart-bevel').attr('class','chart-bevel').addClass(update)

   var system = $(document).find('.system.active').attr('id');
   $(document).find('#' + system + ' .default-' + id).html(update)
   if (name == 'donut') {
     donutCharts('light')
   } else if (name == 'pie') {
     pieCharts('light')
   } else {
     progressCharts('light')
   }

  });

$('.assign-style .dropdown-item').click(function() {
  var update = $(this).html();
  var name = $(this).attr('name');
  var id = $(this).parents('.assign-style').attr('id');
  if (id.indexOf("text") >= 0) {
    var core = id.replace('-text','')
    var fontFamily = $("#FontStyles ." + name).css('font-family');
    var fontWeight = $("#FontStyles ." + name).css('font-weight');
    var fontSize = $("#FontStyles ." + name).css('font-size');
    var lineHeight = $("#FontStyles ." + name).css('line-height');
    var letterSpacing = $("#FontStyles ." + name).css('letter-spacing');
    var textTransform = $("#FontStyles ." + name).css('text-transform');
    var style = fontWeight + ' ' + fontSize + '/' + lineHeight + ' ' + fontFamily + ' , sans-serif'
    document.querySelector(':root').style.setProperty('--' + core + '-font', style);
    document.querySelector(':root').style.setProperty('--' + core + '-character-spacing' , letterSpacing );
    document.querySelector(':root').style.setProperty('--' + core + '-transform' , textTransform );
    $(this).parents('.dropdown').find('.dropdown-toggle').attr('class', 'dropdown-toggle show ' + name)
  } else if (id.indexOf("bevel") >= 0) {
    var core = id.replace('-bevel','')
    var boxshadow = $("#Bevels").find("." + name).css('box-shadow');
    document.querySelector(':root').style.setProperty('--' + core + '-bevel', boxshadow);
  } else if (id.indexOf("elevation") >= 0) {
    var core = id.replace('-elevation','')
    if (name.indexOf("reverse") >= 0) {
      var boxshadow = $("#ReverseElevations").find("." + name).css('box-shadow');
    } else {
      var boxshadow = $("#Elevations").find("." + name).css('box-shadow');
    }
    document.querySelector(':root').style.setProperty('--' + core + '-elevation', boxshadow);
  }
  $(this).parents('.dropdown').find('.dropdown-toggle').attr('name', name);
  $(this).parents('.dropdown').find('.dropdown-toggle').html(update);
  var system = $(document).find('.system.active').attr('id');
  $(document).find('#' + system + ' .default-' + id).html(name)

 });

///  SPACING ///
$('#guides').click(function() {
  if ($(this).hasClass('on')) {
    $(this).removeClass('on')
    $('.top-spacing').removeClass('active');
    $('.bottom-spacing').removeClass('active')
  } else {
    $(this).addClass('on')
    $('.top-spacing').addClass('active')
    $('.bottom-spacing').addClass('active')
  }
});

function loadMinTarget() {
  minTarget = $(document).find('#' + system + ' .default-minTarget' ).html();
  $('#min-target button').html(minTarget)
  document.querySelector(':root').style.setProperty('--min-target', minTarget);
  minTargetArea()
}

function loadInput() {
  inputOverlay   = $(document).find('#' + system + ' .default-input-overlay' ).html();
  $(document).find('#surfaceBG button .Hex').css('background',inputOverlay )
  buildInput();
}

function loadBorder() {
  border   = $(document).find('#' + system + ' .default-border-1' ).html();
  $(document).find('#border-1').val(border)
  borderRadius   = $(document).find('#' + system + ' .default-radius-1' ).html();
  $(document).find('#radius-1').val(borderRadius)
  // update the root css //
  document.querySelector(':root').style.setProperty('--border-1', border );
  document.querySelector(':root').style.setProperty('--radius-1', borderRadius );
  updateBorders()
  updateRadius()
}

function buildBorder() {
  /// I should be running a check to see if the user entered px of not and if the value entered was a number ///
  border         = $('#border-1').val(border)
  borderRadius   = $('#radius-1').val(borderRadius)
  // update the root css //
  document.querySelector(':root').style.setProperty('--border-1', border );
  document.querySelector(':root').style.setProperty('--radius-1', borderRadius );
  updateBorders()
  updateRadius()
}

function updateBorders(){
  var borderNum = border.replace('px','')
  $('.border-0').html('0px')
  $('.border-half').html(borderNum /2 + 'px')
  $('.border-1').html(borderNum + 'px')
  $('.border-2').html(borderNum *2 + 'px')
  $('.border-3').html(borderNum *3 + 'px')
  $('.border-4').html(borderNum *4 + 'px')
  $('.border-5').html(borderNum *5 + 'px')
  $('.border-6').html(borderNum *6 + 'px')
  $('.border-7').html(borderNum *7 + 'px')
  $('.border-8').html(borderNum *8 + 'px')
}

function updateRadius(){
  var borderNum = borderRadius.replace('px','')
  $('.radius-0').html('0px')
  $('.radius-quarter').html(borderNum /4 + 'px')
  $('.radius-half').html(borderNum /2 + 'px')
  $('.radius-1').html(borderNum + 'px')
  $('.radius-2').html(borderNum *2 + 'px')
  $('.radius-3').html(borderNum *3 + 'px')
  $('.radius-4').html(borderNum *4 + 'px')
  $('.radius-5').html(borderNum *5 + 'px')
  $('.radius-6').html(borderNum *6 + 'px')
  $('.radius-7').html(borderNum *7 + 'px')
  $('.radius-8').html(borderNum *8 + 'px')
}

function loadFocus() {
  focusBlur = $(document).find('#' + system + ' .default-focus-blur' ).html()
  $('input[name=focusColor][value="theme"]').prop( "checked", true );

  if (focusBlur == '0px') {
    focusBlur = '0px'
    $('input[name=inputBlur]').prop( "checked", false );
  } else {
    focusBlur = grid/2 + 'px'
    $('input[name=inputBlur]').prop( "checked", true );
  }
  document.querySelector(':root').style.setProperty('--focus' , focus);
  document.querySelector(':root').style.setProperty('--dm-focus' , dmfocus);
  // update the root css //
  document.querySelector(':root').style.setProperty('--focus', focus );
  document.querySelector(':root').style.setProperty('--focusBlur', focusBlur );
}


///  INPUTS  ///
function buildInput() {
  var background   = backgroundPrimary
  var name         = backgroundPrimaryName
  var dmbackground = dmbackgroundPrimary
  var inputOverlay = rgb2hex($(document).find('#surfaceBG button .Hex').css('backgroundColor'));
  //var primary      = $(document).find('#' + system + 'Default .darkmode .default-primary' ).attr('name').split('-')[0];
  var overlayRGBArray = hextoRGBArray(inputOverlay)
  var primaryDark  = dmprimary;
  primaryDark = primaryDark.replace(/\s/g, '');
  if (primaryDark == black || primaryDark == darkRGB) {
    primaryDark      = darkTextArray
  }
  /// first calculate light mode ///
  // if the light mode background is dark///
  if (backgroundPrimaryName == 'nearblack-bg' || backgroundPrimaryName == 'primary-900-bg') {
    if (inputOverlay == '#ffffff') {
      inputDefault    = chroma.average([backgroundPrimary, 'rgba('+overlayRGBArray+',.03)']).css();
      inputDisabled   = chroma.average([backgroundPrimary, 'rgba(0,0,0,.03)']).css();
    } else {
      inputDefault    = chroma.average([backgroundPrimary, 'rgba('+overlayRGBArray+',.1)']).css();
      inputDisabled   = chroma.average([backgroundPrimary, 'rgba(255,255,255,.07)']).css();
    }
    oninputDefault  = '#ffffff'
    oninputDisabled = '#ffffff'
  } else {
    if (inputOverlay == '#ffffff') {
      inputDefault   = chroma.average([backgroundPrimary, 'rgba(255,255,255,.1)']).css();
      inputDisabled  = chroma.average([backgroundPrimary, 'rgba(0,0,0,.07)']).css();
    } else {
      inputDefault   = chroma.average([backgroundPrimary, 'rgba('+overlayRGBArray+',.3)']).css();
      inputDisabled  = chroma.average([backgroundPrimary, 'rgba(0,0,0,.03)']).css();
    }
   oninputDefault = black;
   oninputDisabled = black;
  }

  if (dmbackgroundPrimaryName.replace(/\s/g, '') == 'nearblack-bg') {
    if (inputOverlay == '#ffffff') {
      dminputDefault  = chroma.average([dmbackground, 'rgba('+primaryDark+',.08)']).css();
      dminputDisabled = chroma.average([dmbackground, 'rgba(0,0,0,.3)']).css();
    } else {
      dminputDefault  = chroma.average([dmbackground, 'rgba('+primaryDark+',.2)']).css()
      dminputDisabled = chroma.average([dmbackground, 'rgba(0,0,0,.3)']).css();
    }
  } else {
    if (inputOverlay == '#ffffff') {
      dminputDefault  = chroma.average([dmbackground, 'rgba('+overlayRGBArray+',.2)']).css();
      dminputDisabled = chroma.average([dmbackground, 'rgba(0,0,0,.3)']).css();
    } else {
      dminputDefault  = chroma.average([dmbackground, 'rgba('+overlayRGBArray+',.2)']).css();
      dminputDisabled = chroma.average([dmbackground, 'rgba(0,0,0,.3)']).css();
    }
  }
  // update css root variables //
  document.querySelector(':root').style.setProperty('--input', inputDefault );
  document.querySelector(':root').style.setProperty('--on-input', oninputDefault);
  document.querySelector(':root').style.setProperty('--input-disabled', inputDisabled);
  document.querySelector(':root').style.setProperty('--on-input-disabled', oninputDisabled);
  document.querySelector(':root').style.setProperty('--dm-input', dminputDefault);
  document.querySelector(':root').style.setProperty('--dm-input-disabled', dminputDisabled);
  // update the system //
  $(document).find('#' + system + 'Default .lightmode .default-input-overlay' ).html(inputOverlay);
  $(document).find('#' + system + 'Default .lightmode .default-input-default' ).html(inputDefault);
  $(document).find('#' + system + 'Default .lightmode .default-on-input-default' ).html(oninputDefault);
  $(document).find('#' + system + 'Default .lightmode .default-input-disabled' ).html(inputDisabled);
  $(document).find('#' + system + 'Default .lightmode .default-input-disabled' ).html(oninputDisabled);
  $(document).find('#' + system + 'Default .lightmode .default-dark-input-default' ).html(dminputDefault);
  $(document).find('#' + system + 'Default .lightmode .default-dark-input-disabled' ).html(dminputDisabled);
}

$('input[name=hotlink]').click(function() {
  buildHotlinks()
});

$('input[name=underline]').click(function() {
  buildHotlinks()
});

function loadHotlinks() {
  hotlinkName           = $(document).find('#' + system + ' .default-hotlink-name').html();
  hotlinkDecoration     = $(document).find('#' + system + ' .default-hotlink-underline').html();
  if (hotlinkDecoration == 'YES') {
    $('input[name=underline][value="YES"]').prop( "checked", true );
  } else {
    $('input[name=underline][value="NO"]').prop( "checked", true );
  }
  buildHotlinks();
}


// Focus Blur //
$('.inputBlur').click(function() {
  if ($(this).val() == 'true') {
    focusBlur = grid.replace('px','').replace(/\s/g, '')/2 + 'px'
    document.querySelector(':root').style.setProperty('--focusBlur', focusBlur );
  } else {
    focusBlur = 0
    document.querySelector(':root').style.setProperty('--focusBlur', '0px');
  }
});

function createHotlinks(name, background, onColor, mode, underline) {
  name = name.split('-')[0];
  background  = rgb2hex(background);
  background  = hextoRGBArray(background)
  var rootOnColor = onColor
  if (onColor.indexOf('rgba') >= 0) {
    /// this means its a dark mode color with off white text and uses rgba(255,255,255,0.6)  ///
  } else {
    onColor   = rgb2hex(onColor);
    onColor   = hextoRGBArray(onColor);
  }
  var linkArray = [];
  var contrastRation;
  var i = 100
  while (i < 1000) {

    if (mode == 'dakr') {
      var colorRGB  =  window['dm' + name + i]
      var colorName =  'dm-' + name + '-' + i
    } else {
      var colorRGB  =  window[name + i]
      var colorName =  name + '-' + i
    }

    //var colorName =  name.split('-')[0] + '-'+ mode + '-' + i
    var color = rgb2hex(colorRGB);
    color = hextoRGBArray(color)
    var firstContrast = contrast(color, background )
    if (firstContrast >= wcagContrast) {
      if (underline == "NO") {
        if (mode == 'dark') {
           linkArray.push(colorName);
        } else {
           contrastRation = contrast(color, onColor)
           if (contrastRation >= 3.1)  {
             linkArray.push(colorName);
           }
        }
      } else {
        linkArray.push(colorName);
      }
    }
    i = i + 100
  }
  return(linkArray)
}


function checkHotlink(color, background, mode) {
  color = hextoRGBArray(color)
  background = rgb2hex(colorRGB);
  background = hextoRGBArray(background)
  var firstContrast = contrast(color, background)
}

///  HOTLINKS  ///
function buildHotlinks(){
  var background    = backgroundPrimary
  var onColor       = onbackgroundPrimary
  var name          = hotlinkName
  var dmbackground  = dmbackgroundPrimary
  var dmonColor     = dmonbackgroundPrimary
  var underline     = $('input[name=underline]:checked').val();
  if (underline == 'NO') {
    document.querySelector(':root').style.setProperty('--hotlink-decoration', 'none');
    document.querySelector(':root').style.setProperty('--hotlink-hover-decoration', 'underline');
    hotlinkDecoration  = 'none'
    hotlinkVisitedDecoration  = 'underline'
  } else {
    document.querySelector(':root').style.setProperty('--hotlink-decoration', 'underline');
    document.querySelector(':root').style.setProperty('--hotlink-hover-decoration', 'none');
    hotlinkDecoration  = 'underline'
    hotlinkVisitedDecoration  = 'none'
  }
  var lmArray = createHotlinks(name, background, onColor,  'light', underline);
  /// if darkmode background is set //
  if (dmbackground) {
    var dmArray = createHotlinks(name, dmbackground, dmonColor, 'dark', underline);
  }
  if (lmArray.length != 0) {
    var lmLink = lmArray[Math.round((lmArray.length - 1) / 2)];
    hotlinkName = lmLink;
    var lmLinkColor     = $(document).find('#' + lmLink).find('.Hex').css('backgroundColor');
    hotlink             = window[hotlinkName.split('-')[0] + hotlinkName.split('-')[1] ];
    // updaye the swatches in the interface ///
    $('.lightmode .theme-link').css('background',hotlink)
    $('.lightmode .theme-link-visited').css('background',hotlinkVisited)

    if (dmbackground) {
      /// get the dark mode viable link colors ///
      var dmLink  =  dmArray[Math.round((dmArray.length - 1) / 2)];
      dmhotlinkName = dmLink;
      dmhotlink =  window[hotlinkName.split('-')[0] + hotlinkName.split('-')[1] ];
      //alert(dmVisitedColor + ', ' + getVisitedColor(dmLinkColor))
      $('.darkmode  .theme-link').css('background', dmhotlink)
      $('.darkmode  .theme-link-visited').css('background',dmhotlinkVisited)
    }
  /// if the user did not want underline but we could not find the any colors rerun with underlines ///
  } else if (lmArray.length === 0 && underline == 'NO') {
      // we should notify the end user that we could not find color with out the underline //
      // update the radio button ///
      $("input[name=underline][value='YES']").prop("checked",true);
      $("input[name=underline][value='NO']").prop("disabled", true); // disable
      $("input[name=underline][value='NO']").next('div').css('opacity',.5).html('NO underline does not meet WCAG AA requirements')
      // run the script again this time with underlines
      lmArray = createHotlinks(name, background, onColor,  'light', 'YES');
      hotlinkDecoration  = 'underline'
      hotlinkVisitedDecoration  = 'none'
      document.querySelector(':root').style.setProperty('--hotlink-decoration', 'underline');
      document.querySelector(':root').style.setProperty('--hotlink-hover-decoration', 'none');
      var lmLink = lmArray[0];
      hotlink =  $(document).find('#' + lmLink).find('.Hex').css('backgroundColor');

      $('.lightmode .theme-link').css('background',hotlink)
      $('.lightmode .theme-link-visited').css('background',hotlinkVisited)

      if (dmbackground) {
        /// get the dark mode viable link colors ///
        var dmLink  =  dmArray[0];
        dmhotlink =  $(document).find('#' + dmLink).find('.Hex').css('backgroundColor');
        //alert(dmVisitedColor + ', ' + getVisitedColor(dmLinkColor))
        // updaye the swatches in the interface ///
        $('.darkmode  .theme-link').css('background', dmhotlink)
        $('.darkmode  .theme-link-visited').css('background', dmhotlinkVisited)
      }
    document.querySelector(':root').style.setProperty('--hotlink', 'var(--'+  hotlinkName + ')' );
    document.querySelector(':root').style.setProperty('--hotlinkVisited', hotlinkVisited);
    document.querySelector(':root').style.setProperty('--dmhotlink', 'var(--'+  dmhotLinkName + ')' );


    // get the contrast ration of the color against the suggested text color //
    var hotlinkHex          = rgb2hex(hotlink);
    var linkArray           = hextoRGBArray(hotlinkHex);
    var primeColor          = rgb2hex(primary);
    var primeArray          = hextoRGBArray(primeColor);

    /// set on white hotlink color ///
    var contrastRation      = contrast(linkArray, 255,255,255); // 1.0736196319018405
    if (contrastRation >= 3.1) {
      linkOnWhite           = hotlinkName
      /// check contrast agains on white text ///
      contrastRation      = contrast(linkArray, darkTextArray); // 1.0736196319018405
      if (contrast >= 3.1  && underline == 'YES') {
        linkDecorationOnWhite     = 'none'
      } else {
        linkDecorationOnWhite     = 'underline'
      }
    } else {
      linkOnWhite               = 'black'
      linkDecorationOnWhite     = 'underline'
    }
    document.querySelector(':root').style.setProperty('--hotlinkOnWhite', 'var(--'+ hotlinkOnWhite  +')'  );
    document.querySelector(':root').style.setProperty('--hotlinkOnWhite-decoration', linkDecorationOnWhite );

    /// set on black hotlink color ///
    var contrastRation      = contrast(linkArray, darkTextArray); // 1.0736196319018405
    if (contrastRation >= 3.1) {
      hotlinkOnBlack        = hotlinkName
      vlinkOnBlack          = hotlinkVisited
      /// check contrast agains on white text ///
      contrastRation      = contrast(linkArray, 255,255,255); // 1.0736196319018405
      if (contrast >= 3.1  && underline == 'YES') {
        hotlinkDecorationOnBlack     = 'none'
      } else {
        hotlinkDecorationOnBlack     = 'underline'
      }
    } else {
      hotlinkOnBlack               = 'white'
      hotlinkDecorationOnBlack     = 'underline'
    }
    document.querySelector(':root').style.setProperty('--hotlinkOnBlack', 'var(--'+hotlinkOnBlack  +')'   );
    document.querySelector(':root').style.setProperty('--hotlinkOnBlack-decoration', hotlinkDecorationOnBlack  );

    /// set on tertiaryBG/prim hotlink color ///
    var contrastRation      = contrast(linkArray, primeArray); // 1.0736196319018405
    if (contrastRation >= 3.1) {
      linkOnTertiary           = hotlinkName
      /// check contrast agains on white text ///
      contrastRation      = contrast(linkArray, 255,255,255); // 1.0736196319018405
      if (contrast >= 3.1  && underline == 'YES') {
        linkDecorationOnTertiary    = 'none'
      } else {
        linkDecorationOnTertiary     = 'underline'
      }
    } else {
      if (onPrimary == black) {
        linkOnTertiary              = 'black'
      } else {
        linkOnTertiary              = 'white'
      }
      linkDecorationOnTertiary    = 'underline'
    }
    document.querySelector(':root').style.setProperty('--hotlinkOnTertiary', 'var(--'+linkOnTertiary  +')'   );
    document.querySelector(':root').style.setProperty('--hotlinkOnTertiary-decoration', linkDecorationOnTertiary   );

    /// set on gradient3 button color ///
    var contrastRation      = contrast(linkArray, 138,138,138); // 1.0736196319018405
    if (contrastRation >= 3.1) {
      linkOnGradient3           = hotlinkName
    } else {
      linkOnGradient3           = 'black'
    }
    document.querySelector(':root').style.setProperty('--hotlinkOnGradient3', 'var(--'+ linkOnGradient3  +')'   );



    /// set darkmode on gradient3 button color ///
    var contrastRation      = contrast(linkArray, 24,24,24); // 1.0736196319018405
    if (contrastRation >= 3.1) {
      dmhotlinkOnGradient3       = hotlinkName
    } else {
      dmhotlinkOnGradient3       = 'white'
    }
    document.querySelector(':root').style.setProperty('--hotlinkOnGradient3 ', 'var(--'+ linkOnGradient3  +')'  );

  }
  // update the swatches in the interface ///
  $('.lightmode .theme-link').css('background', hotlink )
  /// update the root values ///
  document.querySelector(':root').style.setProperty('--hotlink', 'var(--'+ hotlinkName  +')' );

  if (dmbackground) {
    // update the swatches in the interface ///
    $('.darkmode .theme-link').css('background', dmhotlink)
    $('.darkmode .theme-link-visited').css('background',dmhotlinkVisited)
    /// update the root values ///
    document.querySelector(':root').style.setProperty('--dm-hotlink', 'var(--'+ dmhotlinkName  +')');
  }

}

////////// PHASE III - Molesules ///////

$('.molecule .dropdown-item').click(function(e) {
  /// objectName is the js value name ///
  var objectName = $(this).parents('.molecule').attr('name');
  var valueName   = $(this).attr('name')
  var update      = $(this).html();
  var onUpdate    = $(this).css('color');
  var className = $(this).attr('class');
  className = className.replace("dropdown-item ", "");
  $(this).parents('.molecule').find('.dropdown-toggle').attr('class', 'dropdown-toggle show ' + className)
  //className       = className.replace("dropdown-item ", "");
  /// id is the css root name ///
  var id          = $(this).parents('.molecule').attr('id');
  /// update the value in the dropdown
  $(this).parents('.dropdown').find('.dropdown-toggle').html(update);
  //$(this).parents('.dropdown').find('.dropdown-toggle').attr('class', 'dropdown-toggle show ' + className)

  if (objectName ) {
    if (id.indexOf('elevation') > 0) {
      document.querySelector(':root').style.setProperty('--' + id , 'var(--elevation-'+ valueName + ')' );
    } else if (id.indexOf('bevel') > 0) {
      document.querySelector(':root').style.setProperty('--' + id , 'var(--bevel-'+ valueName + ')' );
    } else if (id.indexOf('inbevel') > 0) {
      document.querySelector(':root').style.setProperty('--' + id , 'var(--inbevel-'+ valueName + ')' );
    } else if (id.indexOf('Typography') > 0) {
      var typography     = $('.' + valueName).css('font');
      var textTransform  = $('.' + valueName).css('text-transform');
      var letterSpacing  = $('.' + valueName).css('letter-spacing');
      this[objectName + 'Typography']            = typography ;
      this[objectName + 'textTransform']         = textTransform;
      this[objectName + 'letterSpacing']         = letterSpacing;
      document.querySelector(':root').style.setProperty('--' + objectName + 'Typography' ,    typography  );
      document.querySelector(':root').style.setProperty('--' + objectName + 'textTransform' , textTransform);
      document.querySelector(':root').style.setProperty('--' + objectName + 'letterSpacing' , letterSpacing);

    } else {
      this[objectName] = valueName
      console.log(objectName + ': ' + valueName)
      console.log('--'+ id + ': ' + valueName);
      document.querySelector(':root').style.setProperty('--' + id , valueName );
    }


  }

 });



  ///  Charts  ///
  function buildCharts(mode) {
    barCharts(mode)
    lineChart(mode);
    donutCharts(mode);
    pieCharts(mode);
    progressCharts(mode)
  }

  function lineChart() {
    lineCharts('light');
    lineCharts('dark');
  }

  var mylineChart
  function lineCharts(mode) {
    var borderColorC103   = $('#' + system + ' .default-' + mode + '-C1-01').html()
    linechartBackground   = $('#' + system + ' .default-line-chart-background').html();
    linechartLineWidth    = $('#' + system + ' .default-line-chart-linewidth').html().replace('px', '');
    linechartXlegend      = $('#' + system + ' .default-line-chart-xlegend').html();
    linechartElevation    = $('#' + system + ' .default-line-chart-elevation').html().toLowerCase();;

    // chart lines //
    if (linechartXlegend == "No") {
      var barLines = false
    } else {
      var barLines = true
    }

    // chart background color //
    var background = backgroundPrimary

    // chart background //
    if (linechartBackground == 'Opaque') {
      var backColor  = borderColorC103.replace('rgb','rgba').replace(')',',.2)');
    } else {
      var backColor  = borderColorC103.replace('rgb','rgba').replace(')',',1)');
    }

    var hoverColor  = borderColorC103.replace('rgb','rgba').replace(')',',.4)')

    // elevation //
    var elevationLevel      = linechartElevation.replace('elevation-','');
    var shadowOffsetX      = elevationHorizontal * (1 + (elevationChange * elevationLevel));
    var shadowOffsetY      = elevationVertical * (1 + (elevationChange * elevationLevel));
    var shadowBlur         = elevationBlur * (1 + (elevationChange * elevationLevel));
    var shadowColor        = 'rgba('+ elevationRGB+','+ elevationOpacity * (1 + (elevationChange * elevationLevel)) + ')'

    // Bar Chart //
     var lineData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [{
        label: "Dataset #1",
        backgroundColor: backColor,
        borderColor:  borderColorC103,
        borderWidth:  linechartLineWidth,
        hoverBackgroundColor: backColor ,
        hoverBorderColor: borderColorC103,
        data: [65, 59, 20, 81, 56, 55, 40],
        shadowOffsetX: shadowOffsetX ,
        shadowOffsetY: shadowOffsetY,
        shadowBlur: shadowBlur,
        shadowColor: shadowColor,
      }]
    };

    var lineOptions = {
      legend: {
         display: false //This will do the task
      },
      maintainAspectRatio: false,
      scales: {
        y: {
          display: false,
          stacked: true,
          grid: {
            display: barLines,
            color: lineColor
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },

    };

    // destroy if it exists //
    if (mylineChart) {    mylineChart.destroy();  }
    // Then, let's set up the chart again
    var chartCanvas = document.getElementById('linechart').getContext("2d");
    mylineChart = new Chart(chartCanvas, {
      type: 'line',
      options: lineOptions,
      data: lineData,
    });
    mylineChart.update();
};


$("input[name='progress-start']").click(function() {
  var system = $('.system.active').attr('id');
  var position = $("input[name='progress-start']:checked").val();

  $('#' + system + ' .default-progress-start').html(position);
  document.querySelector(':root').style.setProperty('--progress-chart-start', position);
  progressCharts('light')
});

// lines //
$('.chart-lines').click(function() {
  var name = $(this).attr('name')
  var system = $('.system.active').attr('id');
  if ($('.chart-lines[name='+name+']').is(':checked')) {
    $('#' + system + ' .default-'+name+'-chart-lines').html('Yes');
  } else {
    $('#' + system + ' .default-'+name+'-chart-lines').html('No');
  }
  if (name == 'bar') {
    barCharts('light')
  } else if (name == 'line') {
    lineCharts('light')
  } else if (name == 'donut') {
    donutCharts('light')
  }  else if (name == 'pie') {
    pieCharts('light')
  } else {
    progressCharts('light')
  }

});

$('.chart-ylegend').click(function() {
  var name = $(this).attr('name')
  var system = $('.system.active').attr('id');
  if ($('.chart-ylegend[name='+name+']').is(':checked')) {
    $('#' + system + ' .default-'+name+'-chart-ylegend').html('Yes');
  } else {
    $('#' + system + ' .default-'+name+'-chart-ylegend').html('No');
  }
  if (name == 'bar') {
    barCharts('light')
  } else if (name == 'line') {
    lineCharts('light')
  } else if (name == 'donut') {
    donutCharts('light')
  }  else if (name == 'pie') {
    pieCharts('light')
  } else {
    progressCharts('light')
  }
});


$('.chart-container-display').click(function() {
  var name = $(this).attr('name')
  var system = $('.system.active').attr('id');
  if ($('.chart-container-display[name='+name+']').is(':checked')) {
    $('#' + system + ' .default-'+name+'-container-display').html('block');
    document.querySelector(':root').style.setProperty('--'+name+'-container', 'block');
    $('.container-settings[name='+name+'] button').prop('disabled', false);
    $('.container-settings[name='+name+']').parent().removeClass('disabled')

  } else {
    $('#' + system + ' .default-'+name+'-container-display').html('none');
    document.querySelector(':root').style.setProperty('--'+name+'-container', 'none');
    $('.container-settings[name='+name+'] button').prop('disabled', true);
    $('.container-settings[name='+name+']').parent().addClass('disabled')
  }
  if (name == 'donut') {
    donutCharts('light')
  }  else {
    pieCharts('light')
  }
});

$('.donuthole-display').click(function() {
  var system = $('.system.active').attr('id');
  if ($('.donuthole-display').is(':checked')) {
    $('#' + system + ' .default-'+name+'-donuthole-display').html('block');
    document.querySelector(':root').style.setProperty('--donuthole-display', 'block');
  } else {
    $('#' + system + ' .default-'+name+'-donuthole-display').html('none');
    document.querySelector(':root').style.setProperty('--donuthole-display', 'none');
  }
  donutCharts('light')
});

  var mybarChart ;

  function barChart() {
    barCharts('light');
    barCharts('dark')
  }


  function barCharts(mode) {
    var system = $('.system.active').attr('id');
    var borderColorC103 = $('#' + system + ' .default-' + mode + '-C1-01').html()
    var chartBackground = $('#' + system + ' .default-bar-chart-background').html();
    var chartBorder = $('#' + system + ' .default-bar-chart-border').html().replace('px', '');
    var chartWidth = $('#' + system + ' .default-bar-chart-width').html().replace('px', '');
    var chartRadius = $('#' + system + ' .default-bar-chart-radius').html().replace('px', '');
    var barchartLines = $('#' + system + ' .default-bar-chart-lines').html();
    var barchartyLegend = $('#' + system + ' .default-bar-chart-ylegend').html();
    var barchartBevel = $('#' + system + ' .default-bar-chart-bevel').html().toLowerCase();;
    var barchartElevation = $('#' + system + ' .default-bar-chart-elevation').html().toLowerCase();
    // radius //
    if (chartRadius == 'Rounded') {
      chartRadius = Number.MAX_VALUE
    }
    // chart lines //
    var barLines
    if (barchartLines == "No") {
       barLines = false
    } else {
       barLines = true
    }
    // chart line color //
    var background = $('#' + system + ' .default-background').html();
    var yLegend;
    // chart lines //
    if (barchartyLegend  == "No") {
      yLegend = false
    } else {
      yLegend = true
    }
    // chart bevel //
    var bevel = parseInt($('#' + system + ' .default-bevel-spread').html().replace('px',''));
    var bevelChange = parseInt($('#' + system + ' .default-bevel-change').html());
    var bevelLevel = barchartBevel.replace('bevel-')
    var bevelWidth = bevel * (1 + (bevelChange  * bevelLevel));
    // chart background //
    if (chartBackground == 'Opaque') {
      var backColor  = borderColorC103.replace('rgb','rgba').replace(')',',.2)');
    } else {
      var backColor  = borderColorC103.replace('rgb','rgba').replace(')',',1)');
    }
    var hoverColor  = borderColorC103.replace('rgb','rgba').replace(')',',.4)')
    // elevation //
    var elevationLevel = barchartElevation.replace('elevation-','');
    var shadowOffsetX = elevationHorizontal * (1 + (elevationChange * elevationLevel));
    var shadowOffsetY = elevationVertical * (1 + (elevationChange * elevationLevel));
    var shadowBlur = elevationBlur * (1 + (elevationChange * elevationLevel));
    var shadowColor = 'rgba('+elevationRGB+','+ elevationOpacity * (1 + (elevationChange * elevationLevel)) + ')'
    // Bar Chart //
     var barData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [{
        label: "Dataset #1",
        backgroundColor: backColor,
        borderColor:  borderColorC103,
        borderWidth: chartBorder,
        hoverBackgroundColor: backColor ,
        hoverBorderColor: borderColorC103,
        borderRadius: chartRadius,
        barThickness: chartWidth,
        borderSkipped: false,
        data: [65, 59, 20, 81, 56, 55, 40],
        bevelHighlightColor: 'rgba(255, 255, 255, 0.5)',
        bevelShadowColor: 'rgba(0, 0, 0, 0.25)',
        bevelWidth: bevelWidth,
        shadowOffsetX: shadowOffsetX ,
        shadowOffsetY: shadowOffsetY,
        shadowBlur: shadowBlur,
        shadowColor: shadowColor,
      }]
    };
    var barOptions = {
      legend: {
         display: false //This will do the task
      },
      maintainAspectRatio: false,
      scales: {
        y: {
          display: yLegend,
          stacked: true,
          grid: {
            display: barLines,
            color: lineColor
          },
        },
        x: {
          grid: {
            display: false
          }
        }
      },
    };
    // destroy if it exists //
    if (mybarChart) {    mybarChart.destroy();  }
    // Then, let's set up the chart again
    var chartCanvas = document.getElementById('barchart').getContext("2d");
    mybarChart = new Chart(chartCanvas, {
      type: 'bar',
      options: barOptions,
      data: barData,
    });
    mybarChart.update();
  };

  var mydonutChart;
  function donutCharts(mode) {
    var system = $('.system.active').attr('id');
    var borderColorC103 = $('#' + system + ' .default-' + mode + '-C1-01').html()
    var chartBackground = $('#' + system + ' .default-donut-chart-background').html();
    var chartBorder = $('#' + system + ' .default-donut-chart-space').html().replace('px', '');
    // border  - note that pie and donut charts need to have a border of at least 1px for accessibility //
    var chartWidth = $('#' + system + ' .default-donut-chart-thickness').html();
    var chartRadius = $('#' + system + ' .default-donut-chart-radius').html().replace('px', '');
    var barchartLines = $('#' + system + ' .default-donut-chart-lines').html();
    var barchartyLegend = $('#' + system + ' .default-donut-chart-ylegend').html();
    var barchartBevel = $('#' + system + ' .default-donut-chart-bevel').html().toLowerCase();;
    var barchartElevation = $('#' + system + ' .default-donut-chart-elevation').html().toLowerCase();;
    var chartContainerColor = $('#' + system + ' .default-chart-background').html();
    var chartContainer = $('#' + system + ' .default-donut-container-display').html();

    if (chartContainer == 'block') {
      document.querySelector(':root').style.setProperty('--donut-container', 'block');
    } else {
      document.querySelector(':root').style.setProperty('--donut-container', 'none');
    }

    var chartBorder;

    // radius //
    if (chartRadius == 'rounded') {
      chartRadius = Number.MAX_VALUE
    }
    // chart lines //
    var barLines
    if (barchartLines == "No") {
       barLines = false
    } else {
       barLines = true
    }

    // chart line color //
    var background = $('#' + system + ' .default-background').html();
    var yLegend;
    // chart lines //
    if (barchartyLegend  == "No") {
      yLegend = false
    } else {
      yLegend = true
    }
    // chart bevel //
    var bevel = parseInt($('#' + system + ' .default-bevel-spread').html().replace('px',''));
    var bevelChange = parseInt($('#' + system + ' .default-bevel-change').html());
    var bevelLevel = barchartBevel.replace('bevel-')
    var bevelWidth = bevel * (1 + (bevelChange  * bevelLevel));
    // chart background //
    backColor  = borderColorC103.replace('rgb','rgba').replace(')',',1)');

    var hoverColor  = borderColorC103.replace('rgb','rgba').replace(')',',.4)')
    // elevation //
    var elevationLevel = barchartElevation.replace('elevation-','');
    var elevationColor = $('#' + system + ' .default-elevation-rgb').html();
    var elevationChange = $('#' + system + ' .default-elevation-change').html();
    var elevationOpacity = $('#' + system + ' .default-elevation-opacity').html();
    var elevationBlur = parseInt($('#' + system + ' .default-elevation-blur').html().replace('px',''));
    var elevationHorizontal = parseInt($('#' + system + ' .default-elevation-horizontal').html().replace('px',''));
    var elevationVertical = parseInt($('#' + system + ' .default-elevation-veritcal').html().replace('px',''));
    var shadowOffsetX = elevationHorizontal * (1 + (elevationChange * elevationLevel));
    var shadowOffsetY = elevationVertical * (1 + (elevationChange * elevationLevel));
    var shadowBlur = elevationBlur * (1 + (elevationChange * elevationLevel));
    var shadowColor = 'rgba('+elevationColor+','+ elevationOpacity * (1 + (elevationChange * elevationLevel)) + ')'

    var c101 = $('#' + system + ' .default-light-C1-01').html();
    var c102 = $('#' + system + ' .default-light-C1-02').html();
    var c103 = $('#' + system + ' .default-light-C1-03').html();
    var c201 = $('#' + system + ' .default-light-C1-01').html();
    var c202 = $('#' + system + ' .default-light-C2-02').html();
    var c203 = $('#' + system + ' .default-light-C2-03').html();
    var c301 = $('#' + system + ' .default-light-C3-01').html();
    var c308 = $('#' + system + ' .default-light-C3-02').html();
    var c109 = $('#' + system + ' .default-light-C3-03').html();
    var c101hover = $('#' + system + ' .default-light-C1-01').html().replace('rgb','rgba').replace(')',',.5)');
    var c102hover = $('#' + system + ' .default-light-C1-02').html().replace('rgb','rgba').replace(')',',.5)');
    var c103hover = $('#' + system + ' .default-light-C1-03').html().replace('rgb','rgba').replace(')',',.5)');
    var c201hover = $('#' + system + ' .default-light-C1-01').html().replace('rgb','rgba').replace(')',',.5)');
    var c202hover = $('#' + system + ' .default-light-C2-02').html().replace('rgb','rgba').replace(')',',.5)');
    var c203hover = $('#' + system + ' .default-light-C2-03').html().replace('rgb','rgba').replace(')',',.5)');
    var c301hover = $('#' + system + ' .default-light-C3-01').html().replace('rgb','rgba').replace(')',',.5)');
    var c308hover = $('#' + system + ' .default-light-C3-02').html().replace('rgb','rgba').replace(')',',.5)');
    var c109hover = $('#' + system + ' .default-light-C3-03').html().replace('rgb','rgba').replace(')',',.5)');

    // Bar Chart //
     var donutData = {
      datasets: [{
        label: "Dataset #1",
        borderColor:  chartContainerColor,
        borderWidth: chartBorder,
        backgroundColor: [
          c101,c102,c103,c201,c202,c203,c301
        ],
        hoverBackgroundColor: [
          c101,c102,c103,c201,c202,c203,c301
        ],
        hoverBorderColor: [
          c101hover,c102hover,c103hover,c201hover,c202hover,c203hover,c301hover
        ],
        cutout: chartWidth + '%',
        borderRadius: chartRadius,
        borderSkipped: false,
        data: [65, 59, 20, 81, 56, 55, 40],
        bevelHighlightColor: 'rgba(255, 255, 255, 0.5)',
        bevelShadowColor: 'rgba(0, 0, 0, 0.25)',
        bevelWidth: bevelWidth,
        shadowOffsetX: shadowOffsetX ,
        shadowOffsetY: shadowOffsetY,
        shadowBlur: shadowBlur,
        shadowColor: shadowColor,

      }]
    };
    var donutOptions = {
      cutoutPercentage: 80,
      legend: {
         display: false //This will do the task
      },
      maintainAspectRatio: false,

    };
    // destroy if it exists //
    if (mydonutChart) {    mydonutChart.destroy();  }
    // Then, let's set up the chart again
    var chartCanvas = document.getElementById('donutchart').getContext("2d");
    mydonutChart = new Chart(chartCanvas, {
      type: 'doughnut',
      options: donutOptions,
      data: donutData,
    });
    mydonutChart.update();
  };

  // donut thinkness //
  $( "#chart-donut-thickness" ).slider({
    create: function() {
      handle.text( $( this ).slider({
        value: 75
      }) );
    },
    slide: function( event, ui ) {
      handle.text( ui.value );
      $( "#chart-donut-thickness" ).attr('name', ui.value + 'px')
      var cutout = 100 - ui.value;
      document.querySelector(':root').style.setProperty('--donut-chart-thickness', ui.value  + '%');
      document.querySelector(':root').style.setProperty('--donut-chart-cutout', cutout  + '%');
      var system = $('.system.active').attr('id');
      $(document).find('#' + system + ' .default-donut-chart-thickness').html(ui.value + 'px')
      donutCharts('light')
    }
  });

  // donut thinkness //
  $( "#progress-chart-thickness" ).slider({
    create: function() {
      handle.text( $( this ).slider({
        value: 80
      }) );
    },
    slide: function( event, ui ) {
      handle.text( ui.value );
      $( "#chart-donut-thickness" ).attr('name', ui.value + 'px')
      var cutout = 100 - ui.value;
      document.querySelector(':root').style.setProperty('--progress-chart-thickness', ui.value  + '%');
      document.querySelector(':root').style.setProperty('--progress-chart-cutout', cutout  + '%');
      var system = $('.system.active').attr('id');
      $(document).find('#' + system + ' .default-progress-chart-thickness').html(ui.value + 'px')
      progressCharts('light')
    }
  });

  // sample sliders //
  $( "#sample-slider").slider();
  $( "#range-slider" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });


  var mypieChart
  function pieCharts(mode) {
    var system = $('.system.active').attr('id');
    var borderColorC103 = $('#' + system + ' .default-' + mode + '-C1-01').html()
    var chartBackground = $('#' + system + ' .default-pie-chart-background').html();
    var chartBorder = $('#' + system + ' .default-pie-chart-space').html().replace('px', '');
    var chartRadius = $('#' + system + ' .default-pie-chart-radius').html().replace('px', '');
    var barchartBevel = $('#' + system + ' .default-pie-chart-bevel').html().toLowerCase();;
    var barchartElevation = $('#' + system + ' .default-pie-chart-elevation').html().toLowerCase();;

    var c101 = $('#' + system + ' .default-light-C1-01').html();
    var c102 = $('#' + system + ' .default-light-C1-02').html();
    var c103 = $('#' + system + ' .default-light-C1-03').html();
    var c201 = $('#' + system + ' .default-light-C1-01').html();
    var c202 = $('#' + system + ' .default-light-C2-02').html();
    var c203 = $('#' + system + ' .default-light-C2-03').html();
    var c301 = $('#' + system + ' .default-light-C3-01').html();
    var c308 = $('#' + system + ' .default-light-C3-02').html();
    var c109 = $('#' + system + ' .default-light-C3-03').html();
    var c101hover = $('#' + system + ' .default-light-C1-01').html().replace('rgb','rgba').replace(')',',.5)');
    var c102hover = $('#' + system + ' .default-light-C1-02').html().replace('rgb','rgba').replace(')',',.5)');
    var c103hover = $('#' + system + ' .default-light-C1-03').html().replace('rgb','rgba').replace(')',',.5)');
    var c201hover = $('#' + system + ' .default-light-C1-01').html().replace('rgb','rgba').replace(')',',.5)');
    var c202hover = $('#' + system + ' .default-light-C2-02').html().replace('rgb','rgba').replace(')',',.5)');
    var c203hover = $('#' + system + ' .default-light-C2-03').html().replace('rgb','rgba').replace(')',',.5)');
    var c301hover = $('#' + system + ' .default-light-C3-01').html().replace('rgb','rgba').replace(')',',.5)');
    var c308hover = $('#' + system + ' .default-light-C3-02').html().replace('rgb','rgba').replace(')',',.5)');
    var c109hover = $('#' + system + ' .default-light-C3-03').html().replace('rgb','rgba').replace(')',',.5)');

    // chart bevel //
    var bevel = parseInt($('#' + system + ' .default-bevel-spread').html().replace('px',''));
    var bevelChange = parseInt($('#' + system + ' .default-bevel-change').html());
    var bevelLevel = barchartBevel.replace('bevel-')
    var bevelWidth = bevel * (1 + (bevelChange  * bevelLevel));
    // chart background //
    backColor  = borderColorC103.replace('rgb','rgba').replace(')',',1)');

    var hoverColor  = borderColorC103.replace('rgb','rgba').replace(')',',.4)')
    // elevation //
    var elevationLevel = barchartElevation.replace('elevation-','');
    var elevationColor = $('#' + system + ' .default-elevation-rgb').html();
    var elevationChange = $('#' + system + ' .default-elevation-change').html();
    var elevationOpacity = $('#' + system + ' .default-elevation-opacity').html();
    var elevationBlur = parseInt($('#' + system + ' .default-elevation-blur').html().replace('px',''));
    var elevationHorizontal = parseInt($('#' + system + ' .default-elevation-horizontal').html().replace('px',''));
    var elevationVertical = parseInt($('#' + system + ' .default-elevation-veritcal').html().replace('px',''));
    var shadowOffsetX = elevationHorizontal * (1 + (elevationChange * elevationLevel));
    var shadowOffsetY = elevationVertical * (1 + (elevationChange * elevationLevel));
    var shadowBlur = elevationBlur * (1 + (elevationChange * elevationLevel));
    var shadowColor = 'rgba('+elevationColor+','+ elevationOpacity * (1 + (elevationChange * elevationLevel)) + ')'
    // Bar Chart //
     var pieData = {
      labels: [],
      datasets: [{
        label: "Dataset #1",
        backgroundColor: [
          c101,c102,c103,c201,c202,c203,c301
        ],
        hoverBackgroundColor: [
          c101,c102,c103,c201,c202,c203,c301
        ],
        hoverBorderColor: [
          c101hover,c102hover,c103hover,c201hover,c202hover,c203hover,c301hover
        ],
        borderColor:  '#ffffff',
        borderWidth: chartBorder,

        borderRadius: chartRadius,
        borderSkipped: false,
        data: [65, 59, 20, 81, 56, 55, 40],

        bevelHighlightColor: 'rgba(255, 255, 255, 0.5)',
        bevelShadowColor: 'rgba(0, 0, 0, 0.25)',
        bevelWidth: bevelWidth,
        shadowOffsetX: shadowOffsetX ,
        shadowOffsetY: shadowOffsetY,
        shadowBlur: shadowBlur,
        shadowColor: shadowColor,

      }]
    };
    var pieOptions = {
      legend: {
         display: false //This will do the task
      },
      maintainAspectRatio: false,
    };
    // destroy if it exists //
    if (mypieChart) {    mypieChart.destroy();  }
    // Then, let's set up the chart again
    var chartCanvas = document.getElementById('piechart').getContext("2d");
    mypieChart = new Chart(chartCanvas, {
      type: 'pie',
      options: pieOptions,
      data: pieData,
    });
    mypieChart.update();
  };

  var myprogressChart;
  function progressCharts(mode) {
    var system = $('.system.active').attr('id');
    var borderColorC103 = $('#' + system + ' .default-' + mode + '-C1-01').html()
    var chartBackground = $('#' + system + ' .default-progress-chart-background').html();
    var chartBorder = $('#' + system + ' .default-progress-chart-space').html().replace('px', '');
    var chartWidth = $('#' + system + ' .default-progress-chart-thickness').html();
    var chartRadius = $('#' + system + ' .default-progress-chart-radius').html().replace('px', '');
    var barchartBevel = $('#' + system + ' .default-progress-chart-bevel').html().toLowerCase();;
    var barchartElevation = $('#' + system + ' .default-progress-chart-elevation').html().toLowerCase();;
    var c101 = $('#' + system + ' .default-light-C1-01').html();
    var c101hover = $('#' + system + ' .default-light-C1-01').html().replace('rgb','rgba').replace(')',',.5)');

    // chart bevel //
    var bevel = parseInt($('#' + system + ' .default-bevel-spread').html().replace('px',''));
    var bevelChange = parseInt($('#' + system + ' .default-bevel-change').html());
    var bevelLevel = barchartBevel.replace('bevel-')
    var bevelWidth = bevel * (1 + (bevelChange  * bevelLevel));
    // chart background //
    backColor  = borderColorC103.replace('rgb','rgba').replace(')',',1)');
    var hoverColor  = borderColorC103.replace('rgb','rgba').replace(')',',.4)')
    // elevation //
    var elevationLevel = barchartElevation.replace('elevation-','');
    var elevationColor = $('#' + system + ' .default-elevation-rgb').html();
    var elevationChange = $('#' + system + ' .default-elevation-change').html();
    var elevationOpacity = $('#' + system + ' .default-elevation-opacity').html();
    var elevationBlur = parseInt($('#' + system + ' .default-elevation-blur').html().replace('px',''));
    var elevationHorizontal = parseInt($('#' + system + ' .default-elevation-horizontal').html().replace('px',''));
    var elevationVertical = parseInt($('#' + system + ' .default-elevation-veritcal').html().replace('px',''));
    var shadowOffsetX = elevationHorizontal * (1 + (elevationChange * elevationLevel));
    var shadowOffsetY = elevationVertical * (1 + (elevationChange * elevationLevel));
    var shadowBlur = elevationBlur * (1 + (elevationChange * elevationLevel));
    var shadowColor = 'rgba('+elevationColor+','+ elevationOpacity * (1 + (elevationChange * elevationLevel)) + ')'
    var c101 = $('#' + system + ' .default-light-C1-01').html();
    var c101hover = $('#' + system + ' .default-light-C1-01').html().replace('rgb','rgba').replace(')',',.5)');
    var percent_value = 68;
    // Then, let's set up the chart again
    var progressData = {
     labels: [],
     datasets: [{
       label: 'First dataset',
       data: [percent_value, 100 - percent_value],
       cutout: chartWidth + '%',
       backgroundColor: [c101, '#ffffff'],
       borderWidth: 0,
       startAngle: 180,
       borderRadius: chartRadius,
       bevelHighlightColor: 'rgba(255, 255, 255, 0.5)',
       bevelShadowColor: 'rgba(0, 0, 0, 0.25)',
       bevelWidth: bevelWidth,
       shadowOffsetX: shadowOffsetX ,
       shadowOffsetY: shadowOffsetY,
       shadowBlur: shadowBlur,
       shadowColor: shadowColor,
     }]
   };

   var progressOptions = {
     legend: {
        display: false //This will do the task
     },
     maintainAspectRatio: false,
   };

   // destroy if it exists //
   if (myprogressChart) {    myprogressChart.destroy();  }
     // Then, let's set up the chart again
     var chartCanvas = document.getElementById('progresschart').getContext("2d");
     myprogressChart = new Chart(chartCanvas, {
       type: 'doughnut',
       options: progressOptions,
       data: progressData,
     });
     myprogressChart.update();
   };


   $('#components-mode .ghost').click(function() {
       var position = $(this).position().left;
       var width = $(this).outerWidth();
       $(this).parent().find('.ghost').removeClass('active');
       $(this).addClass('active');
       $(this).parent().find('.selector div').html('')
       $(this).parent().find('.selector').css('left', position)
       $(this).parent().find('.selector').css('width', width)
       var name = $(this).attr('name');
       if (name == 'dark') {
         $('#components .content').addClass('background darkmode')
       } else {
          $('#components .content').removeClass('background darkmode')
       }
    });

/// RENDER COMPONENTS /////


$('.component-background .dropdown-item').click(function(e) {
  /// objectName is the js value name ///
  var component = $(this).parents('.component-background').attr('id');
  var background   = $(this).attr('name')
  $('#' + component ).attr('class','').addClass('background')

 });



//////////  PHASE IV - Translate  /////
// change code view between css and json //
 $('#code-view .ghost').click(function() {
     var position = $(this).position().left;
     var width = $(this).outerWidth();
     $(this).parent().find('.ghost').removeClass('active');
     $(this).addClass('active');
     $(this).parent().find('.selector').html('')
     $(this).parent().find('.selector').css('left', position)
     $(this).parent().find('.selector').css('width', width)
     var name = $(this).attr('name');
     $('.code-view').removeClass('active');
     $('#' + name).addClass('active')
  });

  // COPY TEXT //
    $('#json-theme').click(function() {
      copy("json-lm-base");
    });

    $('#json-dark-theme').click(function() {
      copy("json-dm-base");
    });

    $('#json-mobile-theme').click(function() {
      copy("json-mobile");
    });

    $('#json-mobile-theme').click(function() {
      copy("json-mobile");
    });

    $('#json-tablet-theme').click(function() {
      copy("json-tablet");
    });

    $('#mobileCSS').click(function() {
      copy("css-mobile-code");
    });

    $('#tabletCSS').click(function() {
      copy("css-tablet-code");
    });

    $('#css-motion').click(function() {
      copy("css-montionSensative-code");
    });
    $('#css-dyslexia').click(function() {
      copy("css-Dyslexic-code");
    });

    function copy(element_id){
      var aux = document.createElement("div");
      aux.setAttribute("contentEditable", true);
      aux.innerHTML = $('#' + element_id).html();
      aux.setAttribute("onfocus", "document.execCommand('selectAll',false,null)");
      document.body.appendChild(aux);
      aux.focus();
      document.execCommand("copy");
      document.body.removeChild(aux);
    }

  /// Build Code ///
  function buildCode() {
    // buld code theme and code //
    buildCSS('default');
    buildDMJSON('default');
    buildLMJSON('default');
    buildDyslexicTheme();
    buildTablet();
    buildMobile();
  }

  //// CSS ////
  function buildCSS(theme) {
   fullCSS = '';
   var systemRoot         = buildCSS_systemRoot()
   //var baseRoot           = buildCSS_baseRoot();
   var themeRoot          = buildCSS_defaultThemeRoot();
   var onRoot             = buildCSS_OnRoot();
   var palleteLightRoot   = buildCSS_PaletteLightRoot();
   var palleteDarkRoot    = buildCSS_PaletteDarkRoot()
   var stateRoot          = buildCSS_StatesRoot();
   var borderRoot         = buildCSS_borderRoot();
   var elevationsRoot     = buildCSS_elevationRoot();
   var bevelRoot          = buildCSS_bevelsRoot();
   var typoRoot           = builCSS_TypographyRoot();
   var avatarRoot         = buildCSS_avatars();
   var buttonRoot         = buildCSS_buttons();
   var cardsRoot          = buildCSS_cards() ;
   var chipsRoot          = buildCSS_chips() ;
   var dropDownRoot       = buildCSS_dropdowns() ;
   var spacingRoot        = buildCSS_spacing() ;
   var modalRoot          = buildCSS_modals() ;
   var slidersRoot        = buildCSS_sliders() ;
   var toastRoot          = buildCSS_toasts() ;
   var tooltopRoot        = buildCSS_tooltip() ;
   var palleteLight       = buildCSS_Palette('light');
   var palleteDark        = buildCSS_Palette('dark');
   var hero               = buildCSS_hero() ;
   var primaryNav         = buildCSS_primaryNav() ;
   var secondaryNav       = buildCSS_secondaryNav();
   var table              = buildCSS_table() ;
   //var states = buildCSS_States()
   fullCSS = fullCSS + ':root {';
   //fullCSS = fullCSS + baseRoot;
   fullCSS = fullCSS + stateRoot;
   fullCSS = fullCSS + themeRoot;
   fullCSS = fullCSS + onRoot;
   fullCSS = fullCSS + (palleteLightRoot);
   fullCSS = fullCSS + (palleteDarkRoot);
   fullCSS = fullCSS + elevationsRoot;
   fullCSS = fullCSS + borderRoot;
   fullCSS = fullCSS + bevelRoot;
   fullCSS = fullCSS + avatarRoot ;
   fullCSS = fullCSS + buttonRoot ;
   fullCSS = fullCSS + cardsRoot;
   fullCSS = fullCSS + chipsRoot ;
   fullCSS = fullCSS + dropDownRoot  ;
   fullCSS = fullCSS + spacingRoot ;
   fullCSS = fullCSS + modalRoot ;
   fullCSS = fullCSS + toastRoot;
   fullCSS = fullCSS + tooltopRoot;
   fullCSS = fullCSS + hero ;
   fullCSS = fullCSS + primaryNav ;
   fullCSS = fullCSS + secondaryNav;
   fullCSS = fullCSS + table;
   fullCSS = fullCSS + '}';
   fullCSS = fullCSS + (palleteLight);
   fullCSS = fullCSS + (palleteDark);
   // fullCSS = fullCSS + (states);
   $("#css-code").html(fullCSS);
   // build additional themes //
   buildCSS_mobile();
   buildCSS_tablet();
   buildCSS_noMotion();
   buildCSS_dyslexic();
  }
  function buildCSS_systemRoot() {
    var systemRoot = '';
    systemRoot = systemRoot + '/* system variables */';
    systemRoot = systemRoot  + '--min-target:  '+ minTarget +'; ';
    systemRoot = systemRoot  + '--spacing-1:  '+ grid +'; ';
    systemRoot = systemRoot  + '--border-1:  '+ border +'; ';
    systemRoot = systemRoot  + '--radius-1:  '+ borderRadius + '; ';
    systemRoot = systemRoot  + '--focusBlur:  '+ focusBlur +'; ';
    systemRoot = systemRoot  + '--animation-speed:  '+ animationSpeed + '; ';
    systemRoot = systemRoot  + '--animation-focus-distance:  '+ animationFocusDistance+'; ';
    return(systemRoot);
  }

 /// don;t need //
  function buildCSS_baseRoot() {
    var baseRoot = '';
    baseRoot = baseRoot + '/* core colors */';
    baseRoot = baseRoot + '--transparent: rgba(0,0,0,0); ';
    baseRoot = baseRoot + '--white: #ffffff; ';
    baseRoot = baseRoot + '--white-half: rgba(255, 255, 255, 0.5); ';
    baseRoot = baseRoot + '--on-white: var(--black); ';
    baseRoot = baseRoot + '--black: #121212; ';
    baseRoot = baseRoot + '--black-half: rgba(0,0,0, 0.5); ';
    baseRoot = baseRoot + '--nearblack: #181818; ';
    baseRoot = baseRoot + '--on-black: #ffffff; ';
    baseRoot = baseRoot + '--dm-white: rgba(255, 255, 255, '+dmOpacity+'); ';
    baseRoot = baseRoot + '--dm-textLight: var(--dm-white)';
    baseRoot = baseRoot + '--dm-textDark: var(--black)';
    baseRoot = baseRoot + '--gray-0: #fafafa; ';
    baseRoot = baseRoot + '--gray-100: #e4e4e4 ';
    baseRoot = baseRoot + '--gray-200: #cdcdcd ';
    baseRoot = baseRoot + '--gray-300: #b7b7b7; ';
    baseRoot = baseRoot + '--gray-400: #a0a0a0; ';
    baseRoot = baseRoot + '--gray-500: #8a8a8a; ';
    baseRoot = baseRoot + '--gray-600: #737373; ';
    baseRoot = baseRoot + '--gray-700: #5d5d5d; ';
    baseRoot = baseRoot + '--gray-800: #464646; ';
    baseRoot = baseRoot + '--gray-900: #303030; ';
    baseRoot = baseRoot + '--on-gray-0: var(--black); ';
    baseRoot = baseRoot + '--on-gray-100: var(--black); ';
    baseRoot = baseRoot + '--on-gray-200: var(--black); ';
    baseRoot = baseRoot + '--on-gray-300: var(--black); ';
    baseRoot = baseRoot + '--on-gray-400: var(--black); ';
    baseRoot = baseRoot + '--on-gray-500: var(--white); ';
    baseRoot = baseRoot + '--on-gray-600: var(--white); ';
    baseRoot = baseRoot + '--on-gray-700: var(--white); ';
    baseRoot = baseRoot + '--on-gray-800: var(--white); ';
    baseRoot = baseRoot + '--on-gray-900: var(--white); ';
    baseRoot = baseRoot + '--dm-gray-0: #dfdfdf;';
    baseRoot = baseRoot + '--dm-gray-100: #c8c8c8;';
    baseRoot = baseRoot + '--dm-gray-200: #b1b1b1;';
    baseRoot = baseRoot + '--dm-gray-300: #9b9b9b; ';
    baseRoot = baseRoot + '--dm-gray-400: #858585; ';
    baseRoot = baseRoot + '--dm-gray-500: #6a6a6a; ';
    baseRoot = baseRoot + '--dm-gray-600: #505050; ';
    baseRoot = baseRoot + '--dm-gray-700: #383838; ';
    baseRoot = baseRoot + '--dm-gray-800: #212121; ';
    baseRoot = baseRoot + '--dm-gray-900: #070707; ';
    baseRoot = baseRoot + '--dm-on-gray-0: var(--black); ';
    baseRoot = baseRoot + '--dm-on-gray-100: var(--black); ';
    baseRoot = baseRoot + '--dm-on-gray-200: var(--black); ';
    baseRoot = baseRoot + '--dm-on-gray-300: var(--black); ';
    baseRoot = baseRoot + '--dm-on-gray-400: var(--black); ';
    baseRoot = baseRoot + '--dm-on-gray-500: var(--white); ';
    baseRoot = baseRoot + '--dm-on-gray-600: var(--white); ';
    baseRoot = baseRoot + '--dm-on-gray-700: var(--white); ';
    baseRoot = baseRoot + '--dm-on-gray-800: var(--white); ';
    baseRoot = baseRoot + '--dm-on-gray-900: var(--white); ';
    return(baseRoot);
  }
  function buildCSS_PaletteLightRoot() {
    var lightRoot = '';
    lightRoot = lightRoot + '--primary:   '+ primary +'; ';
    lightRoot = lightRoot + '--primary-0:   '+ window.primary0 +'; ';
    lightRoot = lightRoot + '--primary-100: '+ window.primary100 +';';
    lightRoot = lightRoot + '--primary-200: '+ window.primary200 +';';
    lightRoot = lightRoot + '--primary-300: '+ window.primary300 +'; ';
    lightRoot = lightRoot + '--primary-400: '+ window.primary400 +'; ';
    lightRoot = lightRoot + '--primary-500: '+ window.primary500 +'; ';
    lightRoot = lightRoot + '--primary-600: '+ window.primary600 +'; ';
    lightRoot = lightRoot + '--primary-700: '+ window.primary700 +'; ';
    lightRoot = lightRoot + '--primary-800: '+ window.primary800 +'; ';
    lightRoot = lightRoot + '--primary-900: '+ window.primary900 +' ';
    lightRoot = lightRoot + '--on-primary:   '+ onPrimary +'; ';
    lightRoot = lightRoot + '--on-primary-0: '+ window.onprimary0 +'; ';
    lightRoot = lightRoot + '--on-primary-100: '+ window.onprimary100 +'; ';
    lightRoot = lightRoot + '--on-primary-200: '+ window.onprimary200 +'; ';
    lightRoot = lightRoot + '--on-primary-300: '+ window.onprimary300 +'; ';
    lightRoot = lightRoot + '--on-primary-400: '+ window.onprimary400 +'; ';
    lightRoot = lightRoot + '--on-primary-500: '+ window.onprimary500 +'; ';
    lightRoot = lightRoot + '--on-primary-600: '+ window.onprimary600 +'; ';
    lightRoot = lightRoot + '--on-primary-700: '+ window.onprimary700 +'; ';
    lightRoot = lightRoot + '--on-primary-800: '+ window.onprimary800 +'; ';
    lightRoot = lightRoot + '--on-primary-900: '+ window.onprimary900 +'; ';
    lightRoot = lightRoot + '--secondary:   '+ secondary +'; ';
    lightRoot = lightRoot + '--secondary-0:   '+ window.secondary0 +'; ';
    lightRoot = lightRoot + '--secondary-100: '+ window.secondary100 +';';
    lightRoot = lightRoot + '--secondary-200: '+ window.secondary200 +';';
    lightRoot = lightRoot + '--secondary-300: '+ window.secondary300 +'; ';
    lightRoot = lightRoot + '--secondary-400: '+ window.secondary400 +'; ';
    lightRoot = lightRoot + '--secondary-500: '+ window.secondary500 +'; ';
    lightRoot = lightRoot + '--secondary-600: '+ window.secondary600 +'; ';
    lightRoot = lightRoot + '--secondary-700: '+ window.secondary700 +'; ';
    lightRoot = lightRoot + '--secondary-800: '+ window.secondary800 +'; ';
    lightRoot = lightRoot + '--secondary-900: '+ window.secondary900 +' ';
    lightRoot = lightRoot + '--on-secondary:   '+ onSecondary +'; ';
    lightRoot = lightRoot + '--on-secondary-0: '+ window.onsecondary0 +'; ';
    lightRoot = lightRoot + '--on-secondary-100: '+ window.onsecondary100 +'; ';
    lightRoot = lightRoot + '--on-secondary-200: '+ window.onsecondary200 +'; ';
    lightRoot = lightRoot + '--on-secondary-300: '+ window.onsecondary300 +'; ';
    lightRoot = lightRoot + '--on-secondary-400: '+ window.onsecondary400 +'; ';
    lightRoot = lightRoot + '--on-secondary-500: '+ window.onsecondary500 +'; ';
    lightRoot = lightRoot + '--on-secondary-600: '+ window.onsecondary600 +'; ';
    lightRoot = lightRoot + '--on-secondary-700: '+ window.onsecondary700 +'; ';
    lightRoot = lightRoot + '--on-secondary-800: '+ window.onsecondary800 +'; ';
    lightRoot = lightRoot + '--on-secondary-900: '+ window.onsecondary900 +'; ';
    lightRoot = lightRoot + '--tertiary:   '+ tertiary +'; ';
    lightRoot = lightRoot + '--tertiary-0:   '+ window.tertiary0 +'; ';
    lightRoot = lightRoot + '--tertiary-100: '+ window.tertiary100 +';';
    lightRoot = lightRoot + '--tertiary-200: '+ window.tertiary200 +';';
    lightRoot = lightRoot + '--tertiary-300: '+ window.tertiary300 +'; ';
    lightRoot = lightRoot + '--tertiary-400: '+ window.tertiary400 +'; ';
    lightRoot = lightRoot + '--tertiary-500: '+ window.tertiary500 +'; ';
    lightRoot = lightRoot + '--tertiary-600: '+ window.tertiary600 +'; ';
    lightRoot = lightRoot + '--tertiary-700: '+ window.tertiary700 +'; ';
    lightRoot = lightRoot + '--tertiary-800: '+ window.tertiary800 +'; ';
    lightRoot = lightRoot + '--tertiary-900: '+ window.tertiary900 +' ';
    lightRoot = lightRoot + '--on-tertiary:   '+ onTertiary +'; ';
    lightRoot = lightRoot + '--on-tertiary-0: '+ window.ontertiary0 +'; ';
    lightRoot = lightRoot + '--on-tertiary-100: '+ window.ontertiary100 +'; ';
    lightRoot = lightRoot + '--on-tertiary-200: '+ window.ontertiary200 +'; ';
    lightRoot = lightRoot + '--on-tertiary-300: '+ window.ontertiary300 +'; ';
    lightRoot = lightRoot + '--on-tertiary-400: '+ window.ontertiary400 +'; ';
    lightRoot = lightRoot + '--on-tertiary-500: '+ window.ontertiary500 +'; ';
    lightRoot = lightRoot + '--on-tertiary-600: '+ window.ontertiary600 +'; ';
    lightRoot = lightRoot + '--on-tertiary-700: '+ window.ontertiary700 +'; ';
    lightRoot = lightRoot + '--on-tertiary-800: '+ window.ontertiary800 +'; ';
    lightRoot = lightRoot + '--on-tertiary-900: '+ window.ontertiary900 +'; ';
   return(lightRoot)
  }
  function buildCSS_PaletteDarkRoot() {
    var darkRoot = '';
    darkRoot = darkRoot + '--dm-primary:   '+ dmprimary +'; ';
    darkRoot = darkRoot + '--dm-primary-0:   '+ window.dmprimary0 +'; ';
    darkRoot = darkRoot + '--dm-primary-100: '+ window.dmprimary100 +';';
    darkRoot = darkRoot + '--dm-primary-200: '+ window.dmprimary200 +';';
    darkRoot = darkRoot + '--dm-primary-300: '+ window.dmprimary300 +'; ';
    darkRoot = darkRoot + '--dm-primary-400: '+ window.dmprimary400 +'; ';
    darkRoot = darkRoot + '--dm-primary-500: '+ window.dmprimary500 +'; ';
    darkRoot = darkRoot + '--dm-primary-600: '+ window.dmprimary600 +'; ';
    darkRoot = darkRoot + '--dm-primary-700: '+ window.dmprimary700 +'; ';
    darkRoot = darkRoot + '--dm-primary-800: '+ window.dmprimary800 +'; ';
    darkRoot = darkRoot + '--dm-primary-900: '+ window.dmprimary900 +' ';
    darkRoot = darkRoot + '--dm-on-primary:   '+ dmonprimary +'; ';
    darkRoot = darkRoot + '--dm-on-primary-0: '+ window.dmonprimary0 +'; ';
    darkRoot = darkRoot + '--dm-on-primary-100: '+ window.dmonprimary100 +'; ';
    darkRoot = darkRoot + '--dm-on-primary-200: '+ window.onprimary200 +'; ';
    darkRoot = darkRoot + '--dm-on-primary-300: '+ window.onprimary300 +'; ';
    darkRoot = darkRoot + '--dm-on-primary-400: '+ window.onprimary400 +'; ';
    darkRoot = darkRoot + '--dm-on-primary-500: '+ window.onprimary500 +'; ';
    darkRoot = darkRoot + '--dm-on-primary-600: '+ window.onprimary600 +'; ';
    darkRoot = darkRoot + '--dm-on-primary-700: '+ window.onprimary700 +'; ';
    darkRoot = darkRoot + '--dm-on-primary-800: '+ window.onprimary800 +'; ';
    darkRoot = darkRoot + '--dm-on-primary-900: '+ window.onprimary900 +'; ';
    darkRoot = darkRoot + '--dm-secondary:   '+ dmsecondary +'; ';
    darkRoot = darkRoot + '--dm-secondary-0:   '+ window.secondary0 +'; ';
    darkRoot = darkRoot + '--dm-secondary-100: '+ window.secondary100 +';';
    darkRoot = darkRoot + '--dm-secondary-200: '+ window.secondary200 +';';
    darkRoot = darkRoot + '--dm-secondary-300: '+ window.secondary300 +'; ';
    darkRoot = darkRoot + '--dm-secondary-400: '+ window.secondary400 +'; ';
    darkRoot = darkRoot + '--dm-secondary-500: '+ window.secondary500 +'; ';
    darkRoot = darkRoot + '--dm-secondary-600: '+ window.secondary600 +'; ';
    darkRoot = darkRoot + '--dm-secondary-700: '+ window.secondary700 +'; ';
    darkRoot = darkRoot + '--dm-secondary-800: '+ window.secondary800 +'; ';
    darkRoot = darkRoot + '--dm-secondary-900: '+ window.secondary900 +' ';
    darkRoot = darkRoot + '--dm-on-secondary:   '+ dmonsecondary +'; ';
    darkRoot = darkRoot + '--dm-on-secondary-0: '+ window.onsecondary0 +'; ';
    darkRoot = darkRoot + '--dm-on-secondary-100: '+ window.onsecondary100 +'; ';
    darkRoot = darkRoot + '--dm-on-secondary-200: '+ window.onsecondary200 +'; ';
    darkRoot = darkRoot + '--dm-on-secondary-300: '+ window.onsecondary300 +'; ';
    darkRoot = darkRoot + '--dm-on-secondary-400: '+ window.onsecondary400 +'; ';
    darkRoot = darkRoot + '--dm-on-secondary-500: '+ window.onsecondary500 +'; ';
    darkRoot = darkRoot + '--dm-on-secondary-600: '+ window.onsecondary600 +'; ';
    darkRoot = darkRoot + '--dm-on-secondary-700: '+ window.onsecondary700 +'; ';
    darkRoot = darkRoot + '--dm-on-secondary-800: '+ window.onsecondary800 +'; ';
    darkRoot = darkRoot + '--dm-on-secondary-900: '+ window.onsecondary900 +'; ';
    darkRoot = darkRoot + '--dm-tertiary:   '+ dmtertiary +'; ';
    darkRoot = darkRoot + '--dm-tertiary-0:   '+ window.tertiary0 +'; ';
    darkRoot = darkRoot + '--dm-tertiary-100: '+ window.tertiary100 +';';
    darkRoot = darkRoot + '--dm-tertiary-200: '+ window.tertiary200 +';';
    darkRoot = darkRoot + '--dm-tertiary-300: '+ window.tertiary300 +'; ';
    darkRoot = darkRoot + '--dm-tertiary-400: '+ window.tertiary400 +'; ';
    darkRoot = darkRoot + '--dm-tertiary-500: '+ window.tertiary500 +'; ';
    darkRoot = darkRoot + '--dm-tertiary-600: '+ window.tertiary600 +'; ';
    darkRoot = darkRoot + '--dm-tertiary-700: '+ window.tertiary700 +'; ';
    darkRoot = darkRoot + '--dm-tertiary-800: '+ window.tertiary800 +'; ';
    darkRoot = darkRoot + '--dm-tertiary-900: '+ window.tertiary900 +' ';
    darkRoot = darkRoot + '--dm-on-tertiary:   '+ dmontertiary +'; ';
    darkRoot = darkRoot + '--dm-on-tertiary-0: '+ window.ontertiary0 +'; ';
    darkRoot = darkRoot + '--dm-on-tertiary-100: '+ window.ontertiary100 +'; ';
    darkRoot = darkRoot + '--dm-on-tertiary-200: '+ window.ontertiary200 +'; ';
    darkRoot = darkRoot + '--dm-on-tertiary-300: '+ window.ontertiary300 +'; ';
    darkRoot = darkRoot + '--dm-on-tertiary-400: '+ window.ontertiary400 +'; ';
    darkRoot = darkRoot + '--dm-on-tertiary-500: '+ window.ontertiary500 +'; ';
    darkRoot = darkRoot + '--dm-on-tertiary-600: '+ window.ontertiary600 +'; ';
    darkRoot = darkRoot + '--dm-on-tertiary-700: '+ window.ontertiary700 +'; ';
    darkRoot = darkRoot + '--dm-on-tertiary-800: '+ window.ontertiary800 +'; ';
    darkRoot = darkRoot + '--dm-on-tertiary-900: '+ window.ontertiary900 +'; ';
   return(darkRoot)
  }
  function buildCSS_OnRoot() {
    var onRoot = '';
    onRoot = onRoot + '--buttonOnWhite:   var(--'+ buttonOnWhite +'); ';
    onRoot = onRoot + '--buttonHalfOnWhite: var(--'+ buttonHalfOnWhite +'); ';
    onRoot = onRoot + '--onbuttonOnWhite:  var(--'+ onbuttonOnWhite +'); ';
    onRoot = onRoot + '--linkOnWhite: var(--'+ linkOnWhite +'); ';
    onRoot = onRoot + '--linkDecorationOnWhite '+ linkDecorationOnWhite +'; ';
    onRoot = onRoot + '--iconOnWhite: var(--'+ iconOnWhite +'); ';
    onRoot = onRoot + '--dmbuttonOnWhite: var(--'+ dmbuttonOnWhite +'); ';
    onRoot = onRoot + '--dmbuttonHalfOnWhite: var(--'+ dmbuttonHalfOnWhite +'); ';
    onRoot = onRoot + '--dmiconOnWhite: var(--'+ dmiconOnWhite +'); ';
    onRoot = onRoot + '--buttonOnBlack:   var(--'+ buttonOnBlack  +'); ';
    onRoot = onRoot + '--buttonHalfOnBlack: var(--'+ buttonHalfOnBlack +'); ';
    onRoot = onRoot + '--onbuttonOnBlack:  var(--'+ onbuttonOnBlack +'); ';
    onRoot = onRoot + '--hotlinkOnBlack: var(--'+ hotlinkOnBlack +'); ';
    onRoot = onRoot + '--hotlinkDecorationOnBlack: '+ hotlinkDecorationOnBlack +'; ';
    onRoot = onRoot + '--iconOnBlack: var(--'+ iconOnBlack +'); ';
    onRoot = onRoot + '--dmbuttonOnBlack: var(--'+ dmbuttonOnBlack +'); ';
    onRoot = onRoot + '--dmbuttonHalfOnBlack: var(--'+ dmbuttonHalfOnBlack +'); ';
    onRoot = onRoot + '--dmiconOnBlack: var(--'+ dmiconOnBlack +'); ';
    onRoot = onRoot + '--buttonOnTertiary:   var(--'+ buttonOnTertiary +'); ';
    onRoot = onRoot + '--buttonHalfOnTertiary:  var(--'+ buttonHalfOnTertiary +'); ';
    onRoot = onRoot + '--onbuttonOnTertiary: var(--'+ onbuttonOnTertiary +'); ';
    onRoot = onRoot + '--linkOnTertiary: var(--'+ linkOnTertiary +'); ';
    onRoot = onRoot + '--linkDecorationOnTertiary: '+ linkDecorationOnTertiary+'; ';
    onRoot = onRoot + '--iconOnTertiary: var(--'+ iconOnTertiary +'); ';
    onRoot = onRoot + '--dmbuttonOnTertiary: var(--'+ dmbuttonOnTertiary +'); ';
    onRoot = onRoot + '--dmbuttonHalfOnTertiary: var(--'+ dmbuttonHalfOnTertiary +'); ';
    onRoot = onRoot + '--dmhotlinkOnTertiary: var(--'+ dmhotlinkOnTertiary +'); ';
    onRoot = onRoot + '--dmhotlinkDecorationOnTertiary: '+ dmhotlinkDecorationOnTertiary +'; ';
    onRoot = onRoot + '--dmiconOnTertiary: var(--'+ dmiconOnTertiary +'); ';
    onRoot = onRoot + '--buttonOnGradient1: var(--'+ buttonOnGradient1 +'); ';
    onRoot = onRoot + '--buttonHalfOnGradient1:  var(--'+ buttonHalfOnGradient1+'); ';
    onRoot = onRoot + '--onbuttonOnGradient1:  var(--'+ onbuttonOnGradient1 +'); ';
    onRoot = onRoot + '--dmbuttonOnGradient1: var(--'+ dmbuttonOnGradient1 +'); ';
    onRoot = onRoot + '--dmbuttonHalfOnGradient1: var(--'+ dmbuttonHalfOnGradient1 +');';
    onRoot = onRoot + '--buttonOnGradient2:  var(--'+ buttonOnGradient2 +'); ';
    onRoot = onRoot + '--buttonHalfOnGradient2: var(--'+ buttonHalfOnGradient2 +'); ';
    onRoot = onRoot + '--onbuttonOnGradient2: var(--'+ onbuttonOnGradient2 +'); ';
    onRoot = onRoot + '--dmbuttonOnGradient2: var(--'+ dmbuttonOnGradient2 +'); ';
    onRoot = onRoot + '--dmbuttonHalfOnGradient2: var(--'+ dmbuttonHalfOnGradient2 +'); ';
    onRoot = onRoot + '--dmbuttonHalfOnGradient2: var(--'+ dmbuttonHalfOnGradient2 +'); ';
    onRoot = onRoot + '--buttonOnGradient3:  var(--'+ buttonOnGradient3 +'); ';
    onRoot = onRoot + '--buttonHalfOnGradient3:  var(--'+ buttonHalfOnGradient3 +'); ';
    onRoot = onRoot + '--onbuttonOnGradient3:  var(--'+ onbuttonOnGradient3 +'); ';
    onRoot = onRoot + '--linkOnGradient3:  var(--'+ linkOnGradient3 +'); ';
    //onRoot = onRoot + '--linkDecorationOnGradient3  var(--'+ linkDecorationOnGradient3 +'); ';
    onRoot = onRoot + '--iconOnGradient3:  var(--'+ iconOnGradient3 +'); ';
    onRoot = onRoot + '--dmbuttonOnGradient3:  var(--'+ dmbuttonOnGradient3+'); ';
    onRoot = onRoot + '--dmbuttonHalfOnGradient3:  var(--'+ dmbuttonHalfOnGradient3 +'); ';
    onRoot = onRoot + '--dmhotlinkOnGradient3:  var(--'+ dmhotlinkOnGradient3 +'); ';
    //onRoot = onRoot + '--dmlinkDecorationOnGradient3:'  + dmlinkDecorationOnGradient3 +'; ';
    onRoot = onRoot + '--dmiconOnGradient3:  var(--'+ dmiconOnGradient3 +'); ';
    return(onRoot)
  }

  function buildCSS_SpacingRoot() {
  var spacingCSS = '';
    spacingCSS = spacingCSS + '--spacing-0: 0; ';
    spacingCSS = spacingCSS + '--spacing-1: '+ grid +'px; ';
    return(spacingCSS)
  }
  function builCSS_TypographyRoot() {
    var typoCSS = '';
    typoCSS      = typoCSS + '--primaryFont:  '+ primaryFont +'; ';
    typoCSS      = typoCSS + '--secondaryFont : '+ secondaryFont +'; ';
    typoCSS      = typoCSS + '--fontWeight-0: '+ fontWeight0 +'; ';
    typoCSS      = typoCSS + '--fontWeight-1: '+ fontWeight1 +'; ';
    typoCSS      = typoCSS + '--fontWeight-2 '+ fontWeight2 +'; ';
    typoCSS      = typoCSS + '--fontWeight-3: '+ fontWeight3 +'; ';
    typoCSS      = typoCSS + '--fontWeight-4: '+ fontWeight4 +'; ';
    typoCSS      = typoCSS + '--headerChange: '+ headerChange  +'; ';
    typoCSS      = typoCSS + '--headerWeight: '+ headerWeight +'; ';
    typoCSS      = typoCSS + '--baseFont: '+ baseFont +'; ';
    typoCSS      = typoCSS + '--standard-LineHeight: '+ lineHeight +'; ';
    typoCSS      = typoCSS + '--sm-LineHeight: '+ smLineHeight;+'; ';
    return(typoCSS )
  }
  function buildCSS_StatesRoot() {
    var statesCSS     = '';
    statesCSS = statesCSS + '--info: '+ info +'; ';
    statesCSS = statesCSS + '--success: '+ success +'; ';
    statesCSS = statesCSS + '--warning: '+ warning +'; ';
    statesCSS = statesCSS + '--danger: '+ danger +'; ';
    statesCSS = statesCSS + '--on-info: '+ oninfo +'; ';
    statesCSS = statesCSS + '--on-success: '+ onsuccess +'; ';
    statesCSS = statesCSS + '--on-warning: '+ onwarning +'; ';
    statesCSS = statesCSS + '--on-danger: '+ ondanger +'; ';
    statesCSS = statesCSS + '--dm-info: '+ dminfo +'; ';
    statesCSS = statesCSS + '--dm-success: '+ dmsuccess +'; ';
    statesCSS = statesCSS + '--dm-warning: '+ dmwarning +'; ';
    statesCSS = statesCSS + '--dm-danger: '+ dmdanger +'; ';
    statesCSS = statesCSS + '--dm-on-info: '+ dmoninfo +'; ';
    statesCSS = statesCSS + '--dm-on-success: '+ dmonsuccess +'; ';
    statesCSS = statesCSS + '--dm-on-warning: '+ dmonwarning +'; ';
    statesCSS = statesCSS + '--dm-on-danger: '+ dmondanger +'; ';
    return(statesCSS)

  }
  function buildCSS_borderRoot() {
    var borderCSS = '';
    borderCSS  = borderCSS  + '--border-1: ' + border + '; ' ;
    borderCSS  = borderCSS  + '--radius-1: '+ borderRadius + '; ';
    return(borderCSS)
  }
  function buildCSS_elevationRoot() {
    var elevationCSS = '';
    elevationCSS = elevationCSS  + '--elevation-rgb: '+ elevationRGB + '; ';
    elevationCSS = elevationCSS  + '--elevation-change: '+ elevationChange + '; ';
    elevationCSS = elevationCSS  + '--base-blur: '+ baseBlur + '; ';
    elevationCSS = elevationCSS  + '--base-spread: '+ baseSpread + '; ';
    elevationCSS = elevationCSS  + '--base-opacity: '+ baseOpacity + '; ';
    elevationCSS = elevationCSS  + '--elevation-horizontal: '+ elevationHorizontal+ '; ';
    elevationCSS = elevationCSS  + '--elevation-veritcal: '+ elevationVertical + '; ';
    elevationCSS = elevationCSS  + '--elevation-blur: '+ elevationBlur+ '; ';
    elevationCSS = elevationCSS  + '--elevation-spread: '+ elevationSpread + '; ';
    elevationCSS = elevationCSS  + '--elevation-opacity: '+ elevationOpacity + '; ';
    elevationCSS = elevationCSS  + '--elevation-bg-1: '+ elevation1 + '; ';
    elevationCSS = elevationCSS  + '--elevation-bg-2: '+ elevation2 + '; ';
    elevationCSS = elevationCSS  + '--elevation-bg-3: '+ elevation3 + '; ';
    elevationCSS = elevationCSS  + '--elevation-bg-4: '+ elevation4 + '; ';
    elevationCSS = elevationCSS  + '--elevation-bg-5: '+ elevation5 + '; ';
    elevationCSS = elevationCSS  + '--elevation-bg-6: '+ elevation6 + '; ';
    elevationCSS = elevationCSS  + '--elevation-bg-7: '+ elevation7 + '; ';
    elevationCSS = elevationCSS  + '--elevation-bg-8: '+ elevation8 + '; ';
    elevationCSS = elevationCSS  + '--elevation-bg-9: '+ elevation9 + '; ';
    return(elevationCSS)
  }
  function buildCSS_bevelsRoot() {
    var bevelsCSS = '';
    bevelsCSS = bevelsCSS  + '--bevel-light-opacity: '+ bevellightOpacity + '; ';
    bevelsCSS = bevelsCSS  + '--bevel-dark-opacity: '+ beveldarkOpacity + '; ';
    bevelsCSS = bevelsCSS  + '--bevel-change '+ bevelchange + '; ';
    bevelsCSS = bevelsCSS  + '--bevel-blur: '+ bevelBlur + '; ';
    bevelsCSS = bevelsCSS  + '--bevel-spread: '+ bevelSpread + '; ';
    bevelsCSS = bevelsCSS  + '--bevel-veritcal: '+ bevelvertical + '; ';
    bevelsCSS = bevelsCSS  + '--bevel-horizontal: '+ bevelhorizontal+ '; ';
    bevelsCSS = bevelsCSS  + '--inbevel-dark-opacity: '+ inbeveldarkOpacity + '; ';
    bevelsCSS = bevelsCSS  + '--inbevel-change: '+ inbevelchange + '; ';
    bevelsCSS = bevelsCSS  + '--inbevel-blur: '+ inbevelBlur + '; ';
    bevelsCSS = bevelsCSS  + '--inbevel-spread: '+ inbevelSpread + '; ';
    bevelsCSS = bevelsCSS  + '--inbevel-veritcal: '+ inbevelvertical + '; ';
    bevelsCSS = bevelsCSS  + '--inbevel-horizontal: '+ inbevelhorizontal+ '; ';
    return(bevelsCSS)
  }
  function buildCSS_defaultThemeRoot() {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var themeCSS = '';
      themeCSS  = themeCSS  + '--primary: '+ primary +'; ';
      themeCSS  = themeCSS  + '--primary-half: ' + primaryHalf + ';';
      themeCSS  = themeCSS  + '--primary-quarter: ' + primaryQuarter + ';';
      themeCSS  = themeCSS  + '--on-primary: '+ onPrimary +'; ';
      themeCSS  = themeCSS  + '--secondary: '+ secondary +'; ';
      themeCSS  = themeCSS  + '--on-secondary: '+ onSecondary +'; ';
      themeCSS  = themeCSS  + '--tertiary:' + tertiary +'; ';
      themeCSS  = themeCSS  + '--on-tertiary: '+ onTertiary +'; ';
      themeCSS  = themeCSS  + '--button: var(--'+ buttonsName +'); ';
      themeCSS  = themeCSS  + '--button-half: ' + buttonHalf +'; ';
      themeCSS  = themeCSS  + '--groupButtonBG: '+ groupButtonBG +'; ';
      themeCSS  = themeCSS  + '--on-groupButtonBG: '+ ongroupButtonBG +'; ';
      themeCSS  = themeCSS  + '--on-button: var(--on-'+ buttonsName +'); ';
      themeCSS  = themeCSS  + '--icon: var(--'+ iconsName +'); ';
      themeCSS  = themeCSS  + '--on-icon: var(--on-'+ iconsName +'); ';
      themeCSS  = themeCSS  + '--background: var(--'+ backgroundPrimaryName + '); ';
      themeCSS  = themeCSS  + '--on-background: var(--on-' + backgroundPrimaryName + '); ';
      themeCSS  = themeCSS  + '--background-secondary: var(--' + backgroundSecondaryName + '); ';
      themeCSS  = themeCSS  + '--on-background-secondary: var(--on-' + backgroundSecondaryName + '); ';
      themeCSS  = themeCSS  + '--background-tertiary: var(--primary); ';
      themeCSS  = themeCSS  + '--on-background-tertiary: var(--on-primary); ';
      themeCSS  = themeCSS  + '--gradient1-a: var(--'+ gradient1aName +'); ';
      themeCSS  = themeCSS  + '--gradient1-b: var(--'+ gradient1bName +'); ';
      themeCSS  = themeCSS  + '--on-gradient-1: var(--on-'+ gradient1aName +'); ';
      themeCSS  = themeCSS  + '--gradient2-a: var(--'+ gradient2aName +'); ';
      themeCSS  = themeCSS  + '--gradient2-b: var(--'+ gradient2bName +'); ';
      themeCSS  = themeCSS  + '--on-gradient-2: var(--on-'+ gradient2aName +'); ';
      themeCSS  = themeCSS  + '--text-gradient-a: var(--'+ textgradient1aName +'); ';
      themeCSS  = themeCSS  + '--text-gradient-b: var(--'+ textgradient1bName +'); ';
      themeCSS  = themeCSS  + '--accent: var(--'+ accentName +'); ';
      themeCSS  = themeCSS  + '--color-drop: var(--'+ colorDropName +'); ';
      themeCSS  = themeCSS  + '--border: var(--'+ borderColor +'); ';
      themeCSS  = themeCSS  + '--surface: var(--'+ surface +'); ';
      themeCSS  = themeCSS  + '--chip: var(--'+ chip  +'); ';
      themeCSS  = themeCSS  + '--on-chip: var(--'+ onchip  +'); ';
      themeCSS  = themeCSS  + '--input: var(--'+ inputDefault +'); ';
      themeCSS  = themeCSS  + '--on-input: var(--'+ oninputDefault +'); ';
      themeCSS  = themeCSS  + '--input-disabled: var(--'+ inputDisabled  +'); ';
      themeCSS  = themeCSS  + '--hotlink: var(--'+ hotlink  +'); ';
      themeCSS  = themeCSS  + '--dm-primary: var(--'+ dmprimaryName +'); ';
      themeCSS  = themeCSS  + '--dm-on-primary: var(--on-'+ dmprimaryName +'); ';
      themeCSS  = themeCSS  + '--dm-secondary: var(--'+ dmsecondaryName +'); ';
      themeCSS  = themeCSS  + '--dm-on-secondary: var(--on-'+ dmsecondaryName +'); ';
      themeCSS  = themeCSS  + '--dm-tertiary: var(--'+ dmtertiaryName  +'); ';
      themeCSS  = themeCSS  + '--dm-on-tertiary: var(--on-'+ dmtertiaryName  +'); ';
      themeCSS  = themeCSS  + '--dm-accent: var(--'+ dmaccentName +'); ';
      themeCSS  = themeCSS  + '--dm-button: var(--'+ dmbuttonsName +'); ';
      themeCSS  = themeCSS  + '--dm-button-half: '+ dmbuttonHalf +'; ';
      themeCSS  = themeCSS  + '--dm-groupButtonBG: '+ dmgroupButtonBG +'; ';
      themeCSS  = themeCSS  + '--dm-on-groupButtonBG: '+ dmongroupButtonBG +'); ';
      themeCSS  = themeCSS  + '--dm-on-button: var(--on-'+ dmbuttonsName +'); ';
      themeCSS  = themeCSS  + '--dm-icon: var(--'+ dmiconsName +'); ';
      themeCSS  = themeCSS  + '--dm-on-icon: var(--on-'+ dmiconsName +'); ';
      themeCSS  = themeCSS  + '--dm-background: var(--' + dmbackgroundPrimaryName  + '); ';
      themeCSS  = themeCSS  + '--dm-on-background: var(--on-' + dmbackgroundPrimaryName  + '); ';
      themeCSS  = themeCSS  + '--dm-background-secondary: var(--' + dmbackgroundSecondaryName + '); ';
      themeCSS  = themeCSS  + '--dm-on-background-secondary: var(--on-' + dmbackgroundSecondary  + '); ';
      themeCSS  = themeCSS  + '--dm-background-tertiary: var(--'+ dmprimaryName +'); ';
      themeCSS  = themeCSS  + '--dm-on-background-tertiary: var(--on-'+dmprimaryName+'); ';
      themeCSS  = themeCSS  + '--dmgradient1-a: var(--'+ dmgradient1Name.split(',')[0] +'); ';
      themeCSS  = themeCSS  + '--dmgradient1-b: var(--'+ dmgradient1Name.split(',')[1]  +'); ';
      themeCSS  = themeCSS  + '--dm-on-gradient-1: var(--on-'+ dmgradient1Name.split(',')[0] +'); ';
      themeCSS  = themeCSS  + '--dm-gradient2-a: var(--'+ dmgradient2Name.split(',')[0]  +'); ';
      themeCSS  = themeCSS  + '--dm-gradient2-b: var(--'+ dmgradient1Name.split(',')[1]  +'); ';
      themeCSS  = themeCSS  + '--dm-on-gradient-2: var(--on-'+ dmgradient2Name.split(',')[0] +'); ';
      themeCSS  = themeCSS  + '--dm-text-gradient-a: var(--'+ dmtextGradientName.split(',')[0] +'); ';
      themeCSS  = themeCSS  + '--dm-text-gradient-b: var(--'+ dmtextGradientName.split(',')[1] +'); ';
      themeCSS  = themeCSS  + '--dm-accent: var(--'+ dmaccentName +'); ';
      themeCSS  = themeCSS  + '--dm-color-drop: var(--'+ dmcolorDropName +'); ';
      themeCSS  = themeCSS  + '--dm-border: '+ dmBorderColor +'; ';
      themeCSS  = themeCSS  + '--dm-surface: '+ dmsurface +'; ';
      themeCSS  = themeCSS  + '--dm-chip: '+ dmchip  +'; ';
      themeCSS  = themeCSS  + '--dm-on-chip: '+ dmonchip  +'; ';
      themeCSS  = themeCSS  + '--dm-input: '+ dminputDefault +'; ';
      themeCSS  = themeCSS  + '--dm-on-input: '+ dmoninputDefault +'; ';
      themeCSS  = themeCSS  + '--dm-input-disabled:'+ dminputDisabled  +'; ';
      themeCSS  = themeCSS  + '--dm-hotlink: var(--'+ dmhotlink  +'); ';
      return(themeCSS)
    }
  }
  function buildCSS_avatars() {
    var avatarCSS = '';
    avatarCSS = avatarCSS  + '--avatar-border: '+ avatarBorder + '; ';
    avatarCSS = avatarCSS  + '--avatar-border-lg: '+ avatarBorderLg + '; ';
    avatarCSS = avatarCSS  + '--avatar-elevation: '+ avatarElevations + '; ';
    return(avatarCSS)
  }
  function buildCSS_buttons() {
    var buttonCSS = '';
    buttonCSS = buttonCSS  + '--button-padding: '+ buttonHPadding + '; ';
    buttonCSS = buttonCSS  + '--button-border: '+ buttonBorder + '; ';
    buttonCSS = buttonCSS  + '--button-radius: '+ buttonBorderRadius + '; ';
    buttonCSS = buttonCSS  + '--button-minwidth: '+ buttonMinWidth + '; ';
    buttonCSS = buttonCSS  + '--buttonTypography: '+ buttonTypography+ '; ';
    buttonCSS = buttonCSS  + '--buttonTextTransform: '+ buttonTextTransform + '; ';
    buttonCSS = buttonCSS  + '--buttonCharcterSpacing: '+ buttonLetterSpacing + '; ';
    buttonCSS = buttonCSS  + '--button-elevation: '+ buttonElevation + '; ';
    buttonCSS = buttonCSS  + '--button-bevel: '+ buttonBevel + '; ';
    buttonCSS = buttonCSS  + '--sm-button-height: '+ smallButtonHeight + '; ';
    buttonCSS = buttonCSS  + '--sm-button-padding: '+ smallbuttonHPadding + '; ';
    buttonCSS = buttonCSS  + '--sm-button-textName: '+ smallButtonTextName + '; ';
    buttonCSS = buttonCSS  + '--sm-buttonTextTransform: '+ smallbuttonTextTransform + '; ';
    buttonCSS = buttonCSS  + '--sm-buttonCharcterSpacing: '+ smallbuttonTextTransform + '; ';
    return(buttonCSS)
  }
  function buildCSS_cards() {
    var cardCSS = '';
    cardCSS = cardCSS  + '--card-padding: '+ cardPadding + '; ';
    cardCSS = cardCSS  + '--card-gap: '+ cardGap + '; ';
    cardCSS = cardCSS  + '--card-border: '+ cardBorder+ '; ';
    cardCSS = cardCSS  + '--card-radius: '+ cardRadius + '; ';
    cardCSS = cardCSS  + '--card-elevation: '+ cardElevation + '; ';
    cardCSS = cardCSS  + '--card-bevel: '+ cardBevel + '; ';
    return(cardCSS)
  }
  function buildCSS_chips() {
    var chipsCSS = '';
    chipsCSS = chipsCSS  + '--chip-padding: '+ chipHPadding + '; ';
    chipsCSS = chipsCSS  + '--chip-radius: '+ chipBorderRadius + '; ';
    chipsCSS = chipsCSS  + '--chip-minwidth: '+ chipMinWidth + '; ';
    chipsCSS = chipsCSS  + '--chip-height: '+ chipHeight + '; ';
    chipsCSS = chipsCSS  + '--chip-font: '+ chipTypography + '; ';
    chipsCSS = chipsCSS  + '--chip-character-spacing: '+ chipTextSpacing + '; ';
    chipsCSS = chipsCSS  + '--chip-transform: '+ chipTextTransform + '; ';
    chipsCSS = chipsCSS  + '--chip-elevation: '+ chipElevation + '; ';
    return(chipsCSS)
  }
  function buildCSS_dropdowns() {
    var dropdownCSS = '';
    dropdownCSS = dropdownCSS  + '--dropdown-focus-theme: '+ dropdownTheme + '; ';
    dropdownCSS = dropdownCSS  + '--dropdown-elevation: '+ dropdownElevation + '; ';
    dropdownCSS = dropdownCSS  + '--dropdown-radius: '+  dropdownRadius + '; ';
    return(dropdownCSS)
  }
  function buildCSS_spacing() {
    var spacingCSS = '';
    spacingCSS = spacingCSS + '--p-padding: '+ pPadding + '; ';
    spacingCSS = spacingCSS  + '--section-padding: '+ sectionPadding + '; ';
    return(spacingCSS)
  }
  function buildCSS_images() {
    var imagesCSS = '';
    imagesCSS = imagesCSS  + '--image-elevation: '+ imageElevation + '; ';
    imagesCSS = imagesCSS  + '--image-radius: '+ imageRadius + '; ';
    imagesCSS = imagesCSS  + '--image-border: '+ imageBorder + '; ';
    imagesCSS = imagesCSS  + '--inline-image-height: '+ inlineImageHeight + '; ';
    imagesCSS = imagesCSS  + '--inline-image-image-radius: '+ inlineImageRadius + '; ';
    return(imagesCSS)
  }
  function buildCSS_modals() {
    var modalCSS = '';
    modalCSS = modalCSS  + '--modal-padding: '+ modalPadding + '; ';
    modalCSS = modalCSS  + '--modal-border: '+ modalBorder + '; ';
    modalCSS = modalCSS  + '--modal-radius: '+ modalRadius + '; ';
    modalCSS = modalCSS  + '--modal-overlay: '+ modalOverlay + '; ';
    modalCSS = modalCSS  + '--modal-elevation: '+ modalElevation+ '; ';
    return(modalCSS)
  }
  function buildCSS_sliders() {
    var sliderCSS= '';
    sliderCSS= sliderCSS + '--sliderbarHeight: '+ sliderbarHeight + '; ';
    sliderCSS= sliderCSS + '--sliderhandleHeight: '+ sliderhandleHeight + '; ';
    sliderCSS= sliderCSS + '--sliderhandleRadius: '+ sliderhandleRadius + '; ';
    sliderCSS= sliderCSS + '--sliderbarBevel: '+ sliderbarBevel + '; ';
    sliderCSS= sliderCSS + '--sliderhandleElevation: '+ sliderhandleElevation + '; ';
    sliderCSS= sliderCSS + '--sliderhandleBevel: '+ sliderhandleBevel + '; ';
    return(sliderCSS)
  }
  function buildCSS_toasts() {
    var toastCSS = '';
    toastCSS = toastCSS  + '--toast-padding: '+ toastPadding+ '; ';
    toastCSS = toastCSS  + '--toast-radius: '+ toastRadius + '; ';
    toastCSS = toastCSS  + '--toast-bevel: '+ toastBevel + '; ';
    toastCSS = toastCSS  + '--toast-elevation: '+ toastElevations+ '; ';
    return(toastCSS)
  }
  function buildCSS_tooltip() {
    var tooltipCSS = '';
    tooltipCSS = tooltipCSS  + '--tooltip-padding: '+ tooltipPadding+ '; ';
    tooltipCSS = tooltipCSS  + '--tooltip-borderRadius: '+ tooltipRadius + '; ';
    tooltipCSS = tooltipCSS  + '--tooltip-elevation:' + tooltipElevation + '; ';
    tooltipCSS = tooltipCSS  + '--tooltip-bevel:' + tooltipBevel + '; ';
    return(tooltipCSS)
  }
  function buildCSS_hero() {
    var heroCSS = '';
    heroCSS    = heroCSS  + '--hero-gap: '+ heroGap+ '; ';
    heroCSS    = heroCSS  + '--hero-body-textName: '+ heroBodyTextName + '; ';
    heroCSS    = heroCSS  + '--hero-body-spacing:' + heroBodySpacing + '; ';
    heroCSS    = heroCSS  + '--hero-body-transform:' + heroBodyTransform + '; ';
    heroCSS    = heroCSS  + '--hero-title-textName: '+ heroTitleTextName + '; ';
    heroCSS    = heroCSS  + '--hero-title-spacing:' + heroTitleSpacing + '; ';
    heroCSS    = heroCSS  + '--hero-title-transform:' + heroTitleTransform + '; ';
    heroCSS    = heroCSS  + '--hero-padding:' + heroPadding + '; ';
    return(heroCSS)
  }
  function buildCSS_primaryNav() {
    var primaryNavCSS = '';
    primaryNavCSS = primaryNavCSS  + '--navbarPrimary-position: '+ primaryNavFixed+ '; ';
    primaryNavCSS = primaryNavCSS  + '--navbarPrimary-padding: '+ primaryNavVPadding+ '; ';
    return(primaryNavCSS)
  }
  function buildCSS_secondaryNav() {
    var secondaryNavCSS = '';
    secondaryNavCSS = secondaryNavCSS  + '--navbarSecondary-position: '+ secondaryNavSticky+ '; ';
    secondaryNavCSS = secondaryNavCSS  + '--navbarSecondary-padding: '+ secondaryNavVPadding+ '; ';
    secondaryNavCSS = secondaryNavCSS  + '--navbarSecondary-stickyat: '+ secondaryNavStickyAt+ '; ';
    return(secondaryNavCSS)
  }
  function buildCSS_table() {
    var tableCSS = '';
    tableCSS = tableCSS  + '--tableheaderText: '+ tableheaderTextName+ '; ';
    tableCSS = tableCSS  + '--tableheaderSpacing: '+ tableheaderSpacing+ '; ';
    tableCSS = tableCSS  + '--tableheaderTransform: '+ tableheaderTransform+ '; ';
    tableCSS = tableCSS  + '--tablebodyText: '+ tablebodyTextName+ '; ';
    tableCSS = tableCSS  + '--tablebodySpacing: '+ tablebodySpacing+ '; ';
    tableCSS = tableCSS  + '--tablebodyTextTransform: '+ tablebodyTextTransform+ '; ';
    tableCSS = tableCSS  + '--tableheaderPadding: '+ tableheaderPadding+ '; ';
    tableCSS = tableCSS  + '--tablebodyPadding '+ tablebodyPadding+ '; ';
    return(tableCSS)
  }

  function buildCSS_mobile() {
    var mobileCSS = '';
    mobileCSS = mobileCSS + ':root {';
    mobileCSS = mobileCSS  + '--min-target: 44px;';
    mobileCSS = mobileCSS  + '--headerChange: .25;';
    mobileCSS = mobileCSS  + '}';
    $("#css-mobile-code").html(mobileCSS);
  }
  function buildCSS_tablet() {
    var mobileCSS = '';
    mobileCSS = mobileCSS + ':root {';
    mobileCSS = mobileCSS  + '--min-target: 44px;';
    mobileCSS = mobileCSS  + '--headerChange: .2;';
    mobileCSS = mobileCSS  + '}';
    $("#css-tablet-code").html(mobileCSS);
  }

  function buildCSS_dyslexic() {
    var dyslexiaCSS = '';
    dyslexiaCSS = dyslexiaCSS  + ':root {';
    dyslexiaCSS = dyslexiaCSS  + '--min-target: 44px;';
    dyslexiaCSS = dyslexiaCSS  + '--primaryFont: OpenDyslexic; ';
    dyslexiaCSS = dyslexiaCSS  + '--secondaryFont : OpenDyslexic; ';
    dyslexiaCSS = dyslexiaCSS  + '--standard-LineHeight: 180%; ';
    dyslexiaCSS = dyslexiaCSS  + '--sm-LineHeight: 150%; ';
    dyslexiaCSS = dyslexiaCSS + '}';
    $("#css-Dyslexic-code").html(dyslexiaCSS);
  }
  function buildCSS_noMotion() {
    var buildCSS_noMotion  = '';
    buildCSS_noMotion      = buildCSS_noMotion + ':root {';
    buildCSS_noMotion      = buildCSS_noMotion + '--animation-speed: 0s; ';
    buildCSS_noMotion      = buildCSS_noMotion + '--animation-focus-distance: 0px; ';
    buildCSS_noMotion      = buildCSS_noMotion + '}';
    $("#css-montionSensative-code").html(buildCSS_noMotion);
  }

  function buildCSS_Palette(mode) {
    var paletteCSS = '';
    $("#"+ mode +"-mode .colorRow").each(function () {
     var id = $(this).attr('id')
     var mode = id.split('-')[1];
     var name = id.split('-')[0];
     if (name != primaryName && name != secondaryName && name != tertiaryName  ) {
       $(this).find(".color-block").each(function () {
         var shade = $(this).attr("id").split('-')[2];
         var shade = parseInt(shade.replace(/[^0-9. ]/g, ""));
         if (shade == 0) {
           shade = "050";
         }
         var bg = $(this).find(".Hex").css("backgroundColor");
         var onColor = $(this).find(".Hex").css("color").replace(/\s/g, '');
         if (mode == 'light'){
           if (onColor == "rgb(255,255,255)") {
             onColor =  "var(--white);";
           } else {
             onColor =  "var(--black);";
           }
         } else {
           if (onColor == "rgb(255,255,255,"+dmOpacity+")") {
             onColor =  "var(--dm-white);";
           } else {
             onColor =  "var(--black);";
           }
         }

         if (mode == 'light') {
           paletteCSS = paletteCSS + '.' + name + '-' + shade + '-bg {';
           paletteCSS = paletteCSS +  'background: '+ bg + ' !important; ';
           paletteCSS = paletteCSS +  'color: ' + onColor + ' !important; ';
           paletteCSS = paletteCSS + '}'
         } else {
           paletteCSS = paletteCSS + '.darkmode .' + name + '-' + shade + '-bg {';
           paletteCSS = paletteCSS +  'background: ' + bg + ' !important; ';
           paletteCSS = paletteCSS + 'color: ' + onColor  + ' !important; ';
           paletteCSS = paletteCSS + '}'
         }

       });
     }
   });
  return(paletteCSS)
  }

  function buildLMJSON(themeName) {
   json = {};
   jsonSections = {};
   var palleteColors      = buildJSON_PaletteColors(themeName, 'light');
   var theme              = buildJSON_CoreTheme(themeName, 'light');
   var themeColors        = buildJSON_ThemeColors(themeName, 'light');
   var family             = buildJSON_FontFamily();
   var fontSize           = buildJSON_FontSize();
   var fontWeight         = buildJSON_FontWeight();
   var headerChange       = buildJSON_HeaderChange()
   var sizing             = buildJSON_Sizing() ;
   var spacing            = buildJSON_Spacing();
   var radius             = buildJSON_Radius();
   var border             = buildJSON_Border();
   var shadow             = buildJSON_Shadows();
   var surface            = buildJSON_Surface('light')
   var buttons            = buildJSON_Buttons('button', 'light');
   var icons              = buildJSON_Buttons('icon', 'light');
   var backgrounds        = buildJSON_Backgrounds('light') ;
   var hotlinks           = buildJSON_Hotlinks('light');
   var inputBG            = buildJSON_InputBG('light');
   var borderColors       = buildJSON_BorderColors('light');
   var gradients          = buildJSON_Gradients(themeName, 'light');
   var textDecorations    = buildJSON_TextDecorations(themeName, 'light');
   var elevations         = buildJSON_Elevations();
   var elevationBG        = buildJSON_ElevationBGs('light');
   var base               = buildJSON_Base();
   var bevel              = buildJSON_Bevel();
   var inbevel            = buildJSON_InBevel()
   //var chartColors        = buildJSON_ChartColors('light');
    var states             = buildJSON_States('light');
    var chips              = buildJSON_Chips('light');

   jsonSections["Theme"] = theme;
   jsonSections["Theme-Colors"] = themeColors;
   //jsonSections["All-Colors"] = palleteColors;
   jsonSections["Solid-Backgrounds"] = backgrounds;
   jsonSections["Gradient-Backgrounds"] = gradients;
   jsonSections["fontFamilies"] = family;
   jsonSections["baseFont"] = fontSize;
   jsonSections["fontWeights"] = fontWeight
   jsonSections["Typography-Info"] = headerChange;
   jsonSections["States"]  = states;
   jsonSections["Surface"] = surface;
   jsonSections["Elevations"] = elevationBG;
   jsonSections["Sizing"] = sizing;
   jsonSections["Spacing"] = spacing;
   jsonSections["Radius"] = radius;
   jsonSections["Border"] = border;
   jsonSections["Borders"] = borderColors;
   jsonSections["Shadows"] = shadow;
   jsonSections["Buttons"] = buttons;
   jsonSections["Hotlinks"] = hotlinks;
   jsonSections["Icons"] = icons;
   jsonSections["Chips"] = chips;
   jsonSections["Input-Backgrounds"] = inputBG;
   jsonSections["Text-Decoration"] = textDecorations;
   jsonSections["Elevation-Info"] = elevations;
   jsonSections["Base-Info"] = base;
   jsonSections["Bevel-Info"] = bevel;
   jsonSections["Inverse-Bevel-Info"] = bevel;
   //NOT FOR MVP jsonSections["Charts"] = chartColors;
  if ($(document).find('#' + system + ' .customStyles.display-text.editted').length){
    var headerStyles = buildJSON_Headers('display-text');
    jsonSections["Display"] = headerStyles ;
  }
  if ($(document).find('#' + system + ' .customStyles.header-text.editted').length){
    var headerStyles = buildJSON_Headers('header-text');
    jsonSections["headers"] = headerStyles ;
  }
  if ($(document).find('#' + system + ' .customStyles.body-text.editted').length){
    var headerStyles = buildJSON_Headers('body-text');
    jsonSections["Body"] = headerStyles ;
  }
  if ($(document).find('#' + system + ' .customStyles.sm-text.editted').length){
    var headerStyles =  buildJSON_SMText('sm-text') ;
    jsonSections["SmallText"] = headerStyles ;
  }
  if ($(document).find('#' + system + ' .customStyles.stat-text.editted').length){
    var headerStyles =  buildJSON_SMText('stat-text') ;
    jsonSections["Stats"] = headerStyles ;
  }

  var jsonSections = JSON.stringify(jsonSections)
  $("#json-lm-base").html(jsonSections);
  }

  function buildDMJSON(themeName) {
     json = {};
     jsonSections = {};
     var darkPalleteColor = buildJSON_PaletteColors(themeName, 'dark');
     var theme            = buildJSON_CoreTheme(themeName, 'dark');
     var white            = buildJSON_White();
     var whiteText        = buildJSON_WhiteText();
     var themeColors      = buildJSON_ThemeColors(themeName, 'dark');
     var states           = buildJSON_States('dark');
     var backgrounds      = buildJSON_Backgrounds('dark');
     var gradients        = buildJSON_Gradients(themeName, 'dark');
    // var chartColors      = buildJSON_ChartColors('dark');
     var borderColors     = buildJSON_BorderColors('dark');
     var hotlinks          = buildJSON_Hotlinks('dark');
     var inputBG          = buildJSON_InputBG('dark');
     var inputBorder      = buildJSON_InputBorders('dark')
     var surface          = buildJSON_Surface('dark')
     var elevations       = buildJSON_ElevationBGs('dark');
     var textDecorations  = buildJSON_TextDecorations(themeName, 'dark');
     var buttons          = buildJSON_Buttons('button', 'dark');
     var icons            = buildJSON_Buttons('icon', 'dark');
     var chips            = buildJSON_Chips('dark');
     /// you do not need all the other system settings ///
     jsonSections["Theme"] = theme;
     jsonSections["Theme-Colors"] = themeColors;
     jsonSections["All-Colors"] = darkPalleteColor;
     jsonSections["Solid-Backgrounds"] = backgrounds;
     jsonSections["Gradient-Backgrounds"] = gradients;
     jsonSections["Surface"] = surface;
     jsonSections["Input-Backgrounds"] = inputBG;
     jsonSections["Borders"] = borderColors;
     jsonSections["Buttons"] = buttons;
     jsonSections["Chips"] = chips;
     jsonSections["Icons"] = icons;
     jsonSections["States"] = states;
     //jsonSections["Charts"] = chartColors ;
     jsonSections["Core-Colors"] = white;
     jsonSections["Text"] = whiteText;
     jsonSections["Elevations"] = elevations;
     jsonSections["Borders"] = borderColors;
     jsonSections["Text-Decoration"] = textDecorations;

     jsonSections = JSON.stringify(jsonSections);
     $("#json-dm-base").html(jsonSections);
  }

  function buildDyslexicTheme() {
   json = {};
   jsonSections = {};
    var dyslexicLH                   = buildJSON_dyslexicLH();
    var dyslexicFont                 = buildJSON_dyslexic()
   jsonSections["LineHeights"] = dyslexicLH;
   jsonSections["fontFamilies"] = dyslexicFont  ;
   var jsonSections = JSON.stringify(jsonSections)
   $("#json-dyslexic").html(jsonSections);

  }

  function buildTablet() {
   json = {};
   jsonSections = {};
   var mobileTarget                 = buildMobileTarget();
   var mobileHeaders                = buildJSON_TabletHeaderChange();
   jsonSections["Sizing"]            = mobileTarget;
   jsonSections["Typography-Info"]   = mobileHeaders;
   var jsonSections = JSON.stringify(jsonSections)
   $("#json-tablet").html(jsonSections);
  }

  function buildMobile() {
   json = {};
   jsonSections = {};
   var mobileTarget                 = buildMobileTarget();
   var mobileHeaders                = buildJSON_MobileHeaderChange();
   jsonSections["Sizing"]            = mobileTarget;
   jsonSections["Typography-Info"]   = mobileHeaders;
   var jsonSections = JSON.stringify(jsonSections)
   $("#json-mobile").html(jsonSections);
  }

  function buildMobileTarget() {
    var spacingCode = {};
    var minheight = {}
    minheight["value"] = minTarget;
    minheight["type"]  = 'sizing';
    spacingCode['minTarget']  = minheight
    return(spacingCode)
  }

  function buildJSON_dyslexic() {
    var familyCode = {};
    var primaryCode = {};
    var secondaryCode  = {};
    primaryCode ["value"] = 'OpenDyslexic';
    primaryCode ["type"] = 'fontFamilies';
    secondaryCode ["value"] = 'OpenDyslexic';
    secondaryCode ["type"] = 'fontFamilies';
    familyCode['primary'] = primaryCode  ;
    familyCode['secondary"'] = secondaryCode  ;
    return(familyCode )
  }

  function buildJSON_dyslexicLH() {
    var lh  = {};
    var lineHeightCode  = {};
    lh  = '170%'
    lh["type"] = 'lineHeight';
    lineHeightCode['lg']  =  lh;
   return(lineHeightCode)
  }


  function buildJSON_PaletteColors(theme, mode) {
   var code = {};
   var themeCode = {};
   var themeRange = {};



   $("#buildColor #"+mode+"-mode .colorRow").each(function () {
     var color = {};
     var onColor = {};
     var primeColors = {};
     var primeonColors = {};

     var themeShade = {};
     var name = $(this).find(".color-block").attr('id').split('-')[0];
     $(this)
       .find(".color-block")
       .each(function () {
         var theme = {};
         var id = $(this).attr('id')
         var mode = id.split('-')[1];
         var shadecolor = {}
         var shadeonColor = {}
         var bg = "";
         var shade = $(this).attr("id").split('-')[2];
        // var shade = shade.replace(/[^0-9. ]/g, "");
         bg = $(this).find(".Hex").css("backgroundColor");
         if (shade == 0) {
           shade = "050";
         }
         var contrast = $(this).find(".Contrast span").html();

         //colorRange[shade] = color;
         var onHexColor = $(this).find(".Hex").css("color").replace(/\s/g, '');

         if (onHexColor == "rgb(255,255,255)" || onHexColor == "rgba(255,255,255,"+dmOpacity+")")  {
           onHexColor = "{text.white}";
         } else {
           onHexColor = "{text.dark}";
         }
         var contrast = $(this).find(".Contrast span").html();

         shadecolor["value"] =  bg;
         shadecolor["type"] = 'color';
         shadeonColor["value"] = onHexColor;
         shadeonColor["type"] = 'color';
         shadeonColor["description"] = "Contrast ratio: " + contrast;

         primeColors[shade]     =  shadecolor;
         primeonColors[shade]   =  shadeonColor;
         themeShade['Color']    =  primeColors;
         themeShade['On-Color'] =  primeonColors;
        // themeShade['Color'] =  shadecolor;
       });

      themeRange[name] = themeShade;
   });
   //themeCode["All-Colors"] = themeRange;
   return(themeRange)
  }

  function buildJSON_DM_PaletteColors(theme) {
   var code = {};
   var themeCode = {};
   var themeRange = {};


   $("#buildColor #dark-mode .colorRow").each(function () {

     var themeShade = {};
     var name = $(this).find(".color-block").attr('id').split('-')[0];
     $(this)
       .find(".color-block")
       .each(function () {
         var theme = {};
         var id = $(this).attr('id')
         var mode = id.split('-')[1];
         var color = {}
         var onColor = {}
         var bg = "";
         var shade = $(this).attr("id").split('-')[2];
         var shade = parseInt(shade.replace(/[^0-9. ]/g, ""));

         bg = $(document).find("#" + id + " .Color span").text();
         var contrast = $(document).find("#" + id + " .Contrast span").html();

         if (shade == 0) {
           shade = "050";
         }

         color["value"] = bg;
         color["type"] = "color";

         //colorRange[shade] = color;
         var onHexColor = $(this).find(".Hex").css("color");
         if (onHexColor == "rgb(255, 255, 255, "+dmOpacity+")") {
           onHexColor = "{text.white}";
         } else {
           onHexColor = "{text.dark}";
         }
         var contrast = $(this).find(".Contrast span").html();
         onColor["value"] = onHexColor;
         onColor["type"] = "color";
         onColor["description"] = "Contrast ratio: " + contrast;
         theme["Color"] = color
         theme["On-Color"] = onColor;
         themeShade[shade] = theme;

       });

      themeRange[name] = themeShade;
   });
   themeCode["All-Colors"] = themeRange;
   return(themeCode)
  }

  function buildJSON_CoreTheme(theme, mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
     var themeCode = {};
     var themeName = {};
     var primeColors = {};
     var color = {};
     var onColor = {};
      var pshade = primaryName.split('-')[1];
      if (mode == 'dark') {
        if (pshade == "0" || pshade == "100") {
          pshade = "200"
        }
      } else {
        if (pshade == "0") {
          pshade ="050"
        }
      }
      color["value"] =  '{Theme-Colors.Primary.Color.'+pshade+'}';
      color["type"] = 'color';
      onColor["value"] = '{Theme-Colors.Primary.On-Color.'+pshade+'}';
      onColor["type"] = 'color';
      primeColors["Color"] =  color;
      primeColors["On-Color"] =  onColor;
      themeCode["Primary"] =  primeColors
       // Seconday //
      var themeName = {};
      var primeColors = {};
      var color = {};
      var onColor = {};
       var pshade = secondaryName.split('-')[1];
       if (mode == 'dark') {
         if (pshade == "0" || pshade == "100") {
           pshade = "200"
         }
       } else {
         if (pshade == "0") {
           pshade ="050"
         }
       }
       color["value"] =  '{Theme-Colors.Secondary.Color.'+pshade+'}';
       color["type"] = 'color';
       onColor["value"] = '{Theme-Colors.Secondary.On-Color.'+pshade+'}';
       onColor["type"] = 'color';
        primeColors["color"] =  color;
        primeColors["On-Color"] =  onColor;
        themeCode["Secondary"] =  primeColors
        // Tertiary //
        var themeName = {};
        var primeColors = {};
        var color = {};
        var onColor = {};
       var pshade = tertiaryName.split('-')[1];
       if (mode == 'dark') {
         if (pshade == "0" || pshade == "100") {
           pshade = "200"
         }
       } else {
         if (pshade == "0") {
           pshade ="050"
         }
       }
       color["value"] =  '{Theme-Colors.Tertiary.Color.'+pshade+'}';
       color["type"] = 'color';
       onColor["value"] = '{Theme-Colors.Tertiary.On-Color.'+pshade+'}';
       onColor["type"] = 'color';
       primeColors["Color"] =  color;
       primeColors["On-Color"] =  onColor;
       themeCode["Tertiary"] =  primeColors
       // accent //
       var themeName = {};
       var primeColors = {};
       var color = {};
       var onColor = {};
       var pname  = accentName.split('-')[0];
       pname = capitalizeFirstLetter(pname)
       var pshade = accentName.split('-')[1];
       if (mode == 'dark') {
         if (pshade == "0" || pshade == "100") {
          pshade = "200"
         }
       } else {
         if (pshade == "0") {
          pshade ="050"
         }
       }
       color["value"] =  '{Theme-Colors.'+pname+'.Color.'+pshade+'}';
       color["type"] = 'color';
       primeColors["Color"] =  color;
       themeCode["Accent"] =  primeColors
       return(themeCode)
   }
  }


  function buildJSON_Gradients(theme, mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var themeCode = {};
      // Gradient-1//
      var themeName = {};
      var primeColors = {};
      var color = {};
      var onColor = {};
      var gradient1Button = {};
      var gradient1OnButton = {};
      var gradient1Icon = {};
      var gradient1Hotlink = {};
      var gradient2Button = {};
      var gradient2OnButton = {};
      var gradient2Icon = {};
      var gradient2Hotlink = {};
      var gradient3Button = {};
      var gradient3OnButton = {};
      var gradient3Icon = {};
      var gradient3Hotlink = {};
      var pcolor = gradient1aName.split('-')[0];
      pcolor = capitalizeFirstLetter(pcolor)
      var pshade = gradient1aName.split('-')[1];
      if (pshade == "0") {
       pshade ="050"
      }
      var scolor = gradient1bName.split('-')[0];
      scolor = capitalizeFirstLetter(scolor)
      var sshade = gradient1bName.split('-')[1];
      if (sshade == "0") {
        sshade ="050"
      }
      color["value"] = 'linear-gradient(90deg, {Theme-Colors.'+pcolor+'.Color.'+pshade +'} 0%, {Theme-Colors.'+scolor+'.Color.'+sshade +'} 100%)';
      color["type"] = 'color';

      onColor["value"] = '{Theme-Colors.'+pcolor+'.On-Color.'+pshade +'}';
      onColor["type"] = 'color';
      if (ongradient1a == black) {
        gradient1Button["value"]    = '{Core-Colors.Black.Color}';
        gradient1OnButton["value"]  = '{text.white}';
        gradient1Icon["value"]      = '{Core-Colors.Black.Color}';
        gradient1Hotlink["value"]   = '{Core-Colors.Black.Color}';
      } else {
        gradient1Button["value"]    = '{Core-Colors.White.Color}';
        gradient1OnButton["value"]  = '{text.dark}';
        gradient1Icon["value"]      = '{Core-Colors.White.Color}';
        gradient1Hotlink["value"]   = '{Core-Colors.White.Color}';
      }
      gradient1Button["type"]      = 'color';
      gradient1OnButton["type"]    = 'color';
      gradient1Icon["type"]        = 'color';
      gradient1Hotlink["type"]     = 'color';
      primeColors["Color"]         =  color;
      primeColors["On-Color"]      =  onColor;
      primeColors["Button"]        =  gradient1Button;
      primeColors["On-Button"]     =  gradient1OnButton;
      primeColors["Icon"]          =  gradient1Icon;
      primeColors["Hotlink"]       =  gradient1Hotlink;
      themeCode["Gradient-1"]      =  primeColors
      // Gradient-2//
      var themeName = {};
      var primeColors = {};
      var color = {};
      var onColor = {};
      var pcolor = gradient2aName.split('-')[0];
      pcolor = capitalizeFirstLetter(pcolor)
      var pshade = gradient2aName.split('-')[1];
      if (pshade == "0") {
        pshade  ="050"
      }
      var scolor = gradient2bName.split('-')[0];
      scolor = capitalizeFirstLetter(scolor)
      var sshade = gradient2bName.split('-')[1];
      if (sshade == "0") {
        sshade ="050"
      }
      color["value"] = 'linear-gradient(90deg, {Theme-Colors.'+pcolor+'.Color.'+pshade +'} 0%, {Theme-Colors.'+scolor+'.Color.'+sshade +'} 100%)';
      color["type"] = 'color';
      onColor["value"] = '{Theme-Colors.'+pcolor+'.On-Color.'+pshade +'}';
      onColor["type"] = 'color';
      if (ongradient2a == black) {
        gradient2Button["value"]    = '{Core-Colors.Black.Color}';
        gradient2OnButton["value"]  = '{text.white}';
        gradient2Icon["value"]      = '{Core-Colors.Black.Color}';
        gradient2Hotlink["value"]   = '{Core-Colors.Black.Color}';
      } else {
        gradient2Button["value"]    = '{Core-Colors.White.Color}';
        gradient2OnButton["value"]  = '{text.white}';
        gradient2Icon["value"]      = '{Core-Colors.White.Color}';
        gradient2Hotlink["value"]   = '{Core-Colors.White.Color}';
      }
      gradient2Button["type"]      = 'color';
      gradient2OnButton["type"]    = 'color';
      gradient2Icon["type"]        = 'color';
      gradient2Hotlink["type"]     = 'color';
      primeColors["Color"]         =  color;
      primeColors["On-Color"]      =  onColor;
      primeColors["Button"]        =  gradient2Button;
      primeColors["On-Button"]     =  gradient2OnButton;
      primeColors["Icon"]          =  gradient2Icon;
      primeColors["Hotlink"]       =  gradient2Hotlink;
      themeCode["Gradient-2"] =  primeColors

      // gradient 3 //

      var gray = {};
      var ongray = {};
      var grayColors = {};
      if (mode == "dark") {
        gray["value"] =  'linear-gradient(90deg, {Core-Colors.Gray.Color.900} 0%, {Core-Colors.Near-Black.Color} 100%)';
        ongray["value"] =  '{Core-Colors.Black.On-Color}';
        if (dmbuttonOnGradient3 == dmbuttons) {
          gradient3Button["value"]      = '{Buttons.Colored.Color}';
          gradient3OnButton["value"]    = '{Buttons.Colored.On-Color}';
        } else {
          if (dmbuttonOnGradient3 == black) {
            gradient3Button["value"]    = '{Buttons.Dark.Color}';
            gradient3OnButton["value"]  = '{Buttons.Dark.On-Color}';
          } else {
            gradient3Button["value"]    = '{Buttons.White.Color}';
            gradient3OnButton["value"]  = '{Buttons.White.On-Color}';
          }
        }
        if (dmiconOnGradient3 == dmicons) {
          gradient3Icon["value"]      = '{Icons.Colored.Color}';
        } else {
          if (dmbuttonOnGradient3 == black) {
            gradient3Icon["value"]    = '{Icons.Dark.Color}';
          } else {
            gradient3Icon["value"]    = '{Icons.White.Color}';
          }
        }
        if (dmhotlinkOnGradient3 == dmhotlink) {
          gradient3Icon["value"]      = '{Hotlinks.Colored.Link}';
        } else {
          if (dmbuttonOnGradient3 == black) {
            gradient3Icon["value"]    = '{Hotlinks.Dark.Link}';
          } else {
            gradient3Icon["value"]    = '{Hotlinks.White.Link}';
          }
        }
      } else {

      }
      gray["type"] = 'color';
      ongray["type"] = 'color';
      grayColors["Color"] = gray;
      grayColors["On-Color"] = ongray;
      themeCode["Gradient-3"] =  grayColors

      return(themeCode)
    }
  }


  function buildJSON_TextDecorations(theme, mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var themeCode = {};

      // Text-Gradient//
      var themeName = {};
      var primeColors = {};
      var color = {};

     var pcolor = textgradient1aName.split('-')[0].replace(/\s/g, '');
     pcolor = capitalizeFirstLetter(pcolor)
     var pshade = textgradient1aName.split('-')[1];
     if (pshade == '0') {
       pshade = '050'
     }
     var scolor = textgradient1bName.split('-')[0].replace(/\s/g, '');
     scolor = capitalizeFirstLetter(scolor)
     var sshade = textgradient1aName.split('-')[1];
     if (sshade == '0') {
       sshadee = '050'
     }

      color["value"] = 'linear-gradient(90deg, {Theme-Colors.'+pcolor+'.Color.'+pshade +'} 0%, {Theme-Colors.'+scolor+'.Color.'+sshade +'} 100%)';
      color["type"] = 'color';
      themeCode["Text-Gradient"] =  color

      // Drop Color//
      var themeName = {};
      var primeColors = {};
      var color = {};
      var onColor = {};

      if (mode == 'dark' ) {
        if (dmbackgroundPrimaryName == 'nearblack-bg' || dmbackgroundPrimaryName == 'nearblack') {
          primeColors["value"] = '{Core-Colors.Black.Color}';
        } else {
          primeColors["value"] = '{Theme-Colors.Primary.Color.900}';
        }
      } else {
        if (backgroundPrimaryName == 'nearblack-bg' || backgroundPrimaryName == 'primary-900-bg') {
          primeColors["value"] = '{Core-Colors.Black.Color}80';
        } else {
          primeColors["value"] = '{Theme-Colors.Primary.Color.100}';
        }

      }
      primeColors["type"] = 'color';
      themeCode["Color-Dropshadow"] =  primeColors
      return(themeCode)
    }
  }

  function buildJSON_FontSize()  {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var sizeCode = {};
      var base = {};
      var baseFont = $('#'+system + ' .'+system+'-baseFont').html()
      base["value"] = baseFont;
      base["type"] = 'fontSizes';

      return(base)
    }
  }

  function buildJSON_FontWeight()  {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var weightCode = {};
      var font0 = {};
      var font1 = {};
      var font2 = {};
      var font3 = {};
      var font4 = {};
      var fontHeader = {};
      font0["value"] = fontWeight0;
      font0["type"] = 'fontWeights';
      font1["value"] = fontWeight1;
      font1["type"] = 'fontWeights';
      font2["value"] = fontWeight2;
      font2["type"] = 'fontWeights';
      font3["value"] = fontWeight3;
      font3["type"] = 'fontWeights';
      font4["value"] = fontWeight4;
      font4["type"] = 'fontWeights';
      fontHeader["value"] = headerWeight;
      fontHeader["type"] = 'fontWeights';
      weightCode["font-weight-0"] = font0;
      weightCode["font-weight-1"] = font1;
      weightCode["font-weight-2"] = font2;
      weightCode["font-weight-3"] = font3;
      weightCode["font-weight-4"] = font4;
      weightCode["Header-Weight"] = fontHeader;
      return(weightCode)
    }
  }


    function buildJSON_Headers(type)  {

      if ( $(document).find('#' + system + 'Default').length > 0 ) {
        var headerCode = {};

        $(document).find('#' + system + ' .customStyles.'+type+'.editted').each(function () {
          var header = {};
          var headerInfo = {};
          var name = $(this).attr('name');
          var fontFamily = $(this).find('.font-family').html();
          if (fontFamily == primaryFont) {
            fontFamily = "{fontFamilies.primary}"
          } else {
            fontFamily = "{fontFamilies.secondary}"
          }
          var fontWeight = $(this).find('.font-weight').html();
          if (fontWeight == fontWeight0) {
            fontWeight= "{fontWeights.font-weight-0}"
          } else if (fontWeight == fontWeight1){
            fontWeight= "{fontWeights.font-weight-1}"
          } else if (fontWeight == fontWeight2){
            fontWeight= "{fontWeights.font-weight-2}"
          } else if (fontWeight == fontWeight3){
            fontWeight = "{fontWeights.font-weight-3}"
          } else {
            fontWeight= "{fontWeights.font-weight-4}"
          }
          var fontSize = $(this).find('.font-size').html();
          var spacing = $(this).find('.font-character-spacing').html();
          var lineHeight = $(this).find('.font-line-height').html();
          if (lineHeight == '160%') {
            lineHeight = "{lineHeights.lg}"
          } else if (lineHeight = '100%'){
            lineHeight = "{lineHeights.none}"
          } else {
            lineHeight = "{lineHeights.sm}"
          }
          headerInfo["fontFamily"] = fontFamily   ;
          headerInfo["fontWeight"] = fontWeight ;
          headerInfo["lineHeight"] = lineHeight  ;
          headerInfo["fontSize"] = fontSize;
          headerInfo["letterSpacing"] = spacing ;
          headerInfo["paragraphSpacing"] = "{paragraphSpacing.none}";
          headerInfo["textCase"] = "{textCase.none}" ;
          headerInfo["textDecoration"] = "{textDecoration.none}" ;
          header["value"] = headerInfo ;
          header["type"] = 'typography';
          name = capitalizeFirstLetter(name)
          name.replace('-small','-Small');
          name.replace('-bold','-Bold');
          name.replace('-semibold','-Semibold');
          headerCode[name] = header;
        });
        return(headerCode)
      }
    }

    function buildJSON_SMText(type)  {
      if ( $(document).find('#' + system + 'Default').length > 0 ) {
        var headerCode = {};

        $(document).find('#' + system + ' .customStyles.'+type+'.editted').each(function () {
          var header = {};
          var headerInfo = {};
          var name = $(this).attr('name');
          var fontFamily = $(this).find('.font-family').html();
          if (fontFamily == primaryFont) {
            fontFamily = "{fontFamilies.primary}"
          } else {
            fontFamily = "{fontFamilies.secondary}"
          }
          var fontWeight = $(this).find('.font-weight').html();
          if (fontWeight == fontWeight0) {
            fontWeight= "{fontWeights.font-weight-0}"
          } else if (fontWeight == fontWeight1){
            fontWeight= "{fontWeights.font-weight-1}"
          } else if (fontWeight == fontWeight2){
            fontWeight= "{fontWeights.font-weight-2}"
          } else if (fontWeight == fontWeight3){
            fontWeight = "{fontWeights.font-weight-3}"
          } else {
            fontWeight= "{fontWeights.font-weight-4}"
          }
          var fontSize = $(this).find('.font-size').html();
          var spacing = $(this).find('.font-character-spacing').html();
          var lineHeight = $(this).find('.font-line-height').html();
          if ($(this).find('.font-text-decoration').length) {
            var decoration = $(this).find('.font-text-decoration').html()
            if (decoration == 'uppercase') {
              var textCase = "{textCase.uppercase}"
            } else {
              var textCase = "{textCase.none}"
            }
          } else {
            var textCase = "{textCase.none}"
          }
          if (lineHeight == '160%') {
            lineHeight = "{lineHeights.lg}"
          } else if (lineHeight = '100%'){
            lineHeight = "{lineHeights.none}"
          } else {
            lineHeight = "{lineHeights.sm}"
          }
          headerInfo["fontFamily"] = fontFamily   ;
          headerInfo["fontWeight"] = fontWeight ;
          headerInfo["lineHeight"] = lineHeight  ;
          headerInfo["fontSize"] = fontSize;
          headerInfo["letterSpacing"] = spacing ;
          headerInfo["paragraphSpacing"] = "{paragraphSpacing.none}";
          headerInfo["textCase"] = textCase;
          headerInfo["textDecoration"] = "{textDecoration.none}" ;
          header["value"] = headerInfo ;
          header["type"] = 'typography';
          headerCode[name] = header;
        });
        return(headerCode)
      }
    }

    function buildJSON_Elevations()  {
      if ( $(document).find('#' + system + 'Default').length > 0 ) {
        var elevationCode = {};
        var change = {};
        var horizontal = {};
        var vertical = {};
        var spread = {};
        var blur = {};
        var opacity = {};
        var rgb = {};
        var bBlur = {};
        var bSpread = {};
        var bOpacity = {};
        change["value"] = elevationChange ;
        change["type"] = 'other';
        horizontal["value"] = elevationHorizontal; ;
        horizontal["type"] = 'other';
        vertical["value"] =  elevationVertical;
        vertical["type"] = 'other';
        spread["value"] =  elevationSpread;
        spread["type"] = 'other';
        blur["value"] = elevationBlur;
        blur["type"] = 'other';
        opacity["value"] = elevationOpacity;
        opacity["type"] = 'other';
        rgb["value"] = elevationRGB ;
        rgb["type"] = 'other';
        bBlur["value"] = baseBlur ;
        bBlur["type"] = 'other';
        bSpread["value"] = baseSpread;
        bSpread["type"] = 'other';
        bOpacity["value"] = baseOpacity;
        bOpacity["type"] = 'other';
        elevationCode["Change"] = change;
        elevationCode["Horizontal"] = horizontal;
        elevationCode["Vertical"] = vertical;
        elevationCode["Spread"] = spread;
        elevationCode["Blur"] = blur;
        elevationCode["Opacity"] = opacity;
        elevationCode["RGB"] = rgb;
        elevationCode["BaseBlur"] = bBlur;
        elevationCode["BaseSpread"] = bSpread;
        elevationCode["BaseOpacity"] = bOpacity;
        return(elevationCode)
      }
    }

    testColor =  '#EC407A'
    splitComplement(testColor)
    function splitComplement(testColor) {

      var rgbArray = hextoRGBArray(testColor);
      var h = chroma.rgb(rgbArray).get('hsv.h');
      var s = chroma.rgb(rgbArray).get('hsv.s');
      var v = chroma.rgb(rgbArray).get('hsv.v');
      h += 180;
      var h0 = h + 30;
      var h1 = h - 30;
      var color1 = 'rgb(' + chroma.hsv(h0,s,v).rgb() + ')';
      var color2 = 'rgb(' + chroma.hsv(h1,s,v).rgb() + ')';

    }

    function build_ChartColors()  {
        colorTheory          = $(document).find('#' + system + ' .' +system +  '-chart-theory').html();

        primaryArray = $(document).find('#' + primaryName.split('-')[0] + '-light-400 .Hex').css('backgroundColor')
        primaryHex = rgb2hex(primaryArray)
        primaryArray = hextoRGBArray(primaryHex)
        var primaryShade = primaryName.split('-')[0]
        /// secondary ///
        secondaryArray = $(document).find('#' + secondaryName.split('-')[0] + '-light-400 .Hex').css('backgroundColor')
        secondaryHex = rgb2hex(secondaryArray)
        secondaryArray = hextoRGBArray(secondaryHex)
        var secondaryShade = secondaryName.split('-')[0]
        /// tertiary //
        tertiaryArray = $(document).find('#' + tertiaryName.split('-')[0] + '-light-500 .Hex').css('backgroundColor')
        tertiaryHex = rgb2hex(tertiaryArray)
        tertiaryArray = hextoRGBArray(tertiaryHex)
        var tertiaryShade = tertiaryName.split('-')[0]
        background  = 'white'
        $('#Solid-C1').empty();
        $('#Solid-C2').empty();
        $('#Solid-C3').empty();
        $('#dmSolid-C1').empty();
        $('#dmSolid-C2').empty();
        $('#dmSolid-C3').empty();


        if ( colorTheory == 'Color Blind') {
          $('#Solid-C1').append('<div class="color-block"  id="C1-01-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(1, 28, 55)"></div></div>');
          $('#Solid-C1').append('<div class="color-block"  id="C1-02-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(4, 65, 129)"></div></div>');
          $('#Solid-C1').append('<div class="color-block"  id="C1-03-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(39, 141, 246)"></div></div>');
          $('#Solid-C2').append('<div class="color-block"  id="C2-01-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(124, 77, 239)"></div></div>');
          $('#Solid-C2').append('<div class="color-block"  id="C2-02-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(208, 38, 112)"></div></div>');
          $('#Solid-C2').append('<div class="color-block"  id="C2-03-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(236, 107, 41)"></div></div>');
          $('#Solid-C3').append('<div class="color-block"  id="C3-01-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(68, 4, 118)"></div></div>');
          $('#Solid-C3').append('<div class="color-block"  id="C3-02-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(218, 94, 221)"></div></div>');
          $('#Solid-C3').append('<div class="color-block"  id="C3-03-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(99, 151, 145)"></div></div>');
          $('#dmSolid-C1').append('<div class="color-block"  id="dm-C1-01-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(1, 28, 55)"></div></div>');
          $('#dmSolid-C1').append('<div class="color-block"  id="dm-C1-02-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(4, 65, 129)"></div></div>');
          $('#dmSolid-C1').append('<div class="color-block"  id="dm-C1-03-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(39, 141, 246)"></div></div>');
          $('#dmSolid-C2').append('<div class="color-block"  id="dm-C2-01-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(124, 77, 239)"></div></div>');
          $('#dmSolid-C2').append('<div class="color-block"  id="dm-C2-02-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(208, 38, 112)"></div></div>');
          $('#dmSolid-C2').append('<div class="color-block"  id="dm-C2-03-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(236, 107, 41)"></div></div>');
          $('#dmSolid-C3').append('<div class="color-block"  id="dm-C3-01-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(68, 4, 118)"></div></div>');
          $('#dmSolid-C3').append('<div class="color-block"  id="dm-C3-02-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(218, 94, 221)"></div></div>');
          $('#dmSolid-C3').append('<div class="color-block"  id="dm-C3-03-Solid"><div class="subtitle1">Solid</div><div class="Hex" style="background:rgb(99, 151, 145)"></div></div>');
          $('.chart-gradient-1').addClass('color-blind');
          $('.chart-gradient-2').addClass('color-blind');
          $('.dm-chart-gradient-1').addClass('color-blind');
          $('.dm-chart-gradient-2').addClass('color-blind');
          $('#Solid-C3').addClass('color-blind');
          $('#dmSolid-C3').addClass('color-blind')
        } else {
          $('.chart-gradient-1').removeClass('color-blind');
          $('.chart-gradient-2').removeClass('color-blind');
          $('.dm-chart-gradient-1').removeClass('color-blind');
          $('.dm-chart-gradient-2').removeClass('color-blind');
          $('#Solid-C3').removeClass('color-blind')
          $('#dmSolid-C3').removeClass('color-blind')
          if (backgroundPrimaryName == 'white-bg' || backgroundPrimaryName == 'primary-half-bg') {

            $('#'+primaryShade+'-light-400').clone().appendTo('#Solid-C1').attr('id','C1-01-Solid').find('.subtitle1 ').html('Solid');
            $('#'+primaryShade+'-light-600').clone().appendTo('#Solid-C1').attr('id','C1-02-Solid').find('.subtitle1 ').html('Solid');
            $('#'+primaryShade+'-light-800').clone().appendTo('#Solid-C1').attr('id','C1-03-Solid').find('.subtitle1 ').html('Solid');
            $('#'+primaryShade+'-dark-0').clone().appendTo('#dmSolid-C1').attr('id','dm-C1-01-Solid').find('.subtitle1 ').html('Solid');
            $('#'+primaryShade+'-dark-100').clone().appendTo('#dmSolid-C1').attr('id','dm-C1-02-Solid').find('.subtitle1 ').html('Solid');
            $('#'+primaryShade+'-dark-300').clone().appendTo('#dmSolid-C1').attr('id','dm-C1-03-Solid').find('.subtitle1 ').html('Solid');

            if (secondaryShade == primaryShade || colorTheory != 'Default') {
              if ($('#chart-color button').html() == 'Default' || $('#chart-color button').html() == 'Complementary') {
                var complement = $.xcolor.splitcomplement(primaryHex);
              } else if ($('#chart-color button').html() == 'Analogous') {
                var complement = $.xcolor.analogous(primaryHex);
              } else if ($('#chart-color button').html() == 'Triad'){
                var complement = $.xcolor.triad(primaryHex);
              } else {
                var complement = $.xcolor.tetrad(primaryHex);
              }

              var complementColor = complement[1]
              var color = complementColor .toString();
              addtoTheme('chartSecondary', color)

              $('#secondaryRange').empty();
              $('#dm-secondaryRange').empty();
              $('#chartSecondary-light-400').clone().appendTo('#Solid-C2').attr('id','C2-01-Solid').find('.subtitle1 ').html('Solid');
              $('#chartSecondary-light-600').clone().appendTo('#Solid-C2').attr('id','C2-02-Solid').find('.subtitle1 ').html('Solid');
              $('#chartSecondary-light-800').clone().appendTo('#Solid-C2').attr('id','C2-03-Solid').find('.subtitle1 ').html('Solid');
              $('#chartSecondary-dark-0').clone().appendTo('#dmSolid-C2').attr('id','dm-C2-01-Solid').find('.subtitle1 ').html('Solid');
              $('#chartSecondary-dark-100').clone().appendTo('#dmSolid-C2').attr('id','dm-C2-02-Solid').find('.subtitle1 ').html('Solid');
              $('#chartSecondary-dark-300').clone().appendTo('#dmSolid-C2').attr('id','dm-C2-03-Solid').find('.subtitle1 ').html('Solid');


            } else {
              $('#'+secondaryShade+'-light-400').clone().appendTo('#Solid-C2').attr('id','C2-01-Solid').find('.subtitle1 ').html('Solid');
              $('#'+secondaryShade+'-light-600').clone().appendTo('#Solid-C2').attr('id','C2-02-Solid').find('.subtitle1 ').html('Solid');
              $('#'+secondaryShade+'-light-800').clone().appendTo('#Solid-C2').attr('id','C2-03-Solid').find('.subtitle1 ').html('Solid');
              $('#'+secondaryShade+'-dark-0').clone().appendTo('#dmSolid-C2').attr('id','dm-C2-01-Solid').find('.subtitle1 ').html('Solid');
              $('#'+secondaryShade+'-dark-100').clone().appendTo('#dmSolid-C2').attr('id','dm-C2-02-Solid').find('.subtitle1 ').html('Solid');
              $('#'+secondaryShade+'-dark-300').clone().appendTo('#dmSolid-C2').attr('id','dm-C2-03-Solid').find('.subtitle1 ').html('Solid');
            }

            if (tertiaryShade == primaryShade || tertiaryShade == secondaryShade) {
              if (colorTheory == 'Default' || colorTheory == 'Complementary') {
                var complement = $.xcolor.splitcomplement(primaryHex);
              } else if (colorTheory == 'Analogous') {
                var complement = $.xcolor.analogous(primaryHex);
              } else if ($('#chart-color button').html() == 'Triad'){
                var complement = $.xcolor.triad(primaryHex);
              } else {
                var complement = $.xcolor.tetrad(primaryHex);
              }
            //  if (secondaryShade == primaryShade ) {
                var complementColor = complement[2]
            //  } else {
            //    var complementColor = complement[1]
            //  }
              var color = complementColor.toString();
              addtoTheme('chartTertiary', color)

              $('#chartTertiary-light-400').clone().appendTo('#Solid-C3').attr('id','C3-01-Solid').find('.subtitle1 ').html('Solid');
              $('#chartTertiary-light-600').clone().appendTo('#Solid-C3').attr('id','C3-02-Solid').find('.subtitle1 ').html('Solid');
              $('#chartTertiary-light-800').clone().appendTo('#Solid-C3').attr('id','C3-03-Solid').find('.subtitle1 ').html('Solid');
              $('#chartTertiary-dark-0').clone().appendTo('#dmSolid-C3').attr('id','dm-C3-01-Solid').find('.subtitle1 ').html('Solid');
              $('#chartTertiary-dark-100').clone().appendTo('#dmSolid-C3').attr('id','dm-C3-02-Solid').find('.subtitle1 ').html('Solid');
              $('#chartTertiary-dark-300').clone().appendTo('#dmSolid-C3').attr('id','dm-C3-03-Solid').find('.subtitle1 ').html('Solid');

            } else {
              $('#'+tertiaryShade+'-light-400').clone().appendTo('#Solid-C3').attr('id','C3-01-Solid').find('.subtitle1 ').html('Solid');
              $('#'+tertiaryShade+'-light-600').clone().appendTo('#Solid-C3').attr('id','C3-02-Solid').find('.subtitle1 ').html('Solid');
              $('#'+tertiaryShade+'-light-800').clone().appendTo('#Solid-C3').attr('id','C3-03-Solid').find('.subtitle1 ').html('Solid');
              $('#'+tertiaryShade+'-dark-0').clone().appendTo('#dmSolid-C3').attr('id','dm-C3-01-Solid').find('.subtitle1 ').html('Solid');
              $('#'+tertiaryShade+'-dark-100').clone().appendTo('#dmSolid-C3').attr('id','dm-C3-02-Solid').find('.subtitle1 ').html('Solid');
              $('#'+tertiaryShade+'-dark-300').clone().appendTo('#dmSolid-C3').attr('id','dm-C3-03-Solid').find('.subtitle1 ').html('Solid');
            }

          } else {
            if (secondaryShade == primaryShade) {
              if (colorTheory == 'Default' || colorTheory == 'Complementary') {
                var complement = $.xcolor.splitcomplement(primaryHex);
              } else if ($('#chart-color button').html() == 'Analogous') {
                var complement = $.xcolor.analogous(primaryHex);
              } else if ($('#chart-color button').html() == 'Triad'){
                var complement = $.xcolor.triad(primaryHex);
              } else {
                var complement = $.xcolor.tetrad(primaryHex);
              }
              var complementColor = complement[1]
              var color = complementColor .toString();
              addtoTheme('chartSecondary', color)
              $('#chartSecondary-light-0').clone().appendTo('#Solid-C2').attr('id','C2-01-Solid').find('.subtitle1 ').html('Solid');
              $('#chartSecondary-light-100').clone().appendTo('#Solid-C2').attr('id','C2-02-Solid').find('.subtitle1 ').html('Solid');
              $('#chartSecondary-light-200').clone().appendTo('#Solid-C2').attr('id','C2-03-Solid').find('.subtitle1 ').html('Solid');
              $('#chartSecondary-dark-0').clone().appendTo('#dm-Solid-C2').attr('id','dm-C2-01-Solid').find('.subtitle1 ').html('Solid');
              $('#chartSecondary-dark-100').clone().appendTo('#dm-Solid-C2').attr('id','dm-C2-02-Solid').find('.subtitle1 ').html('Solid');
              $('#chartSecondary-dark-300').clone().appendTo('#dm-Solid-C2').attr('id','dm-C2-03-Solid').find('.subtitle1 ').html('Solid');

            } else {
              $('#'+secondaryShade+'-light-0').clone().appendTo('#Solid-C2').attr('id','C2-01-Solid').find('.subtitle1 ').html('Solid');
              $('#'+secondaryShade+'-light-100').appendTo('#Solid-C2').attr('id','C2-02-Solid').find('.subtitle1 ').html('Solid');
              $('#'+secondaryShade+'-light-200').appendTo('#Solid-C2').attr('id','C2-03-Solid').find('.subtitle1 ').html('Solid');
              $('#'+secondaryShade+'-dark-0').clone().appendTo('#dmSolid-C2').attr('id','dm-C2-01-Solid').find('.subtitle1 ').html('Solid');
              $('#'+secondaryShade+'-dark-100').clone().appendTo('#dmSolid-C2').attr('id','dm-C2-02-Solid').find('.subtitle1 ').html('Solid');
              $('#'+secondaryShade+'-dark-300').clone().appendTo('#dmSolid-C2').attr('id','dm-C2-03-Solid').find('.subtitle1 ').html('Solid');
            }

            if (tertiaryShade == primaryShade || tertiaryShade == secondaryShade) {
              if (colorTheory == 'Default' || colorTheory == 'Complementary') {
                var complement = $.xcolor.splitcomplement(primaryHex);
              } else if (colorTheory == 'Analogous') {
                var complement = $.xcolor.analogous(primaryHex);
              } else if ($('#chart-color button').html() == 'Triad'){
                var complement = $.xcolor.triad(primaryHex);
              } else {
                var complement = $.xcolor.tetrad(primaryHex);
              }
              if (secondaryShade == primaryShade ) {
                var complementColor = complement[2]
              } else {
                var complementColor = complement[1]
              }
              var color = complementColor.toString();
              addtoTheme('chartTertiary', color)

              $('#chartTertiary-light-0').clone().appendTo('#Solid-C3').attr('id','C3-01-Solid').find('.subtitle1').html('Solid');
              $('#chartTertiary-light-100').clone().appendTo('#Solid-C3').attr('id','C3-02-Solid').find('.subtitle1').html('Solid');
              $('#chartTertiary-light-200').clone().appendTo('#Solid-C3').attr('id','C3-03-Solid').find('.subtitle1').html('Solid');
              $('#chartTertiary-dark-0').clone().appendTo('#dm-Solid-C3').attr('id','dm-C3-01-Solid').find('.subtitle1').html('Solid');
              $('#chartTertiary-dark-100').clone().appendTo('#dm-Solid-C3').attr('id','dm-C3-02-Solid').find('.subtitle1 ').html('Solid');
              $('#chartTertiary-dark-300').clone().appendTo('#dm-Solid-C3').attr('id','dm-C3-03-Solid').find('.subtitle1 ').html('Solid');

            } else {
              $('#'+tertiaryShade+'-light-0').clone().appendTo('#Solid-C3').attr('id','C3-01-Solid').find('.subtitle1 ').html('Solid');
              $('#'+tertiaryShade+'-light-100').clone().appendTo('#Solid-C3').attr('id','C3-02-Solid').find('.subtitle1 ').html('Solid');
              $('#'+tertiaryShade+'-light-200').clone().appendTo('#Solid-C3').attr('id','C3-03-Solid').find('.subtitle1 ').html('Solid');
              $('#'+tertiaryShade+'-dark-0').clone().appendTo('#dm-Solid-C3').attr('id','dm-C3-01-Solid').find('.subtitle1 ').html('Solid');
              $('#'+tertiaryShade+'-dark-100').clone().appendTo('#dm-Solid-C3').attr('id','dm-C3-02-Solid').find('.subtitle1 ').html('Solid');
              $('#'+tertiaryShade+'-dark-300').clone().appendTo('#dm-Solid-C3').attr('id','dm-C3-03-Solid').find('.subtitle1 ').html('Solid');
            }
            var contrastRation = contrast(tertiaryArray, [34,34,34]);
          }

        }
      // set the official colors  //

       chartPrimary1      = $(document).find('#C1-01-Solid .Hex').css('backgroundColor');
       chartPrimary2      = $(document).find('#C1-02-Solid .Hex').css('backgroundColor');
       chartPrimary3      = $(document).find('#C1-03-Solid .Hex').css('backgroundColor');
       chartSecondary1    = $(document).find('#C2-01-Solid .Hex').css('backgroundColor');
       chartSecondary2    = $(document).find('#C2-02-Solid .Hex').css('backgroundColor');
       chartSecondary3    = $(document).find('#C2-03-Solid .Hex').css('backgroundColor');
       chartTertiary1     = $(document).find('#C3-01-Solid .Hex').css('backgroundColor');
       chartTertiary2     = $(document).find('#C3-02-Solid .Hex').css('backgroundColor');
       chartTertiary3     = $(document).find('#C3-03-Solid .Hex').css('backgroundColor');
       dmchartPrimary1    = $(document).find('#dm-C1-01-Solid .Hex').css('backgroundColor');
       dmchartPrimary2    = $(document).find('#dm-C1-02-Solid .Hex').css('backgroundColor');
       dmchartPrimary3    = $(document).find('#dm-C1-03-Solid .Hex').css('backgroundColor');
       dmchartSecondary1  = $(document).find('#dm-C2-01-Solid .Hex').css('backgroundColor');
       dmchartSecondary2  = $(document).find('#dm-C2-02-Solid .Hex').css('backgroundColor');
       dmchartSecondary3  = $(document).find('#dm-C2-03-Solid .Hex').css('backgroundColor');
       dmchartTertiary1   = $(document).find('#dm-C3-01-Solid .Hex').css('backgroundColor');
       dmchartTertiary2   = $(document).find('#dm-C3-02-Solid .Hex').css('backgroundColor');
       dmchartTertiary3   = $(document).find('#dm-C3-03-Solid .Hex').css('backgroundColor');
       chartPrimary1Opaque       = chartPrimary1.replace('rgb','rgba').replace(')',',.2)')
       chartPrimary2Opaque       = chartPrimary2.replace('rgb','rgba').replace(')',',.2)')
       chartPrimary3Opaque       = chartPrimary3.replace('rgb','rgba').replace(')',',.2)')
       dmchartPrimary1Opaque     = dmchartPrimary1.replace('rgb','rgba').replace(')',',.2)')
       dmchartPrimary2Opaque     = dmchartPrimary2.replace('rgb','rgba').replace(')',',.2)')
       dmchartPrimary3Opaque     = dmchartPrimary3.replace('rgb','rgba').replace(')',',.2)')
       chartSecondary1Opaque     = chartSecondary1.replace('rgb','rgba').replace(')',',.2)')
       chartSecondary2Opaque     = chartSecondary2.replace('rgb','rgba').replace(')',',.2)')
       chartSecondary3Opaque     = chartSecondary3.replace('rgb','rgba').replace(')',',.2)')
       dmchartSecondary1Opaque   = dmchartSecondary1.replace('rgb','rgba').replace(')',',.2)')
       dmchartSecondary2Opaque   = dmchartSecondary2.replace('rgb','rgba').replace(')',',.2)')
       dmchartSecondary3Opaque   = dmchartSecondary3.replace('rgb','rgba').replace(')',',.2)')
       chartTertiary1Opaque      = chartTertiary1.replace('rgb','rgba').replace(')',',.2)')
       chartTertiary2Opaque      = chartTertiary2.replace('rgb','rgba').replace(')',',.2)')
       chartTertiary3Opaque      = chartTertiary3.replace('rgb','rgba').replace(')',',.2)')
       dmchartTertiary1Opaque    = dmchartTertiary1.replace('rgb','rgba').replace(')',',.2)')
       dmchartTertiary2Opaque    = dmchartTertiary2.replace('rgb','rgba').replace(')',',.2)')
       dmchartTertiary3Opaque    = dmchartTertiary3.replace('rgb','rgba').replace(')',',.2)')
       // update system //
       $(document).find('#' + system + ' .' +system +  '-light-C1-01').html(chartPrimary1);
       $(document).find('#' + system + ' .' +system +  '-light-C1-02').html(chartPrimary2);
       $(document).find('#' + system + ' .' +system +  '-light-C1-03').html(chartPrimary3);
       $(document).find('#' + system + ' .' +system +  '-light-C2-01').html(chartSecondary1);
       $(document).find('#' + system + ' .' +system +  '-light-C2-02').html(chartSecondary2);
       $(document).find('#' + system + ' .' +system +  '-light-C2-03').html(chartSecondary3);
       $(document).find('#' + system + ' .' +system +  '-light-C3-01').html(chartTertiary1);
       $(document).find('#' + system + ' .' +system +  '-light-C3-02').html(chartTertiary2);
       $(document).find('#' + system + ' .' +system +  '-light-C3-03').html(chartTertiary1);
       $(document).find('#' + system + ' .' +system +  '-dark-C1-01').html(dmchartPrimary1);
       $(document).find('#' + system + ' .' +system +  '-dark-C1-02').html(dmchartPrimary2);
       $(document).find('#' + system + ' .' +system +  '-dark-C1-03').html(dmchartPrimary3);
       $(document).find('#' + system + ' .' +system +  '-dark-C2-01').html(dmchartSecondary1);
       $(document).find('#' + system + ' .' +system +  '-dark-C2-02').html(dmchartSecondary2);
       $(document).find('#' + system + ' .' +system +  '-dark-C2-03').html(dmchartSecondary3);
       $(document).find('#' + system + ' .' +system +  '-dark-C3-01').html(dmchartTertiary1);
       $(document).find('#' + system + ' .' +system +  '-dark-C3-02').html(dmchartTertiary2);
       $(document).find('#' + system + ' .' +system +  '-dark-C3-03').html(dmchartTertiary1);
       // add the gradients //
       $(document).find('#C1-01-Solid').after('<div class="chart-gradient chart-gradient-C1-01"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#C1-02-Solid').after('<div class="chart-gradient chart-gradient-C1-02"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#C1-03-Solid').after('<div class="chart-gradient chart-gradient-C1-03"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#dm-C1-01-Solid').after('<div class="chart-gradient dm-chart-gradient-C1-01"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#dm-C1-02-Solid').after('<div class="chart-gradient dm-chart-gradient-C1-02"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#dm-C1-03-Solid').after('<div class="chart-gradient dm-chart-gradient-C1-03"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#C2-01-Solid').after('<div class="chart-gradient chart-gradient-C2-01"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#C2-02-Solid').after('<div class="chart-gradient chart-gradient-C2-02"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#C2-03-Solid').after('<div class="chart-gradient chart-gradient-C2-03"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#dm-C2-01-Solid').after('<div class="chart-gradient dm-chart-gradient-C2-01"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#dm-C2-02-Solid').after('<div class="chart-gradient dm-chart-gradient-C2-02"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#dm-C2-03-Solid').after('<div class="chart-gradient dm-chart-gradient-C2-03"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#C3-01-Solid').after('<div class="chart-gradient chart-gradient-C3-01" id="color-blind-c3-1"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#C3-02-Solid').after('<div class="chart-gradient chart-gradient-C3-02" id="color-blind-c3-2"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#C3-03-Solid').after('<div class="chart-gradient chart-gradient-C3-03" id="color-blind-c3-3"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#dm-C3-01-Solid').after('<div class="chart-gradient dm-chart-gradient-C3-01" id="dm-color-blind-c3-1"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#dm-C3-02-Solid').after('<div class="chart-gradient dm-chart-gradient-C3-02" id="dm-color-blind-c3-2"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');
       $(document).find('#dm-C3-03-Solid').after('<div class="chart-gradient dm-chart-gradient-C3-03" id="dm-color-blind-c3-3"><div class="subtitle">Grad.</div><div class="Hex"></div></div>');

      if ( colorTheory == 'Color Blind') {
         $(document).find('#color-blind-c3-1 .Hex').attr('style','')
         $(document).find('#color-blind-c3-2 .Hex').attr('style','')
         $(document).find('#color-blind-c3-3 .Hex').attr('style','')
         $(document).find('#dm-color-blind-c3-1 .Hex').attr('style','')
         $(document).find('#dm-color-blind-c3-2 .Hex').attr('style','')
         $(document).find('#dm-color-blind-c3-3 .Hex').attr('style','')
       }

       /// update the root values //
       document.querySelector(':root').style.setProperty('--chart-primary-01' , chartPrimary1);
       document.querySelector(':root').style.setProperty('--chart-primary-02' , chartPrimary2);
       document.querySelector(':root').style.setProperty('--chart-primary-03' , chartPrimary3);
       document.querySelector(':root').style.setProperty('--dm-chart-primary-01' , dmchartPrimary1);
       document.querySelector(':root').style.setProperty('--dm-chart-primary-02' , dmchartPrimary2);
       document.querySelector(':root').style.setProperty('--dm-chart-primary-03' , dmchartPrimary3);
       document.querySelector(':root').style.setProperty('--chart-secondary-01' , chartSecondary1);
       document.querySelector(':root').style.setProperty('--chart-secondary-02' , chartSecondary2);
       document.querySelector(':root').style.setProperty('--chart-secondary-03' , chartSecondary3);
       document.querySelector(':root').style.setProperty('--dm-chart-secondary-01' , dmchartSecondary1);
       document.querySelector(':root').style.setProperty('--dm-chart-secondary-02' , dmchartSecondary2);
       document.querySelector(':root').style.setProperty('--dm-chart-secondary-03' , dmchartSecondary3);
       document.querySelector(':root').style.setProperty('--chart-tertiary-01' , chartTertiary1);
       document.querySelector(':root').style.setProperty('--chart-tertiary-02' , chartTertiary2);
       document.querySelector(':root').style.setProperty('--chart-tertiary-03' , chartTertiary3);
       document.querySelector(':root').style.setProperty('--dm-chart-tertiary-01' , dmchartTertiary1);
       document.querySelector(':root').style.setProperty('--dm-chart-tertiary-02' , dmchartTertiary2);
       document.querySelector(':root').style.setProperty('--dm-chart-tertiary-03' , dmchartTertiary3);
       document.querySelector(':root').style.setProperty('--chart-primary-01-opaque' , chartPrimary1Opaque);
       document.querySelector(':root').style.setProperty('--chart-primary-02-opaque' , chartPrimary2Opaque);
       document.querySelector(':root').style.setProperty('--chart-primary-03-opaque' , chartPrimary3Opaque);
       document.querySelector(':root').style.setProperty('--dm-chart-primary-01-opaque' , dmchartPrimary1Opaque);
       document.querySelector(':root').style.setProperty('--dm-chart-primary-02-opaque' , dmchartPrimary2Opaque);
       document.querySelector(':root').style.setProperty('--dm-chart-primary-03-opaque' , dmchartPrimary3Opaque);
       document.querySelector(':root').style.setProperty('--chart-secondary-01-opaque' , chartSecondary1Opaque);
       document.querySelector(':root').style.setProperty('--chart-secondary-02-opaque' , chartSecondary2Opaque);
       document.querySelector(':root').style.setProperty('--chart-secondary-03-opaque' , chartSecondary3Opaque);
       document.querySelector(':root').style.setProperty('--dm-chart-secondary-01-opaque' , dmchartSecondary1Opaque);
       document.querySelector(':root').style.setProperty('--dm-chart-secondary-02-opaque' , dmchartSecondary2Opaque);
       document.querySelector(':root').style.setProperty('--dm-chart-secondary-03-opaque' , dmchartSecondary3Opaque);
       document.querySelector(':root').style.setProperty('--chart-tertiary-01-opaque' , chartTertiary1Opaque);
       document.querySelector(':root').style.setProperty('--chart-tertiary-02-opaque' , chartTertiary2Opaque);
       document.querySelector(':root').style.setProperty('--chart-tertiary-03-opaque' , chartTertiary3Opaque);
       document.querySelector(':root').style.setProperty('--dm-chart-tertiary-01-opaque' , dmchartTertiary1Opaque);
       document.querySelector(':root').style.setProperty('--dm-chart-tertiary-02-opaque' , dmchartTertiary2Opaque);
       document.querySelector(':root').style.setProperty('--dm-chart-tertiary-03-opaque' , dmchartTertiary3Opaque);

       /// remove colors from palette //
       $(document).find('#chartSecondary-light').prev('div').remove();
       $(document).find('#chartSecondary-light').remove();
       $(document).find('#chartSecondary-dark').prev('div').remove();
       $(document).find('#chartSecondary-dark').remove();
       $(document).find('#chartTertiary-light').prev('div').remove();
       $(document).find('#chartTertiary-light').remove();
       $(document).find('#chartTertiary-dark').prev('div').remove();
       $(document).find('#chartTertiary-dark').remove();
    }

    function buildJSON_Base()  {
      if ( $(document).find('#' + system + 'Default').length > 0 ) {
        var elevationCode = {};
        var change = {};
        var spread = {};
        var blur = {};
        var opacity = {};
        change["value"] = elevationChange ;
        change["type"] = 'other';
        spread["value"] = baseSpread;
        spread["type"] = 'other';
        blur["value"] = baseBlur;
        blur["type"] = 'other';
        opacity["value"] = baseOpacity;;
        opacity["type"] = 'other';
        elevationCode["Change"] = change;
        elevationCode["Spread"] = spread;
        elevationCode["Blur"] = blur;
        elevationCode["Opacity"] = opacity;
        return(elevationCode)
      }
    }

    function buildJSON_Bevel()  {
      if ( $(document).find('#' + system + 'Default').length > 0 ) {
        var elevationCode = {};
        var change = {};
        var horizontal = {};
        var vertical = {};
        var spread = {};
        var blur = {};
        var opacity = {};
        var darkopacity = {};
        change["value"] = bevelchange;
        change["type"] = 'other';
        horizontal["value"] = bevelhorizontal;
        horizontal["type"] = 'other';
        vertical["value"] = bevelvertical;
        vertical["type"] = 'other';
        spread["value"] = bevelSpread;
        spread["type"] = 'other';
        blur["value"] = bevelBlur;
        blur["type"] = 'other';
        opacity["value"] = bevellightOpacity;
        opacity["type"] = 'other';
        darkopacity["value"] = beveldarkOpacity
        darkopacity["type"] = 'other';
        elevationCode["Bevel-Change"] = change;
        elevationCode["Bevel-Horizontal"] = horizontal;
        elevationCode["Bevel-Vertical"] = vertical;
        elevationCode["Bevel-Spread"] = spread;
        elevationCode["Bevel-Blur"] = blur;
        elevationCode["Bevel-Light-Opacity"] = opacity;
        elevationCode["Bevel-Dark-Opacity"] = darkopacity;
        return(elevationCode)
      }
    }
    // inverse bevel //
    function buildJSON_InBevel()  {
      if ( $(document).find('#' + system + 'Default').length > 0 ) {
        var elevationCode = {};
        var change = {};
        var horizontal = {};
        var vertical = {};
        var spread = {};
        var blur = {};
        var darkopacity = {};
        change["value"] = inbevelchange;
        change["type"] = 'other';
        horizontal["value"] = inbevelhorizontal;
        horizontal["type"] = 'other';
        vertical["value"] = inbevelvertical;
        vertical["type"] = 'other';
        spread["value"] = inbevelSpread;
        spread["type"] = 'other';
        blur["value"] = inbevelBlur;
        blur["type"] = 'other';
        darkopacity["value"] =  inbeveldarkOpacity;
        darkopacity["type"] = 'other';
        elevationCode["InBevel-Change"] = change;
        elevationCode["InBevel-Horizontal"] = horizontal;
        elevationCode["InBevel-Vertical"] = vertical;
        elevationCode["InBevel-Spread"] = spread;
        elevationCode["InBevel-Blur"] = blur;
        elevationCode["InBevel-Dark-Opacity"] = darkopacity;
        return(elevationCode)
      }
    }


  function buildJSON_HeaderChange()  {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var changeCode = {};
      var change = {};
      change["value"] = headerChange ;
      change["type"] = 'other';
      changeCode["Header-Change"] = change;
      return(changeCode)
    }
  }

  function buildJSON_TabletHeaderChange()  {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var changeCode = {};
      var change = {};
      change["value"] = '.25' ;
      change["type"] = 'other';
      changeCode["Header-Change"] = change;
      return(changeCode)
    }
  }

  function buildJSON_MobileHeaderChange()  {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var changeCode = {};
      var change = {};
      change["value"] = '.2' ;
      change["type"] = 'other';
      changeCode["Header-Change"] = change;
      return(changeCode)
    }
  }

  function buildJSON_FontFamily()  {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var familyCode = {};
      var primary = {};
      var secondary = {};
      var header = {};
      var body = {};

      primary["value"] = primaryFont;
      primary["type"] = 'fontFamilies';
      secondary["value"] = secondaryFont;
      secondary["type"] = 'fontFamilies';

      familyCode["primary"] =  primary
      familyCode["secondary"] =  secondary

      return(familyCode)
    }
  }




  function getSizing(sizing,grid) {
    var minValue;
    if (sizing != 44) {
      var value = sizing/grid;
      if (sizing == 1) {
        value = '1px'
      } else {
        if (value == 4)  {
          value = 'Half'
        } else if (value == 2) {
          value = 'Half'
        }
      }

      minValue = '{Sizing.Size-'+value+ '}'
    } else {
      minValue = '{Sizing.min-target}'
    }
    return(minValue)
  }

  function getSpacing(sizing,grid) {
    var minValue;
    var value = sizing/grid;
    if (value == .5) {
      value = 'Half'
    }
    minValue = '{Spacing.spacing-'+value+ '}'
    return(minValue)
  }


  function getRadius(sizing,grid) {
    var minValue;
    var value = sizing/grid;

    if (value == .5) {
      value = 'Half'
    } else if (value == .25) {
      value = 'Quarter'
    } else {
      value = value
    }
    minValue = '{Radius.Border-Radius-'+value+ '}'
    return(minValue)
  }

  function getBorder(sizing,grid) {
    var minValue;
    var value = sizing/grid;

    if (value == .5) {
      value = '0'
    } else {
      value = value
    }
    minValue = '{Border.border-'+value+ '}'
    return(minValue)
  }

  function buildJSON_Sizing() {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var sizingCode = {};
      var size1 = {}
      var minheight = {};
      var systembuttonMinWidth = {};
      var buttonHeight = {};
      var smButtonHeight = {};
      var systemchipminWidth = {};
      var systemchipHeight = {};
      var systemsliderbarHeight = {};
      var systemsliderHandleHeight = {};
      var chipminWidth = {};
      var systeminlineImageHeight = {};
      var systemimageHeight = {};
      size1["value"] = grid;
      size1["type"]  = 'sizing';
      minheight["value"] = minTarget;
      minheight["type"]  = 'sizing';
      systembuttonMinWidth  = buttonMinWidth;
      systembuttonMinWidth["type"]  = 'sizing';
      smButtonHeight["value"] = '{Sizing.Size-1} * ' +  smallButtonHeight ;
      smButtonHeight["type"]  = 'sizing';
      systemchipHeight["value"] = '{Sizing.Size-1} * ' + chipHeight;
      systemchipHeight["type"]  = 'sizing';
      systemchipminWidth["value"] = '{Sizing.Size-1} * ' + chipMinWidth;
      systemchipminWidth["type"]  = 'sizing';
      systemsliderbarHeight["value"] = '{Sizing.Size-1} * ' + sliderbarHeight;
      systemsliderbarHeight["type"]  = 'sizing';
      systemsliderHandleHeight["value"] = '{Sizing.Size-1} * ' + sliderhandleHeight;
      systemsliderHandleHeight["type"]  = 'sizing';
      systeminlineImageHeight["value"] = '{Sizing.Size-1} * ' + inlineImageHeight;
      systeminlineImageHeight["type"]  = 'sizing';
      sizingCode["Size-1"] =  size1;
      sizingCode["min-target"] =  minheight
      sizingCode["Button-MinWidth"] =  systembuttonMinWidth
      sizingCode["Sm-Button-Height"] =  smButtonHeight
      sizingCode["Chip-Height"] = systemchipHeight
      sizingCode["Chip-MinWidth"] = systemchipminWidth
      sizingCode["SliderHandle-Height"] =   systemsliderHandleHeight
      sizingCode["Image-Height"] = systeminlineImageHeight
      return(sizingCode)

    }
  }

  function buildJSON_Spacing() {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var spacingCode = {};
      var systemGrid = {};
      var systembuttonPadding = {};
      var systemsmButtonPadding = {};
      var systemchipPadding = {};
      var systemcardPadding = {};
      var systemcardGap = {};
      var systemheroGap = {};
      var systemheroPadding = {};
      var systemsectionPadding = {};
      var systemparagraphPadding = {};
      var systemprimaryTabPadding = {};
      var systemsecondaryTabPadding = {};
      var systemtableheaderPadding = {};
      var systemtablebodyPadding = {};
      var systemsecondaryNavVPadding = {};
      var systemprimaryNavVPadding = {};
      var systemtoastPadding = {};
      var systemtooltipPadding = {};
      var systemmodalPadding = {};
      systemGrid["value"] = grid;
      systemGrid["type"]  = 'spacing';
      systembuttonPadding["value"] = '{Spacing.spacing-1} * ' +  buttonHPadding;
      systembuttonPadding["type"]  = 'spacing';
      systemsmButtonPadding["value"] =  '{Spacing.spacing-1} * ' + smallbuttonHPadding;
      systemsmButtonPadding["type"]  = 'spacing';
      systemchipPadding["value"] = '{Spacing.spacing-1} * ' + chipHPadding;
      systemchipPadding["type"]  = 'spacing';
      systemcardPadding["value"] =  '{Spacing.spacing-1} * ' + cardPadding;
      systemcardPadding["type"]  = 'spacing';
      systemcardGap["value"] = '{Spacing.spacing-1} * ' + cardGap ;
      systemcardGap["type"]  = 'spacing';
      systemheroGap["value"] = '{Spacing.spacing-1} * ' + heroGap;
      systemheroGap["type"]  = 'spacing';
      systemheroPadding["value"] = '{Spacing.spacing-1} * ' + heroPadding;
      systemheroPadding["type"]  = 'spacing';
      systemsectionPadding["value"] = '{Spacing.spacing-1} * ' + sectionPadding;
      systemsectionPadding["type"]  = 'spacing';
      systemtableheaderPadding["value"] =  '{Spacing.spacing-1} * ' + tableheaderPadding;
      systemtableheaderPadding["type"]  = 'spacing';
      systemtablebodyPadding["value"] =  '{Spacing.spacing-1} * ' + tablebodyPadding;
      systemtablebodyPadding["type"]  = 'spacing';
      systemsecondaryNavVPadding["value"] =  '{Spacing.spacing-1} * ' + secondaryNavVPadding;
      systemsecondaryNavVPadding["type"]  = 'spacing';
      systemprimaryNavVPadding["value"] =  '{Spacing.spacing-1} * ' + primaryNavVPadding;
      systemprimaryNavVPadding["type"]  = 'spacing';
      systemtoastPadding["value"] =  '{Spacing.spacing-1} * ' + toastPadding;
      systemtoastPadding["type"]  = 'spacing';
      systemtooltipPadding["value"] =  '{Spacing.spacing-1} * ' + tooltipPadding;
      systemtooltipPadding["type"]  = 'spacing';
      systemmodalPadding["value"] =  '{Spacing.spacing-1} * ' + modalPadding;
      systemmodalPadding["type"]  = 'spacing';
      systemheroGap["value"] = '{Spacing.spacing-1} * ' + heroGap;
      systemheroGap["type"]  = 'spacing';
      spacingCode["Spacing-1"] =  systemGrid
      spacingCode["Button-Padding"] =  systembuttonPadding
      spacingCode["Sm-Button-Padding"] =  systemsmButtonPadding
      spacingCode["Chip-Padding"] =  systemchipPadding
      spacingCode["Card-Padding"] =  systemcardPadding
      spacingCode["Card-Gap"] = systemcardGap
      spacingCode["Hero-Gap"] = systemheroGap
      spacingCode["Hero-Padding"] = systemheroPadding
      spacingCode["Section-Padding"] = systemsectionPadding
      spacingCode["Paragraph-Padding"] = systemparagraphPadding
      spacingCode["TableHeader-Padding"] = systemtableheaderPadding
      spacingCode["TableBody-Padding"] = systemtablebodyPadding
      spacingCode["SecondaryNav-Padding"] = systemsecondaryNavVPadding
      spacingCode["PrimaryNav-Padding"] = systemprimaryNavVPadding
      spacingCode["Toast-Padding"] = systemtoastPadding
      spacingCode["Tooltip-Padding"] = systemtooltipPadding
      spacingCode["Modal-Padding"] = systemmodalPadding
      return(spacingCode)
    }
  }

  function buildJSON_Radius() {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var radiusCode = {};
      var systemborderBase = {};
      var systembuttonRadius = {};
      var systemchipRadius = {};
      var systemcardRadius = {};
      var systemimageRadius = {};
      var systeminlineImage = {};
      var systeminlineSqImage = {};
      var systeminputRadius = {};
      var systemsliderhandleRadius = {};
      var systemmodalRadius = {};
      var systemtooltipRadius = {};
      var systemtoastRadius = {};
      systemborderBase["value"] = radius;
      systemborderBase["type"]  = 'borderRadius';
      systembuttonRadius["value"] = '{Radius.Border-Radius-1} * ' + buttonBorderRadius;
      systembuttonRadius["type"]  = 'borderRadius';
      systemchipRadius["value"] = '{Radius.Border-Radius-1} * ' + chipBorderRadius;
      systemchipRadius["type"]  = 'borderRadius';
      systemcardRadius["value"] = '{Radius.Border-Radius-1} * ' + cardRadius ;
      systemcardRadius["type"]  = 'borderRadius';
      systemimageRadius["value"] = '{Radius.Border-Radius-1} * ' + imageRadius;
      systemimageRadius["type"]  = 'borderRadius';
      systeminlineImage["value"] = '{Radius.Border-Radius-1} * ' + inlineImageRadius;
      systeminlineImage["type"]  = 'borderRadius';
      systeminputRadius["value"] = '{Radius.Border-Radius-1} * ' + radius;
      systeminputRadius["type"]  = 'borderRadius';
      systemsliderhandleRadius["value"] = '{Radius.Border-Radius-1} * ' + sliderhandleRadius;
      systemsliderhandleRadius["type"]  = 'borderRadius';
      systemmodalRadius["value"] = '{Radius.Border-Radius-1} * ' + modalRadius;
      systemmodalRadius["type"]  = 'borderRadius';
      systemtooltipRadius["value"] = '{Radius.Border-Radius-1} * ' + tooltipRadius ;
      systemtooltipRadius["type"]  = 'borderRadius';
      systemtoastRadius["value"] = '{Radius.Border-Radius-1} * ' + toastRadius ;
      systemtoastRadius["type"]  = 'borderRadius';
      radiusCode["Border-Radius-1"] =  systemborderBase
      radiusCode["Button-Radius"] =  systembuttonRadius
      radiusCode["Chip-Radius"] =  systemchipRadius
      radiusCode["Card-Radius"] =  systemcardRadius
      radiusCode["Image-Radius"] = systemimageRadius
      radiusCode["Inline-Image-Radius"] = systeminlineImage
      radiusCode["Input-Radius"] = systeminputRadius
      radiusCode["SliderHandle-Radius"] = systemsliderhandleRadius
      radiusCode["Modal-Radius"] = systemmodalRadius
      radiusCode["Tooltop-Radius"] = systemtooltipRadius
      radiusCode["Toast-Radius"] = systemtoastRadius
      return(radiusCode)
    }
  }


  function buildJSON_Border() {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var borderCode = {};
      var systemborderBase = {};
      var systembuttonBorder = {};
      var systemavatarBorder = {};
      var systemsmAvatarBorder= {};
      var systemImageBorder= {};
      var systemCardBorder= {};
      systemborderBase["value"] = borderWidth;
      systemborderBase["type"]  = 'borderWidth';
      systembuttonBorder["value"] = '{Border.border-1} * ' + buttonBorder;
      systembuttonBorder["type"]  = 'borderWidth';
      systemavatarBorder["value"] =  '{Border.border-1} * ' + avatarBorderLg;
      systemavatarBorder["type"]  = 'borderWidth';
      systemsmAvatarBorder["value"] = '{Border.border-1} * ' + avatarBorder ;
      systemsmAvatarBorder["type"]  = 'borderWidth';
      systemImageBorder["value"] = '{Border.border-1} * ' + imageBorder ;
      systemImageBorder["type"]  = 'borderWidth';
      systemCardBorder["value"] = '{Border.border-1} * ' + cardBorder ;
      systemCardBorder["type"]  = 'borderWidth';
      borderCode["border-1"] =  systemborderBase
      borderCode["Button-Border"] = systembuttonBorder
      borderCode["Lg-Avatar-Border"] = systemavatarBorder
      borderCode["Sm-Avatar-Border"] = systemsmAvatarBorder
      borderCode["Image-Border"] = systemImageBorder
      borderCode["Card-Border"] = systemCardBorder
      return(borderCode)
    }
  }

  function buildJSON_Shadows() {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var shadowCode = {};
      var buttonShadow = {};
      var chipShadow = {};
      var avatarShadow = {};
      var cardShadow = {};
      var imageShadow = {};
      var sliderhandleShadow = {};
      var sliderBarShadow = {};
      var modalShadow = {};
      var tooltipShadow = {};
      var toastShadow = {};
      var dropdownShadow = {};
      buttonShadow ["value"] ='{Elevation-Shadows.elevation-'+buttonElevation+ '},{Bevels.bevel-'+buttonBevel+'}'
      buttonShadow ["type"]  = 'boxShadow';
      chipShadow["value"] = '{Elevation-Shadows.elevation-'+chipElevation+ '}'
      chipShadow["type"]  = 'boxShadow';
      avatarShadow["value"] ='{Elevation-Shadows.elevation-'+avatarElevations+ '}'
      avatarShadow["type"]  = 'boxShadow';
      cardShadow["value"] ='{Elevation-Shadows.elevation-'+ cardElevation+ '},{Bevels.bevel-'+ cardBevel+'}'
      cardShadow["type"]  = 'boxShadow';
      imageShadow["value"] ='{Elevation-Shadows.elevation-'+ imageElevation+ '}'
      imageShadow["type"]  = 'boxShadow';
      sliderhandleShadow["value"] ='{Elevation-Shadows.elevation-'+sliderhandleElevation+ '},{Bevels.bevel-'+sliderhandleBevel+'}'
      sliderhandleShadow["type"]  = 'boxShadow';
      sliderBarShadow["value"] ='{Inverse-Bevels.inbevel-'+  sliderbarBevel+ '}'
      sliderBarShadow["type"]  = 'boxShadow';
      modalShadow["value"] ='{Elevation-Shadows.elevation-'+imageElevation+ '}'
      modalShadow["type"]  = 'boxShadow';
      tooltipShadow["value"] ='{Elevation-Shadows.elevation-'+tooltipElevation+ '},{Bevels.bevel-'+tooltipBevel+'}'
      tooltipShadow["type"]  = 'boxShadow';
      toastShadow["value"] ='{Elevation-Shadows.elevation-'+ toastElevations+ '},{Bevels.bevel-'+ toastBevel+'}'
      toastShadow["type"]  = 'boxShadow';
      dropdownShadow["value"] ='{Elevation-Shadows.elevation-'+ dropdownElevation+ '}'
      dropdownShadow["type"]  = 'boxShadow';
      shadowCode["Button-Shadow"] =  buttonShadow
      shadowCode["Chip-Shadow"] =  chipShadow
      shadowCode["Avatar-Shadow"] = avatarShadow
      shadowCode["Card-Shadow"] =  cardShadow
      shadowCode["Image-Shadow"] = imageShadow
      shadowCode["SliderHandle-Shadow"] = sliderhandleShadow
      shadowCode["SliderBar-Shadow"] = sliderBarShadow
      shadowCode["Modal-Shadow"] = modalShadow
      shadowCode["Tooltip-Shadow"] = tooltipShadow
      shadowCode["Toast-Shadow"] = toastShadow
      shadowCode["Dropdown-Shadow"] = dropdownShadow
      return(shadowCode)
    }
  }




  function jasonify() {
    $(".jason").each(function () {
      var jsonStr = $(this).text();
      var jsonObj = JSON.parse(jsonStr);
      var jsonPretty = JSON.stringify(jsonObj, null, '\t');

      $(this).text(jsonPretty);
    });
  }


  function buildJSON_PrimaryColors(theme, mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var themeShade = {};
      var colorRange = {};
      var onColorRange = {};
      var primeColors = {};
      var halfColor = {};
      var onHalfColor = {};
      var quarterColor = {};
      var onQuarterColor = {};
      var colorName = primaryName.split('-')[0];
      $('#' + colorName + '-' +mode+ ' .color-block').each(function () {
        var colorShade = {};
        var onColorShade = {};
        var shade = $(this).attr('id').split('-')[2];
        var primeColors = {};
        var color = {};
        var onColor = {};

        if (shade == "0") {
          shade = "050"
        }
        if (mode == 'light') {
          colorShade["value"] = window['primary' + shade];
          onColorShade["value"] = window['onprimary' + shade];
        } else {
          colorShade["value"] = window['dmprimary' + shade];
          onColorShade["value"] = window['dmonprimary' + shade];
        }

        colorShade["type"] = 'color';
        onColorShade["type"] = 'color';

        colorRange[shade] = colorShade
        onColorRange[shade] = onColorShade

      });
        // build half color //
        halfColor["value"] =  primaryHalf;
        halfColor["type"] = 'color';
        onHalfColor["value"] = '{text.dark}';
        onHalfColor["type"] = 'color';
        colorRange['Half'] = halfColor
        onColorRange['Half'] = onHalfColor
        // build quarter color //
        quarterColor["value"] =  primaryQuarter ;
        quarterColor["type"] = 'color';
        onQuarterColor["value"] = '{text.dark}';
        onQuarterColor["type"] = 'color';
        colorRange['Quarter'] = quarterColor;
        onColorRange['Quarter'] = onQuarterColor;

        primeColors["Color"] =  colorRange;
        primeColors["On-Color"] =  onColorRange;
        themeShade["Primary"] = primeColors;
      return{color: colorRange, oncolor: onColorRange}
    }
  }

  function buildJSON_SecondaryColors(theme, mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var themeCode = {};
      var themeShade = {};
      var colorRange = {};
      var onColorRange = {};
      var primeColors = {};
      var colorName = secondaryName.split('-')[0];
      var i = 0
      while ( i < 1000) {
        var colorShade = {};
        var onColorShade = {};
        var shade = i
        if (shade == "0") {
          shade = "050"
        }
        var primeColors = {};
        var color = {};
        var onColor = {};
        if (mode == 'light') {
          colorShade["value"] = window['secondary' + i];
          onColorShade["value"] = window['onsecondary' + i];
        } else {
          colorShade["value"] = window['dmsecondary' + i];
          onColorShade["value"] = window['dmonsecondary' + i];
        }

        colorShade["type"] = 'color';
        onColorShade["type"] = 'color';

        colorRange[shade] = colorShade
        onColorRange[shade] = onColorShade
        primeColors["Color"] =  colorRange;
        primeColors["On-Color"] =  onColorRange;
        themeShade["Secondary"] = primeColors;
        i = i + 100;
      }


      return{color: colorRange, oncolor: onColorRange}
    }
  }

  function buildJSON_TertiaryColors(theme, mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var themeCode = {};
      var themeShade = {};
      var colorRange = {};
      var onColorRange = {};
      var primeColors = {};
      var colorName = tertiaryName.split('-')[0];
      var i = 0
      while ( i < 1000) {
        var colorShade = {};
        var onColorShade = {};
        var shade = i
        if (shade == "0") {
          shade = "050"
        }
        var primeColors = {};
        var color = {};
        var onColor = {};

        if (mode == 'light') {
          colorShade["value"] = window['tertiary' + i];
          onColorShade["value"] = window['ontertiary' + i];
        } else {
          colorShade["value"] = window['dmtertiary' + i];
          onColorShade["value"] = window['dmontertiary' + i];
        }
        colorShade["type"] = 'color';
        onColorShade["type"] = 'color';
        colorRange[shade] = colorShade
        onColorRange[shade] = onColorShade
        primeColors["Color"] =  colorRange;
        primeColors["On-Color"] =  onColorRange;
        themeShade["Tertiary"] = primeColors;

        i = i + 100;
      }

      return{color: colorRange, oncolor: onColorRange}
    }
  }


  function buildJSON_ThemeColors(theme, mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var themeCode = {};
      var colorsPrimary = {};
      var colorsSecondary = {};
      var colorsTertiary = {};
      var primary   = buildJSON_PrimaryColors(theme, mode);
      var secondary = buildJSON_SecondaryColors(theme, mode);
      var tertiary  = buildJSON_TertiaryColors(theme, mode);
      colorsPrimary["Color"]   = primary.color;
      colorsPrimary["On-Color"]   = primary.oncolor;
      colorsSecondary["Color"]     = secondary.color;
      colorsSecondary["On-Color"]   = secondary.oncolor;
      colorsTertiary["Color"]     = tertiary.color;
      colorsTertiary["On-Color"]   = tertiary.oncolor;
      themeCode["Primary"]   =  colorsPrimary;
      themeCode["Secondary"] =  colorsSecondary;
      themeCode["Tertiary"]  =  colorsTertiary;
      return(themeCode)
    }
  }

  function buildJSON_Buttons(type, mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var buttonCode = {};
      var button = {};
      var onbutton = {};
      var buttonHalf = {};
      var buttonGroup = {};
      var colored = {};
      var background   = backgroundPrimary;
      var background = rgb2hex(background);
      var color = buttonsName.split('-')[0];
      color = capitalizeFirstLetter(color)
      var shade = buttonsName.split('-')[1];
      button["value"] = '{Theme-Colors.' + color +'.Color.' + shade + '}';
      button["type"]  = 'color';
      onbutton["value"] = '{Theme-Colors.' + color +'.On-Color.' + shade +'}';
      onbutton["type"]  = 'color';
      buttonHalf["value"] = '{Buttons.Colored.Color}80';
      buttonHalf["type"]  = 'color';
      buttonGroup["value"] = groupButtonBG;
      buttonGroup["type"]  = 'color';
      // Build the colored button //
      colored["Color"] =  button;
      if (type == 'button') {
        colored["On-Color"] =    onbutton;
        colored["Color-Half"] =    buttonHalf;
      }
      buttonCode["Colored"] =  colored;
      return(buttonCode)
    }
  }

  function buildJSON_Hotlinks(mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var hotlinkCode = {};
      var colored = {};
      var hotlink = {};
      var vhotlink = {};
      var ahotlink = {};
      if (mode == 'light') {
        var color = hotlinkName.split('-')[0];
        color = capitalizeFirstLetter(color)
        var shade = hotlinkName.split('-')[1];
      } else {
        var color = dmhotlinkName.split('-')[0];
        color = capitalizeFirstLetter(color)
        var shade = dmhotlinkName.split('-')[1];
      }
      hotlink["value"]   = '{Theme-Colors.' + color +'.Color.' + shade + '}';
      hotlink["type"]    = 'color';
      vhotlink["value"]  = '{Hotlinks.Colored.Link}B3';
      vhotlink["type"]   = 'color';
      ahotlink["value"]  = '{Hotlinks.Colored.Link}';
      ahotlink["type"]   = 'color';
      colored["Link"]    =  hotlink;
      colored["Visited"] =  vhotlink;
      colored["Active"]  =  ahotlink;
      hotlinkCode["Colored"] =  colored;
      return(hotlinkCode)
    }
  }

  function buildJSON_Chips(mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var chipCode = {};
      var chip = {};
      var chipHalf = {};
      var onChip= {};
      if (mode == 'dark') {
        chip["value"] = '{Core-Colors.White.Color-Half}';
        chip["type"]  = 'color';
        chipHalf["value"] = '{Core-Colors.White.Color-Quarter}';
        chipHalf["type"]  = 'color';
        onChip["value"] = '{Core-Colors.White.On-Color}';
        onChip["type"]  = 'color';
      } else {
        var background = backgroundPrimaryName
        if (background == 'primary-900-bg' || background == 'nearblack-bg') {
          chip["value"] = '{Core-Colors.White.Color-Half}';
          chip["type"]  = 'color';
          chipHalf["value"] = '{Core-Colors.White.Color-Quarter}';
          chipHalf["type"]  = 'color';
          onChip["value"] = '{Core-Colors.White.On-Color}';
          onChip["type"]  = 'color';
        } else {
          chip["value"] = '{Core-Colors.Black.Color-Half}';
          chip["type"]  = 'color';
          chipHalf["value"] = '{Core-Colors.Black.Color-Quarter}';
          chipHalf["type"]  = 'color';
          onChip["value"] = '{Core-Colors.Black.On-Color}';
          onChip["type"]  = 'color';
        }
      }
      chipCode['Color']        =  chip;
      chipCode['Colorhalf']    =  chipHalf;
      chipCode['On-Color']     =  onChip;
      return(chipCode)
    }
  }

  function buildJSON_ChartColors(mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var colorCode = {};
      var solidCode = {};
      var c101 = {};
      var c102 = {};
      var c103 = {};
      var c201 = {};
      var c202 = {};
      var c203 = {};
      var c301 = {};
      var c302 = {};
      var c303 = {};
      var colorC101 = $(document).find('#' + system + ' .' +system +  '-'+mode+'-C1-01').html();
      var colorC102 = $(document).find('#' + system + ' .' +system +  '-'+mode+'-C1-02').html();
      var colorC103 = $(document).find('#' + system + ' .' +system +  '-'+mode+'-C1-03').html();
      var colorC201 = $(document).find('#' + system + ' .' +system +  '-'+mode+'-C2-01').html();
      var colorC202 = $(document).find('#' + system + ' .' +system +  '-'+mode+'-C2-02').html();
      var colorC203 = $(document).find('#' + system + ' .' +system +  '-'+mode+'-C2-03').html();
      var colorC301 = $(document).find('#' + system + ' .' +system +  '-'+mode+'-C3-01').html();
      var colorC302 = $(document).find('#' + system + ' .' +system +  '-'+mode+'-C3-02').html();
      var colorC303 = $(document).find('#' + system + ' .' +system +  '-'+mode+'-C3-03').html();
      c101["value"] = colorC101;
      c101["type"]  = 'color';
      c102["value"] = colorC102;
      c102["type"]  = 'color';
      c103["value"] = colorC103;
      c103["type"]  = 'color';
      c201["value"] = colorC201;
      c201["type"]  = 'color';
      c202["value"] = colorC202;
      c202["type"]  = 'color';
      c203["value"] = colorC203;
      c203["type"]  = 'color';
      c301["value"] = colorC301;
      c301["type"]  = 'color';
      c302["value"] = colorC302;
      c302["type"]  = 'color';
      c303["value"] = colorC303;
      c303["type"]  = 'color';
      solidCode["C1-01"] =  c101;
      solidCode["C1-02"] =  c102;
      solidCode["C1-03"] =  c103;
      solidCode["C2-01"] =  c201;
      solidCode["C2-02"] =  c202;
      solidCode["C2-03"] =  c203;
      solidCode["C3-01"] =  c301;
      solidCode["C3-02"] =  c302;
      solidCode["C3-03"] =  c303;
      colorCode['Solid'] =  solidCode
      return(colorCode)
    }
  }

  function buildJSON_Icons() {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var iconCode = {};
      var icon = {};
      var onicon = {};
      var color = iconsName.split('-')[0];
      var shade = iconsName.split('-')[1];
      icon["value"] = '{Theme-Colors.' + color +'.Color.' + shade + '}';
      icon["type"]  = 'color';
      onicon["value"] = '{Theme-Colors.' + color +'.On-Color.' + shade +'}';
      onicon["type"]  = 'color';
      iconCode["Color"] =  icon;
      iconCode["On-Color"] =  onicon;
      return(iconCode)
    }
  }


  function buildJSON_States(mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var stateCode = {};
      var infoCode = {};
      var systeminfo = {};
      var systemoninfo = {};
      var successCode = {};
      var systemsuccess = {};
      var systemonsuccess = {};
      var warningCode = {};
      var systemwarning = {};
      var systemonwarning = {};
      var dangerCode = {};
      var systemdanger = {};
      var systemondanger = {};
      // info //
      if (mode == 'dark') {
        systeminfo["value"]   = dminfo;
        systemoninfo["value"] = dmoninfo;
      } else {
        systeminfo["value"]   = info;
        systemoninfo["value"] = oninfo;
      }
      systeminfo["type"]    = 'color';
      systemoninfo["type"]  = 'color';
      infoCode['Color']     = systeminfo;
      infoCode['On-Color']  = systemoninfo;
      // success //
      if (mode == 'dark') {
        systemsuccess["value"]   = dmsuccess;
        systemonsuccess["value"] = dmonsuccess;
      } else {
        systemsuccess["value"]   = success;
        systemonsuccess["value"] = onsuccess;
      }

      systemsuccess["type"]    = 'color';
      systemonsuccess["type"]  = 'color';

      successCode['Color']     = systemsuccess;
      successCode['On-Color']  = systemonsuccess;
      // warning //
      if (mode == 'dark') {
        systemwarning["value"]   = dmwarning;
        systemonwarning["value"] = dmonwarning;
      } else {
        systemwarning["value"]   = warning;
        systemonwarning["value"] = onwarning;
      }
      systemwarning["type"]  = 'color';
      systemonwarning["type"]  = 'color';
      warningCode['Color'] = systemwarning;
      warningCode['On-Color'] = systemonwarning;
      // danger //
      danger = 'rgb(' + danger + ')';
      if (mode == 'dark') {
        systemdanger["value"]   = 'rgb(' + dmdanger + ')';
        systemondanger["value"] = dmondanger;
      } else {
        systemdanger["value"]   = 'rgb(' + danger + ')';
        systemondanger["value"] = ondanger;
      }
      systemdanger["type"]    = 'color';
      systemondanger["type"]  = 'color';
      dangerCode['Color']     = systemdanger;
      dangerCode['On-Color']  = systemondanger;
      // build code //
      stateCode["Info"]       =  infoCode;
      stateCode["Success"]    =  successCode;
      stateCode["Warning"]    =  warningCode;
      stateCode["Error"]      =  dangerCode;
      return(stateCode)
    }
  }

  function buildJSON_Backgrounds(mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var bgCode = {};
      var primaryBG = {};
      var primary = {};
      var onprimary = {};
      var primaryButton = {};
      var primaryOnButton = {};
      var primaryIcon = {};
      var secondaryBG = {};
      var secondary = {};
      var onsecondary = {};
      var secondaryButton = {};
      var secondaryOnButton = {};
      var secondaryIcon = {};
      var tertiaryBG = {};
      var tertiary = {};
      var ontertiary = {};
      var tertiaryButton = {};
      var tertiaryOnButton = {};
      var tertiaryIcon = {};
      var tertiaryHotlink = {};
      var blackBG = {};
      var blackButton = {};
      var blackOnButton = {};
      var blackIcon  = {};
      var blackHotlink  = {};
      var whiteBG = {};
      var whiteButton = {};
      var whiteOnButton = {};
      var whiteIcon = {};
      var whiteHotlink = {};
      if (mode == 'light') {
        if (backgroundPrimaryName == 'primary-half-bg' || backgroundPrimaryName == 'white-bg') {
          if  (backgroundPrimaryName == 'primary-half-bg') {
            primary["value"]      = '{Theme-Colors.Primary.Color.Half}';
            secondary["value"]    = '{Theme-Colors.Primary.Color.Quarter}';
          } else {
            primary["value"]      = '{Core-Colors.White.Color}';
            secondary["value"]    = '{Core-Colors.Gray.Color.050}';
          }
          onprimary["value"]      = '{Theme-Colors.Primary.On-Color.Half}';
          onsecondary["value"]    = '{Theme-Colors.Primary.On-Color.Quarter}';
          // tertiary BG //
          tertiary["value"]       = '{Theme.Primary.Color}';
          ontertiary["value"]     = '{Theme.Primary.On-Color}';

        } else {
          // else it is a dark color //
          // if the color is the primaryDarkBG
          if (backgroundPrimaryName  == primaryDarkBG ) {
            primary["value"]         = primaryDarkBG ;
            secondary["value"]       = secondaryDarkBG;
          // else it's near black //
          } else {
            primary["value"]         = '{Core-Colors.Near-Black.Color}';
            secondary["value"]       = '{Core-Colors.Black.Color}';
          }
          onprimary["value"]         = '{text.white}';
          onsecondary["value"]       = '{text.white}';
          // tertiary BG //
          tertiary["value"]          = '{Theme-Colors.Primary.Color.700}';
          ontertiary["value"]        = '{text.white}';
          if (buttonOnTertiary == buttons) {
            tertiaryButton["value"]  = '{Buttons.Colored.Color}';
            tertiaryOnButton["value"]  = '{Buttons.Colored.On-Color}';
          } else {
            if (buttonOnTertiary == black) {
              tertiaryButton["value"] = '{Buttons.Dark.Color}';
              tertiaryOnButton["value"] = '{Buttons.Dark.On-Color}';
            } else {
              tertiaryButton["value"] = '{Buttons.White.Color}';
              tertiaryOnButton["value"] = '{Buttons.White.On-Color}';
            }
          }
          if (iconOnTertiary == icons) {
            tertiaryIcon["value"]  = '{Icons.Colored.Color}';
          }  else {
            if (iconOnTertiary == black) {
              tertiaryIcon["value"] = '{Icons.Dark.Color}';
            } else {
              tertiaryIcon["value"] = '{Icons.White.Color}';
            }
          }
          if (hotlinkOnTertiary == hotlink) {
            tertiaryHotlink["value"]  = '{Hotlinks.Colored.Link}';
          }  else {
            if (iconOnTertiary == black) {
              tertiaryHotlink["value"] = '{Hotlinks.Dark.Link}';
            } else {
              tertiaryHotlink["value"] = '{Hotlinks.White.Link}';
            }
          }
        }

      } else {
        // else it is a dark color //
        // if the color is the primaryDarkBG
        if (dmbackgroundPrimaryName  == primaryDarkBG ) {
          primary["value"]         = primaryDarkBG ;
          secondary["value"]       = secondaryDarkBG;
        // else it's near black //
        } else {
          primary["value"]         = '{Core-Colors.Near-Black.Color}';
          secondary["value"]       = '{Core-Colors.Black.Color}';
        }
        onprimary["value"]         = '{text.white}';
        onsecondary["value"]       = '{text.white}';
        // tertiary BG //
        tertiary["value"]          = '{Theme-Colors.Primary.Color.700}';
        ontertiary["value"]        = '{text.white}';
        if (dmbuttonOnTertiary == dmbuttons) {
          tertiaryButton["value"]  = '{Buttons.Colored.Color}';
          tertiaryOnButton["value"]  = '{Buttons.Colored.On-Color}';
        } else {
          if (dmbuttonOnTertiary == black) {
            tertiaryButton["value"] = '{Buttons.Dark.Color}';
            tertiaryOnButton["value"] = '{Buttons.Dark.On-Color}';
          } else {
            tertiaryButton["value"] = '{Buttons.White.Color}';
            tertiaryOnButton["value"] = '{Buttons.White.On-Color}';
          }
        }
        if (dmiconOnTertiary == dmicons) {
          tertiaryIcon["value"]  = '{Icons.Colored.Color}';
        }  else {
          if (dmiconOnTertiary == black) {
            tertiaryIcon["value"] = '{Icons.Dark.Color}';
          } else {
            tertiaryIcon["value"] = '{Icons.White.Color}';
          }
        }
        if (dmhotlinkOnTertiary == dmhotlink) {
          dmtertiaryHotlink["value"]  = '{Hotlinks.Colored.Link}';
        }  else {
          if (dmiconOnTertiary == black) {
            tertiaryHotlink["value"] = '{Hotlinks.Dark.Link}';
          } else {
            tertiaryHotlink["value"] = '{Hotlinks.White.Link}';
          }
        }
      }
      // black BG //
      if (buttonOnBlack == buttons) {
        blackButton["value"]          = '{Buttons.Colored.Color}';
        blackOnButton["value"]        = '{Buttons.Colored.On-Color}';
      } else {
        blackButton["value"]          = '{Buttons.White.Color}';
        blackOnButton["value"]        = '{Buttons.White.On-Color}';
      }
      if (iconOnBlack == icons) {
        blackIcon["value"]            = '{Icons.Colored.Color}';
      } else {
        blackIcon["value"]            = '{Icons.White.Color}';
      }
      if (hotlinkOnBlack == hotlink) {
        blackHotlink["value"]         = '{Hotlinks.Colored.Link}';
      } else {
        blackHotlink["value"]         = '{Hotlinks.White.Link}';
      }
      blackButton["type"]            = 'color';
      blackOnButton["type"]          = 'color';
      blackIcon["type"]              = 'color';
      blackHotlink["type"]           = 'color';
      // white BG //
      if (buttonOnWhite == buttons) {
        whiteButton["value"]          = '{Buttons.Colored.Color}';
        whiteOnButton["value"]        = '{Buttons.Colored.On-Color}';
      } else {
        whiteButton["value"]          = '{Buttons.Dark.Color}';
        whiteOnButton["value"]        = '{Buttons.Dark.On-Color}';
      }
      if (iconOnWhite == icons) {
        whiteIcon["value"]            = '{Icons.Colored.Color}';
      } else {
        whiteIcon["value"]            = '{Icons.Dark.Color}';
      }
      if (hotlinkOnBlack == hotlink) {
        whiteHotlink["value"]          = '{Hotlinks.Colored.Link}';
      } else {
        whiteHotlink["value"]          = '{Hotlinks.Dark.Link}';
      }

      whiteButton["type"]           = 'color';
      whiteOnButton["type"]         = 'color';
      whiteIcon["type"]             = 'color';
      whiteHotlink["type"]          = 'color';
      // add the json type tags //
      primary["type"]               = 'color';
      onprimary["type"]             = 'color';
      secondary["type"]              = 'color';
      onsecondary["type"]           = 'color';
      tertiary["type"]              = 'color';
      ontertiary["type"]            = 'color';
      tertiaryButton["type"]        = 'color';
      tertiaryOnButton["type"]      = 'color';
      tertiaryIcon["type"]          = 'color';
      tertiaryHotlink["type"]       = 'color';
      // tertiary //
      //NOTE WE DO NOT NEED TO PASS ALONG THE ON PRIMARY AND SECONDARY ON BUTTONS< ICONS AND HOTLINKS COLOR B/C IT ALWAYS IS DESIGNED TO WORK ON BOTH ///
      primaryBG["Color"]      = primary;
      primaryBG["On-Color"]   = onprimary;
      secondaryBG["Color"]    = secondary;
      secondaryBG["On-Color"] = onsecondary;
      tertiaryBG["Color"]     = tertiary;
      tertiaryBG["On-Color"]  = ontertiary;
      tertiaryBG["Button"]    = tertiaryButton;
      tertiaryBG["On-Button"] = tertiaryOnButton;
      tertiaryBG["Icon"]      = tertiaryIcon;
      tertiaryBG["Hotlink"]   = tertiaryHotlink;
      blackBG["Button"]       = blackButton;
      blackBG["On-Button"]    = blackOnButton;
      blackBG["Icon"]         = blackIcon;
      blackBG["Hotlink"]      = blackHotlink;
      whiteBG["Button"]       = whiteButton;
      whiteBG["On-Button"]    = whiteOnButton;
      whiteBG["Icon"]         = whiteIcon;
      whiteBG["Hotlink"]      = whiteHotlink;
      bgCode["Primary"]       = primaryBG;
      bgCode["Secondary"]     = secondaryBG;
      bgCode["Tertiary"]      = tertiaryBG;
      bgCode["Black"]         = blackBG;
      bgCode["White"]         = whiteBG;
      return(bgCode)
    }
  }

  function buildJSON_White() {
    if ($(document).find('#' + system + 'Default').length > 0 ) {
      var coreCode = {};
      var coreWhiteCode = {};
      var coreGrayCode = {};
      var coreBlackCode = {};
      var whiteCode = {};
      var blackColor = {};
      var whiteColor = {};
      var grayCode = {};
      var grayColor = {};
      var grayOnColor = {};
      var grayCode0 = {};
      var grayCode100 = {};
      var grayCode200 = {};
      var grayCode300 = {};
      var grayCode400 = {};
      var grayCode500 = {};
      var grayCode600 = {};
      var grayCode700 = {};
      var grayCode800 = {};
      var grayCode900 = {};
      var ongrayCode0 = {};
      var ongrayCode100 = {};
      var ongrayCode200 = {};
      var ongrayCode300 = {};
      var ongrayCode400 = {};
      var ongrayCode500 = {};
      var ongrayCode600 = {};
      var ongrayCode700 = {};
      var ongrayCode800 = {};
      var ongrayCode900 = {};
      grayCode0["value"]    = '#e9e9e9';
      grayCode0["type"]     = 'color';
      grayCode100["value"]    = '#cdcdcd';
      grayCode100["type"]     = 'color';
      grayCode200["value"]    = '#b9b9b9';
      grayCode200["type"]     = 'color';
      grayCode300["value"]    = '#a4a4a4';
      grayCode300["type"]     = 'color';
      grayCode400["value"]    = '#909090';
      grayCode400["type"]     = 'color';
      grayCode500["value"]    = '#545454';
      grayCode500["type"]     = 'color';
      grayCode600["value"]    = '#545454';
      grayCode600["type"]     = 'color';
      grayCode700["value"]    = '#515151';
      grayCode700["type"]     = 'color';
      grayCode800["value"]    = '#3c3c3c';
      grayCode800["type"]     = 'color';
      grayCode900["value"]    = '#292929';
      grayCode900["type"]     = 'color';
      ongrayCode0["value"]    = '{text.dark}';
      ongrayCode0["type"]     = 'color';
      ongrayCode100["value"]    ='{text.dark}';
      ongrayCode100["type"]     = 'color';
      ongrayCode200["value"]    = '{text.dark}';
      ongrayCode200["type"]     = 'color';
      ongrayCode300["value"]    = '{text.dark}';
      ongrayCode300["type"]     = 'color';
      ongrayCode400["value"]    = '{text.dark}';
      ongrayCode400["type"]     = 'color';
      ongrayCode500["value"]    = '{text.white}';
      ongrayCode500["type"]     = 'color';
      ongrayCode600["value"]    = '{text.white}';
      ongrayCode600["type"]     = 'color';
      ongrayCode700["value"]    = '{text.white}';
      ongrayCode700["type"]     = 'color';
      ongrayCode800["value"]    = '{text.white}';
      ongrayCode800["type"]     = 'color';
      ongrayCode900["value"]    = '{text.white}';
      ongrayCode900["type"]     = 'color';
      grayColor['050']         = grayCode0;
      grayColor['100']         = grayCode100;
      grayColor['200']         = grayCode200;
      grayColor['300']         = grayCode300;
      grayColor['400']         = grayCode400;
      grayColor['500']         = grayCode500;
      grayColor['600']         = grayCode600;
      grayColor['700']         = grayCode700;
      grayColor['800']         = grayCode800;
      grayColor['900']         = grayCode900;
      grayOnColor['050']       = grayCode0;
      grayOnColor['100']       = grayCode100;
      grayOnColor['200']       = grayCode200;
      grayOnColor['300']       = grayCode300;
      grayOnColor['400']       = grayCode400;
      grayOnColor['500']       = grayCode500;
      grayOnColor['600']       = grayCode600;
      grayOnColor['700']       = grayCode700;
      grayOnColor['800']       = grayCode800;
      grayOnColor['900']       = grayCode900;

      whiteColor["value"]    = 'rgba(255,255,255,'+dmOpacity+')';
      whiteColor["type"]     = 'color';
      coreWhiteCode["Color"] =  whiteColor;

      blackColor["value"]    = 'rgba(255,255,255,'+dmOpacity+')';
      blackColor["type"]     = 'color';
      coreBlackCode["On-Color"] = blackColor;

      grayCode["Color"]      =   grayColor
      grayCode["On-Color"]   =   grayOnColor

      coreCode["Gray"] =   grayCode
      coreCode["White"] =  coreWhiteCode
      coreCode["Black"] =  coreBlackCode
      return(coreCode)
    }
  }

  function buildJSON_WhiteText() {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var whiteCode = {};
      var whiteColor = {};
      whiteColor["value"] = 'rgba(255,255,255,'+dmOpacity+')';
      whiteColor["type"]  = 'color';
      whiteCode["White"] =  whiteColor
      return(whiteCode)
    }
  }

  function buildJSON_Surface(mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var surfaceCode = {};
      var surface = {};
      var onsurface = {};
      var background = backgroundPrimaryName;
      if (background == 'primary-half-bg'  || background == 'white-bg') {
        surface["value"]    = '{Core-Colors.White.Color}';
        surface["type"]     = 'color';
        onsurface["value"]  = '{Core-Colors.White.On-Color}';
        onsurface["type"]   = 'color';
      } else if (background == 'nearblack-bg') {
        surface["value"]    =  '{Core-Colors.Near-Black.Color}';
        surface["type"]     = 'color';
        onsurface["value"]  = '{text.white}';
        onsurface["type"]   = 'color';
      } else if (background == primaryDarkBG) {
        surface["value"]   =  primaryDarkBG;
        surface["type"]    = 'color';
        onsurface["value"] = '{text.white}';
        onsurface["type"]  = 'color';
      } else {
        surface["value"]   =  '{Core-Colors.Near-Black.Color}';
        surface["type"]    = 'color';
        onsurface["value"] = '{text.white}';
        onsurface["type"]  = 'color';
      }
      surfaceCode["Color"]    =  surface;
      surfaceCode["On-Color"] =  onsurface;
      return(surfaceCode)
    }
  }

  function buildJSON_BorderColors(mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var borderCode = {};
      var defaultBorder = {};
      var bottomLine = {};
      if (mode == 'light') {
        defaultBorder["value"] =  borderDefault;
        bottomLine["value"] = 'linear-gradient(0deg, '+borderDefault+' 1px, #00000000 1px )';
      } else {
        defaultBorder["value"] =  dmborderDefault;
        bottomLine["value"] = 'linear-gradient(0deg, '+dmborderDefault+' 1px, #00000000 1px )';
      }
      defaultBorder["type"]  = 'color';
      bottomLine["type"]  = 'color';

      borderCode["Default"] =  defaultBorder;
      borderCode["Bottom Line"] =  bottomLine;
      return(borderCode)
    }
  }

  function buildJSON_InputBG(mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var inputCode = {};
      var defaultInput = {};
      var disabledInput = {};
      if (mode == "light") {
        defaultInput["value"] =  inputDefault;
        disabledInput["value"] = inputDisabled;
      } else {
        defaultInput["value"] =  dminputDefault;
        disabledInput["value"] = dminputDisabled;
      }

      defaultInput["type"]  = 'color';
      disabledInput["type"]  = 'color';
      inputCode["Default"] =  defaultInput;
      inputCode["Disabled"] =  disabledInput;
      return(inputCode)
    }
  }

  function buildJSON_InputBorders(mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var inputCode = {};
      var defaultInput = {};
      var focusInput = {};
      var hoverInput = {};
      var background   = $(document).find('#' + system + 'Default .'+mode+'mode .default-background').css('backgroundColor')
      var background = rgb2hex(background);
      var inputBorder = $(document).find('input[type="radio"][name="inputBorder"]:checked').val();

      if (inputBorder == 'button')
        if (mode == 'dark') {
          var defaultBorder = $.xcolor.opacity(background, '#ffffff', .18).getHex();
          var focusBorder = '{Buttons.Colored.Color}'
        } else {
          var defaultBorder = $.xcolor.opacity(background, '#000000', .18).getHex();
          var focusBorder = '{Buttons.Colored.Color}'
        }
      } else {
        if (mode == 'dark') {
          var defaultBorder = $.xcolor.opacity(background, '#ffffff', .18).getHex();
          var focusBorder = 'rgb(94, 158, 214)'
        } else {
          var defaultBorder = $.xcolor.opacity(background, '#000000', .18).getHex();
          var focusBorder = 'rgb(94, 158, 214)'
      }

      defaultInput["value"] =  defaultBorder;
      defaultInput["type"]  = 'color';
      focusInput["value"]   = focusBorder;
      focusInput["type"]    = 'color';
      hoverInput["value"]   = '{Input-Outlines.Focus}80'
      hoverInput["type"]    = 'color';
      inputCode["Default"]  =  defaultInput;
      inputCode["Focus"]    =  focusInput;
      inputCode["Hover"]    =  hoverInput;
      return(inputCode)
    }
  }


  function buildJSON_ElevationBGs(mode) {
    if ( $(document).find('#' + system + 'Default').length > 0 ) {
      var eCode = {};
      var elevationsCode = {};
      var elevation1Code = {};
      var elevation2Code  = {};
      var elevation3Code  = {};
      var elevation4Code  = {};
      var elevation5Code  = {};
      var elevation6Code  = {};
      var elevation7Code  = {};
      var elevation8Code  = {};
      var elevation9Code  = {};

      if (mode == 'light') {
        elevation1["value"] =  '{Core-Colors.White.Color}'
        elevation1["type"]  = 'color';
        elevation2["value"] =  '{Core-Colors.White.Color}'
        elevation2["type"]  = 'color';
        elevation3["value"] =  '{Core-Colors.White.Color}'
        elevation3["type"]  = 'color';
        elevation4["value"] =  '{Core-Colors.White.Color}'
        elevation4["type"]  = 'color';
        elevation5["value"] =  '{Core-Colors.White.Color}'
        elevation5["type"]  = 'color';
        elevation6["value"] =  '{Core-Colors.White.Color}'
        elevation6["type"]  = 'color';
        elevation7["value"] =  '{Core-Colors.White.Color}'
        elevation7["type"]  = 'color';
        elevation8["value"] =  '{Core-Colors.White.Color}'
        elevation8["type"]  = 'color';
        elevation9["value"] =  '{Core-Colors.White.Color}'
        elevation9["type"]  = 'color';
      } else {
        elevation1Code ["value"] =  elevation1
        elevation1Code ["type"]  = 'color';
        elevation2Code ["value"] =   elevation2
        elevation2Code ["type"]  = 'color';
        elevation3Code ["value"] =   elevation3
        elevation3Code ["type"]  = 'color';
        elevation4Code ["value"] =   elevation4
        elevation4Code ["type"]  = 'color';
        elevation5Code ["value"] =   elevation5
        elevation5Code ["type"]  = 'color';
        elevation6Code ["value"] =   elevation6
        elevation6Code ["type"]  = 'color';
        elevation7Code ["value"] =   elevation7
        elevation7Code ["type"]  = 'color';
        elevation8Code ["value"] =   elevation8
        elevation8Code ["type"]  = 'color';
        elevation9Code ["value"] =   elevation9
        elevation9Code ["type"]  = 'color';
      }
      elevationsCode['Elevation-1'] = elevation1Code ;
      elevationsCode['Elevation-2'] = elevation2Code ;
      elevationsCode['Elevation-3'] = elevation3Code ;
      elevationsCode['Elevation-4'] = elevation4Code ;
      elevationsCode['Elevation-5'] = elevation5Code ;
      elevationsCode['Elevation-6'] = elevation6Code ;
      elevationsCode['Elevation-7'] = elevation7Code ;
      elevationsCode['Elevation-8'] = elevation8Code ;
      elevationsCode['Elevation-9'] = elevation9Code ;

      return(elevationsCode)
    }
  }


  function buildJSON_Fonts() {
    var name;
    $(this)
      .find(".sm-color")
      .each(function () {
        var font = {}
        name =
        font["value"] = bg;
        font["type"] = "color";

        themeRange[name] = font;
      });

    fontCode["fontFamilies"] = fontRange;
  }



  function jasonify() {
    $('.json').each(function() {
      var jsonStr = $(this).text();
      var jsonObj = JSON.parse(jsonStr);
      var jsonPretty = JSON.stringify(jsonObj, null, '\t');
      $(this).text(jsonPretty);
    });
  }

///// PHASE IV - PREVIEW AND PLAY /////

// preview js //
$('.preview-screen .navbarSecondary .tab').click(function() {
  $(this).parent().find('.tab').removeClass('active');
  $(this).addClass('active');
  name = $(this).attr('name');
  $('.sub-page').removeClass('active');
  $('#' + name).addClass('active')
});

// change color mode of preview //
$('#mode .ghost').click(function() {
    var position = $(this).position().left;
    var width = $(this).outerWidth();
    $(this).parent().find('.ghost').removeClass('active');
    $(this).addClass('active');
    $(this).parent().find('.selector').html('')
    $(this).parent().find('.selector').css('left', position)
    $(this).parent().find('.selector').css('width', width)
    var name = $(this).attr('name');
    if (name == 'dark') {
      $('#selectedTheme').addClass('darkmode')
      $('.preview-screen').addClass('darkmode')
      $('#preview .left-nav').addClass('darkmode')

    } else {
      $('#selectedTheme').removeClass('darkmode');
      $('#preview .left-nav').removeClass('darkmode')
      $('.preview-screen').removeClass('darkmode')
    }
    setTheme();
    setPrimaryNav();
    setSecondaryNav();
    setHero();
    setInherit('hero')
    setInherit('chip')
 });

// change device view in preview //
 $('#preview-screen .ghost').click(function() {
     var position = $(this).position().left;
     var width = $(this).outerWidth();
     $(this).parent().find('.ghost').removeClass('active');
     $(this).addClass('active');
     $(this).parent().find('.selector').html('')
     $(this).parent().find('.selector').css('left', position)
     $(this).parent().find('.selector').css('width', width)
     var id = $(this).parent().attr('id')
     var name = $(this).attr('name');
     $('.' + id).removeClass('active');
     $('#' + name).addClass('active')
  });


// set the Primary Nav in the preview //
function setPrimaryNav() {
  var name = $('input[name="navStyle"]:checked').val();
  var themename = $(document).find('.default-theme.active').attr('id')
  if (themename.indexOf("Default") >= 0) {
    var theme = 'default';
  } else {
    var theme = themename.split('-')[1];
  }
  var id = themename.replace('Default','')

  if (name == 'white') {
    if ($('.preview-screen').hasClass('darkmode')) {
      var dmbackground = $(document).find('#' + id + ' .darkmode .'+ theme +'-background').css('backgroundColor');
      document.querySelector(':root').style.setProperty('--navbarPrimary', dmbackground);
      document.querySelector(':root').style.setProperty('--on-navbarPrimary', 'rgba(255,255,255,'+dmOpacity+')');
    } else {
      document.querySelector(':root').style.setProperty('--navbarPrimary', '#ffffff');
      document.querySelector(':root').style.setProperty('--on-navbarPrimary', '#1d1d1f');
    }

  } else if (name == 'black') {
      if ($('.preview-screen').hasClass('darkmode')) {
        var dmbackground = $(document).find('#' + id + ' .darkmode .'+ theme +'-background').css('backgroundColor');
        document.querySelector(':root').style.setProperty('--navbarPrimary', dmbackground);
        document.querySelector(':root').style.setProperty('--on-navbarPrimary', 'rgba(255,255,255,'+dmOpacity+')');
      } else {
        document.querySelector(':root').style.setProperty('--navbarPrimary', 'rgba(24,24,24)');
        document.querySelector(':root').style.setProperty('--on-navbarPrimary', '#ffffff');
      }
  } else {
      if ($('.preview-screen').hasClass('darkmode')) {
        var background = $(document).find('#' + id + ' .darkmode .'+ theme +'-primary').css('backgroundColor');
        var text       = $(document).find('#' + id+ ' .darkmode .'+ theme +'-primary').css('color');
      } else {
        var background = $(document).find('#' + themename + '-theme .theme-basics .'+ theme +'-primary').css('backgroundColor');
        var text       = $(document).find('#' + themename + '-theme .theme-basics .'+ theme +'-primary').css('color');
      }
      document.querySelector(':root').style.setProperty('--navbarPrimary', background);
      document.querySelector(':root').style.setProperty('--on-navbarPrimary', text);
      $('input[name="secondaryNav"][value="white"]').prop( "checked", true );
      $('input[name="secondaryNav"]').attr("disabled", true);
      if ($('input[name="heroColoring"][value="colored]').is(':checked')) {
        $('input[name="secondaryNav"][value="white"]').prop( "checked", true );
        setSecondaryNav()
        $('input[name="secondaryNav"]').attr("disabled", true);
      } else {
        $('input[name="secondaryNav"]').removeAttr("disabled");
      }
    }
  setInherit('navbarPrimary');
}

$('input[name="navStyle"]').click(function() {
  setPrimaryNav()
});

// set the secondary nav in preview //
function setSecondaryNav() {
  var name = $('input[name="secondaryNav"]:checked').val();
  var themename = $(document).find('.default-theme.active').attr('id')
  if (themename.indexOf("Default") >= 0) {
    var theme = 'default';
  } else {
    var theme = themename.split('-')[1];
  }
  var id = themename.replace('Default','')

  if (name == 'white') {
    if ($('.preview-screen').hasClass('darkmode')) {
      var dmbackground = $(document).find('#' + id + ' .darkmode .'+ themename +'-background').css('backgroundColor');
      document.querySelector(':root').style.setProperty('--navbarSecondary', dmbackground);
      document.querySelector(':root').style.setProperty('--on-navbarSecondary', 'rgba(255,255,255,'+dmOpacity+')');
    } else {
      document.querySelector(':root').style.setProperty('--navbarSecondary', '#ffffff');
      document.querySelector(':root').style.setProperty('--on-navbarSecondary', '#1d1d1f');
    }
  } else if (name == 'black') {
      if ($('.preview-screen').hasClass('darkmode')) {
        var dmbackground = $(document).find('#' + id + ' .darkmode .'+ themename +'-background').css('backgroundColor');
        document.querySelector(':root').style.setProperty('--navbarSecondary', dmbackground);
        document.querySelector(':root').style.setProperty('--on-navbarSecondary', 'rgba(255,255,255,'+dmOpacity+')');
      } else {
        document.querySelector(':root').style.setProperty('--navbarSecondary', 'rgba(24,24,24)');
        document.querySelector(':root').style.setProperty('--on-navbarSecondary', '#FFFFFF');
      }
    } else {
    if ($('.preview-screen').hasClass('darkmode')) {
      var background = $(document).find('#' + id + ' .darkmode .'+ themename +'-primary').css('backgroundColor');
      var text       = $(document).find('#' + id + ' .darkmode .'+ themename +'-primary').css('color');
    } else {
      var background = $(document).find('#' + themename + '-theme .theme-basics .'+ theme +'-primary').css('backgroundColor');
      var text       = $(document).find('#' + themename + '-theme .theme-basics .'+ theme +'-primary').css('color');
    }
    document.querySelector(':root').style.setProperty('--navbarSecondary', background);
    document.querySelector(':root').style.setProperty('--on-navbarSecondary', text);

  }
  setInherit('navbarSecondary');
}

$('input[name="secondaryNav"]').click(function() {
  setSecondaryNav()
});

// set the hero area in preview //
function setHero() {
  var name = $('input[name="heroColoring"]:checked').val();
  var themename = $(document).find('.default-theme.active').attr('id')
  if (themename.indexOf("Default") >= 0) {
    var theme = 'default';
  } else {
    var theme = themename.split('-')[1];
  }
  var id = themename.replace('-theme','')
  if (name == 'white') {
    if ($('.preview-screen').hasClass('darkmode')) {
      var dmbackground = $(document).find('#' + id + ' .darkmode .'+ theme +'-background').css('backgroundColor');
      document.querySelector(':root').style.setProperty('--hero', dmbackground);
      document.querySelector(':root').style.setProperty('--on-hero', 'rgba(255,255,255,'+dmOpacity+')');
      $('backgroundMesh').removeClass('white').addClass('dark');
    } else {
      document.querySelector(':root').style.setProperty('--hero', '#ffffff');
      document.querySelector(':root').style.setProperty('--on-hero', '#1d1d1f');
      $('backgroundMesh').removeClass('white').addClass('white');
    }
  } else if (name == 'black') {
    if ($('.preview-screen').hasClass('darkmode')) {
      var dmbackground = $(document).find('#' + id + ' .darkmode .'+ theme +'-background').css('backgroundColor');
      document.querySelector(':root').style.setProperty('--hero', dmbackground);
      document.querySelector(':root').style.setProperty('--on-hero', 'rgba(255,255,255,'+dmOpacity+')');
      $('backgroundMesh').removeClass('white').addClass('dark');
    } else {
      document.querySelector(':root').style.setProperty('--hero', 'rgba(24,24,24)');
      document.querySelector(':root').style.setProperty('--on-hero', '#ffffff');
      $('backgroundMesh').removeClass('white').addClass('white');
    }
  }
   else if (name == 'colored') {
    $('.hero-line').removeClass('active')
    if ($('.preview-screen').hasClass('darkmode')) {
      var background = $(document).find('#' + id + ' .darkmode .'+ theme +'-primary').css('backgroundColor');
      var text       = $(document).find('#' + id + ' .darkmode .'+ theme +'-primary').css('color');
    } else {
      var background = $(document).find('#' + id + '-theme .theme-basics .'+ theme +'-primary').css('backgroundColor');
      var text       = $(document).find('#' + id + '-theme .theme-basics .'+ theme +'-primary').css('color');
    }
    document.querySelector(':root').style.setProperty('--hero', background);
    document.querySelector(':root').style.setProperty('--on-hero', text);
    if ($('input[name="navStyle"][value="colored"]').is(':checked')) {
      $('input[name="secondaryNav"][value="white"]').prop( "checked", true );
      setSecondaryNav()
      $('input[name="secondaryNav"]').attr("disabled", true);
    } else {
      $('input[name="secondaryNav"]').removeAttr("disabled");
    }

  } else {
    $('.hero-line').removeClass('active')
    if ($('.preview-screen').hasClass('darkmode')) {
      var background = $(document).find('#' + themename + ' .darkmode .'+ theme +'-gradient-1').css('background');
      var text       = $(document).find('#' + themename + ' .darkmode .'+ theme +'-gradient-1').css('color');
    } else {
      var background = $(document).find('#' + themename + ' .lightmode .'+ theme +'-gradient-1').css('background');
      var text       = $(document).find('#' + themename + ' .lightmode .'+ theme +'-gradient-1').css('color');
    }

    document.querySelector(':root').style.setProperty('--hero', background);
    document.querySelector(':root').style.setProperty('--on-hero', text);
    if ($('input[name="navStyle"][value="colored"]').is(':checked')) {
      $('input[name="secondaryNav"][value="white"]').prop( "checked", true );
        setSecondaryNav()
      $('input[name="secondaryNav"]').attr("disabled", true);
    } else {
      $('input[name="secondaryNav"]').removeAttr("disabled");
    }
  }

  $('input[name="heroElements"][value="button"]').prop( "checked", false );
  $('input[name="heroElements"][value="button"]').attr("disabled", true);
  setInherit('hero');
}

$('input[name="heroColoring"]').click(function() {
  setHero()
});

// set the hero alignement - left or center //
function heroAlignment() {
  var name = $('input[name="heroAlignment"]:checked').val();
  if (name == 'left') {
    $('.hero-body').removeClass('text-center');
    $('.hero-body').parents('.row').removeClass('justify-content-center');
    $('.hero-icon').css('margin', 0)
    $('.hero-line').css('margin', 0)
    $('.button-area').css('justify-content', 'flex-start');
    document.querySelector(':root').style.setProperty('--hero-title-flex-direction', 'row');
    document.querySelector(':root').style.setProperty('--hero-justify-content', 'flex-start');
    document.querySelector(':root').style.setProperty('--hero-title-gap', '16px');
  } else {
    $('.hero-body').addClass('text-center');
    $('.hero-body').parents('.row').addClass('justify-content-center');
    document.querySelector(':root').style.setProperty('--hero-title-flex-direction', 'column');
    document.querySelector(':root').style.setProperty('--hero-justify-content', 'justify-content-center');
    document.querySelector(':root').style.setProperty('--hero-title-gap', 0);
    $('.hero-icon').css('margin', 'auto')
    $('.hero-line').css('margin', 'auto');
    $('.button-area').css('justify-content', 'center');
  }
}

$('input[name="heroAlignment"]').click(function() {
  heroAlignment()
});

// set the hero style //
function heroStyle() {
  var name = $('input[name="heroStyle"]:checked').val();
  if (name == 'default') {
    $('.backgroundImage').removeClass('active');
    $('.backgroundOverlay').removeClass('active');
    $('.backgroundMesh').removeClass('active');
    $('.hero-video').removeClass('active');
    $('.hero-image').removeClass('active');
    $('input[name="heroAlignment"]').removeAttr("disabled");
  } else if (name == 'backgroundImage') {
    $('.backgroundImage').addClass('active');
    $('.backgroundOverlay').addClass('active');
    $('.backgroundMesh').addClass('active');
    $('.hero-video').removeClass('active');
    $('.hero-image').removeClass('active');
    $('input[name="heroAlignment"]').removeAttr("disabled");
  } else if (name == 'video') {
    $('.backgroundImage').removeClass('active');
    $('.backgroundOverlay').removeClass('active');
    $('.backgroundMesh').removeClass('active');
    $('.hero-video').addClass('active');
    $('.hero-image').removeClass('active');
    $('input[name="heroAlignment"][value="left"]').prop( "checked", true );
    $('input[name="heroAlignment"]').attr("disabled", true);
  } else {
    $('.backgroundImage').removeClass('active');
    $('.backgroundOverlay').removeClass('active');
    $('.backgroundMesh').removeClass('active');
    $('.hero-image').addClass('active');
    $('.hero-video').removeClass('active');
    $('input[name="heroAlignment"][value="left"]').prop( "checked", true );
    $('input[name="heroAlignment"]').attr("disabled", true);
  }
}

$('input[name="heroStyle"]').click(function() {
  heroStyle()
});
// set the hero elements based on user input //
function heroElements() {
  $('input[name="heroElements"]').each(function() {
    var name = $(this).val()
    if ($(this).prop('checked') == true) {
      $('.hero-' + name).addClass('active');
    } else {
      $('.hero-' + name).removeClass('active');
    }

    if ($('input[name="heroElements"][value="event"]').is(':checked')) {
      $('input[name="heroAlignment"][value="left"]').prop( "checked", true );
      $('input[name="heroAlignment"]').attr("disabled", true);
      $('input[name="heroElements"][value="button"]').prop( "checked", false );
      $('input[name="heroElements"][value="button"]').attr("disabled", true);
      $('input[name="heroElements"][value="button-secondary"]').prop( "checked", false );
      $('input[name="heroElements"][value="button-secondary"]').attr("disabled", true);
      $('.hero-button').removeClass('active')
      $('.hero-button-secondary').removeClass('active')

    } else {
      $('input[name="heroAlignment"]').removeAttr("disabled");
      $('input[name="heroElements"][value="button"]').removeAttr("disabled");
      $('input[name="heroElements"][value="button-secondary"]').removeAttr("disabled");
    }

    if ($('input[name="heroElements"][value="icon"]').is(':checked')) {
        $('.hero-line').removeClass('active')
    } else {
      if ($('input[name="heroColoring"][value="white"]:checked')) {
        $('.hero-line').addClass('active')
      } else {
        $('.hero-line').removeClass('active')
      }
    }

  });
}

$('input[name="heroElements"]').click(function() {
  heroElements()
});


function setMobile(component) {
  var name = $('input[name="'+component+'"]:checked').val();
  var themename = $(document).find('.default-theme.active').attr('id')
  if (themename.indexOf("Default") >= 0) {
    var theme = 'default';
  } else {
    var theme = themename.split('-')[1];
  }
  var id = themename.replace('-theme','')
  if (name == 'white') {
    if ($('.preview-screen').hasClass('darkmode')) {
      var dmbackground = $(document).find('#' + id + ' .darkmode .'+ theme +'-background').css('backgroundColor');
      document.querySelector(':root').style.setProperty('--dm-'+component, dmbackground);
      document.querySelector(':root').style.setProperty('--dm-on-'+component, 'rgba(255,255,255,'+dmOpacity+')');
    } else {
      document.querySelector(':root').style.setProperty('--'+component, '#ffffff');
      document.querySelector(':root').style.setProperty('--on-'+component, '#1d1d1f');
    }
  } else if (name == 'black') {
    if ($('.preview-screen').hasClass('darkmode')) {
      var dmbackground = $(document).find('#' + id + ' .darkmode .'+ theme +'-background').css('backgroundColor');
      document.querySelector(':root').style.setProperty('--dm-'+component, dmbackground);
      document.querySelector(':root').style.setProperty('--dm-on-'+component, 'rgba(255,255,255,'+dmOpacity+')');
    } else {
      document.querySelector(':root').style.setProperty('--'+component, 'rgba(24,24,24)');
      document.querySelector(':root').style.setProperty('--on-'+component, '#ffffff');
    }
  }  else {

    if ($('.preview-screen').hasClass('darkmode')) {
      var background = $(document).find('#' + id + ' .darkmode .'+ theme +'-primary').css('backgroundColor');
      var text       = $(document).find('#' + id + ' .darkmode .'+ theme +'-primary').css('color');
      document.querySelector(':root').style.setProperty('--dm-'+component, background);
      document.querySelector(':root').style.setProperty('--dm-on-'+component, text);
    } else {
      var background = $(document).find('#' + id + '-theme .theme-basics .'+ theme +'-primary').css('backgroundColor');
      var text       = $(document).find('#' + id + '-theme .theme-basics .'+ theme +'-primary').css('color');
      document.querySelector(':root').style.setProperty('--'+component, background);
      document.querySelector(':root').style.setProperty('--on-'+component, text);
    }

  }
  setInherit(component);
}

$('input[name="mobile-topNav"]').click(function() {
  setMobile('mobile-topNav')
});

$('input[name="mobile-tabs"]').click(function() {
  setMobile('mobile-tabs')
});

$('input[name="mobile-bottomNav"]').click(function() {
  setMobile('mobile-bottomNav')
});


$('input[name="showTopNav"]').click(function() {
  if ($('input[name="showTopNav"]').is(':checked')) {
    $('.mobile-body').addClass('withNav');
    $('.mobile-topNav').addClass('active');
    if ($('input[name="showTopTabs"]').is(':checked')) {
      $('.mobile-tabs').addClass('active');
    } else {
      $('.mobile-tabs').removeClass('active');
    }
    var topBG = $('.mobile-topNav').css('backgroundColor');
    document.querySelector(':root').style.setProperty('--mobile-bar', topBG);
    $('input[name="showTopTabs"]').prop('disabled', false);
    $('input[name="mobile-tabs"]').prop('disabled', false);
    $('input[name="mobile-topNav"]').prop('disabled', false);

  }  else {
    $('.mobile-body').removeClass('withNav')
    $('.mobile-topNav').removeClass('active');
    $('.mobile-tabs').removeClass('active');
    $('.mobile-bar').attr('background','transparent');
    document.querySelector(':root').style.setProperty('--mobile-bar', 'transparent');
    $('input[name="showTopTabs"]').prop('disabled', true);
    $('input[name="mobile-tabs"]').prop('disabled', true);
    $('input[name="mobile-topNav"]').prop('disabled', true);
  }
});

$('input[name="showTopTabs"]').click(function() {
  if ($('input[name="showTopTabs"]').is(':checked')) {
    $('.mobile-tabs').addClass('active');
    $('.mobile-body').addClass('withTabs')
    $('input[name="mobile-tabs"]').prop('disabled', false);
  } else {
    $('.mobile-tabs').removeClass('active');
    $('.mobile-body').removeClass('withTabs')
    $('input[name="mobile-tabs"]').prop('disabled', true);
  }
});

$('input[name="showBottompNav"]').click(function() {
  if ($('input[name="showBottompNav"]').is(':checked')) {
    $('.mobile-bottomNav').addClass('active');
    $('input[name="mobile-bottomNav"]').prop('disabled', false);
  } else {
    $('.mobile-bottomNav').removeClass('active');
    $('input[name="mobile-bottomNav"]').prop('disabled', true);
  }
});




  function updateInherit(element,text) {
      if (text == 'none') {
        $('#' + element).find('.inherit').removeClass('dark').removeClass('white');
        $('#' + element + '.inherit').removeClass('dark').removeClass('white');
      } else if (text == 'color') {
        $('#' + element).find('.inherit').removeClass('dark').removeClass('white').addClass('colored');
        $('#' + element + '.inherit').removeClass('dark').removeClass('white').addClass('colored');
      } else if (text == 'rgb(255,255,255)' || text == 'rgb(255,255,255,'+dmOpacity+')') {
        $('#' + element).find('.inherit').removeClass('dark').removeClass('colored').addClass('white');
        $('#' + element + '.inherit').removeClass('dark').removeClass('colored').addClass('white');
      } else {
        $('#' + element).find('.inherit').removeClass('white').removeClass('colored').addClass('dark');
        $('#' + element + '.inherit').removeClass('white').removeClass('colored').addClass('dark');
      }

  }


function setInherit(element) {
    var bg = $('.' + element).css('backgroundColor').replace(/\s/g, '');
    if (element == 'gradient-1' || element == 'gradient-2') {
        var text = $('.preview-screen').find('.' + element).css('color');
        if (text != "undefined") {
            var text = $('.preview-screen').find('.' + element).css('color').replace(/\s/g, '');
        }
    } else if  (element == 'backgroundMesh') {
      var text = $('.primary').css('color').replace(/\s/g, '');
    } else {
      var text = $('.' + element).css('color').replace(/\s/g, '');
    }
    if (text == 'rgb(255,255,255)' || text == 'rgba(255,255,255,'+dmOpacity+')') {
      $('.' + element).find('.inherit').removeClass('dark').removeClass('colored').addClass('white');
      $('.' + element + '.inherit').removeClass('dark').removeClass('colored').addClass('white');
    } else {
      $('.' + element).find('.inherit').removeClass('white').removeClass('colored').addClass('dark');
      $('.' + element + '.inherit').removeClass('white').removeClass('colored').addClass('dark');
    }
    if (bg == 'rgb(255,255,255)' || bg == 'rgb(250,250,250)' || bg == 'rgb(35,35,61)' && element != 'navbarPrimary') {
      $('.' + element).find('.icon.inherit').removeClass('white').removeClass('dark').addClass('colored');
    }
    var topBG = $('.mobile-topNav').css('backgroundColor');
    document.querySelector(':root').style.setProperty('--mobile-bar', topBG);
}

// GENERAL APP  NAVIGATION //

  // Click on the DTA Icon //
  $('.navbar-brand').click(function() {
    $('.fullpage').removeClass('active');
    $('#welcome-interface').addClass('active');
    $('#welcome-interface .main').addClass('active');
    //$('#welcome-interface .main .').addClass('active');
  });

// Navigagtion //
  $('.colorClass').click(function() {
    $('.colorClass').removeClass('active')
    var page = $(this).attr('name');
    $('.color-page').removeClass('active');
    $('#' + page + '-color').addClass('active')
    $(this).addClass('active')
  });

  /// top navigaiton ///
  $('#topNav .nav-item').click(function() {
    if ($(this).hasClass('active') || $(this).hasClass('disabled')) {
    } else {
      $('#topNav .nav-item').removeClass('active')
      $(this).addClass('active');

      var name = $(this).attr('name');
      $('.main').removeClass('active')
      $('#' + name).addClass('active')
      if (name == 'code') {
        buildCode();
      } else if (name == "assign") {
        if (!$(this).attr('name') == 'shownIntro') {
          $('#assignIntro').modal('show');
          $('#assignIntro').attr('name','shownIntro')
        } else {
          if (!$('#assign .content.active').length) {
            $('#AssignAvatars').addClass('active')
          }
        }
      } else if (name == "organisms") {
        if (!$(this).attr('name') == 'shownIntro') {
          $('#assignOrganisms').modal('show');
          $('#assignOrganisms').attr('name','shownIntro')
        } else {
          if (!$('#organisms .content.active').length) {
            $('#AssignHero').addClass('active')
          }
        }
      }
    }
  });

  $(document).on('click', '#themeNav .nav-item .nav-link', function() {
    $('#themeNav .nav-item').removeClass('active')
    $(this).parent().addClass('active');
    var name = $(this).attr('name');
    $(document).find('.theme-code').removeClass('active')
    $(document).find('#css-' + name).addClass('active')
    $(document).find('#json-' + name).addClass('active')
  });

  //  side navigation
  $(document).on('click', '.section-title:not(disabled)', function() {
    if ($(this).parent().hasClass('active')) {
      $(this).parent().removeClass('active')
    } else {
      $(this).parent().addClass('active');

      var name = $(this).parent().find('.sub-section').attr('name');

      $('.main.active .content').removeClass('active')
      $('.sub-section').removeClass('active')
      $(document).find('#' + name).addClass('active')
      if (name == 'buildThemes' && $(this).hasClass('default')) {
        clearTheme();
        var system = $(document).find('.system.active').attr('id');
        if ($(document).find('#' + system + 'Default').length > 0) {
          $('.main.active .content').removeClass('active')
          $(document).find('#' + system + 'Default').addClass('active');
        } else {
          $('#buildThemes h5').html('Create Default Theme');
          $('#buildThemes').find('.theme-name').hide();
       }
      } else {
        $('#buildThemes h5').html('Create Additional Themes');
        $('#buildThemes').find('.theme-name').show();
      }
    }
  });


  $(document).on('click', '.sub-section', function() {
     if ($(this).hasClass('active')) {

     } else {
       $('.sub-section').removeClass('active')
       $(this).addClass('active');

       var name = $(this).attr('name');
       $('.main.active .content').removeClass('active')
       $('#' + name).addClass('active')

       if (name == 'buildThemes' && $(this).hasClass('default')) {
         var system = $(document).find('.system.active').attr('id');
         if ($(document).find('#' + system + 'Default').length > 0) {
           $('.main.active .content').removeClass('active')
           $(document).find('#' + system + 'Default').addClass('active');
         } else {
           $('#buildThemes h5').html('Create Default Theme');
           $('#buildThemes').find('.theme-name').hide();
        }
       } else {
         $('#buildThemes h5').html('Create Additional Themes');
        $('#buildThemes').find('.theme-name').show();
       }

     }
     $('#buildThemes').scrollTop(0);

    });

    // show or hide color details ///
    $('.details').click(function() {
      if ($(this).hasClass('active')) {
          $(this).removeClass('active')
          $('.swatch-details').removeClass('active')
          $(this).find('.toggle-label').html('Off');
          $('.sm-color').css('width', '48px');
          $('.color-group .color').css('width', '48px');
      } else {

        $(this).addClass('active');
        $('.swatch-details').addClass('active')
        $(this).find('.toggle-label').html('On')
        $('.sm-color').css('width', '96px');
        $('.color-group .color').css('width', '96px');
      }
     });

   // render molecule - organism color varients ///
   $('.displayColor').click(function() {
      $(this).parent().find('.displayColor').removeClass('active')
      $(this).addClass('active')
      var className = $(this).attr('name').split(',')[0];
      var id  = $(this).attr('name').split(',')[1];
      $('.' + className).removeClass('active')
      $('#' + id).addClass('active')
   });

   // swicth //
   $('.switch').click(function() {
     if ($(this).hasClass('active')) {
       $(this).removeClass('active');
     } else {
       $(this).addClass('active');
     }
   });


   // Click on the DTA Icon //
   $('.accordian').click(function() {
     if ($(this).hasClass('active')) {
       $(this).removeClass('active');
     } else {
       $(this).addClass('active');
     }
   });

   // render molecule - organism color varients ///
   $('.colorView').click(function() {
       // get the value//
       var value = $(this).val()
       // get the name of the div id you want to target and change //
       var className = $(this).attr('name');
       // get the background color of the class ///
      // var background  =  $('#' + className).css('backgroundColor').replace(/\s/g, '');
       // get the on color of the class //
    //   var text = $('.' + value).css('color').replace(/\s/g, '');
       // find all the divs tagged with color-view and update their backgtound color //
       // run update Inherit to find all subclasses that need to update their backgrounds to reflect the requied on color//
       $('#' + className).find('.color-view').removeClass('transparent none primary primary-bg black black-bg dark white white-bg colored').addClass(value);
       /// add que so color updates then updateInherit is run ////
   });

   //  render clickable or non clickable variants //
   $('.linkView').click(function() {
       // get the value//
       var value = $(this).val()
       // get the name of the div id you want to target and change //
       var name = $(this).attr('name');
       $('.' + name).addClass('hidden');
       $('#' + name + '-' + value).removeClass('hidden')

   });

   // select design system //
   $(document).on('click', '#current-system .dropdown-item:not(#create-new)', function() {
     var name = $(this).attr('name');
     var current = $('#current-system button').text();
     $('#current-system button').text(name);

     if (name == current) {

     } else {
       var name = $(this).attr('name');
       openSystem(name);
     }
   });


   function setThemeShades(theme, name) {
     var i = 0
     while (i < 1000) {
       var themeColor              = $(document).find('#' + name + '-light-' + i + ' .Hex').css('backgroundColor');
       var onthemeColor            = $(document).find('#' + name + '-light-' + i + ' .Hex').css('color');
       var dmthemeColor            = $(document).find('#' + name + '-dark-' + i + ' .Hex').css('backgroundColor');
       var dmonthemeColor          = $(document).find('#' + name + '-dark-' + i + ' .Hex').css('color');
       window[theme + i]         = themeColor
       window['on' + theme + i]  = onthemeColor
       window['dm' + theme + i]  = dmthemeColor
       window['dmon' + theme+ i] = dmonthemeColor
       document.querySelector(':root').style.setProperty('--' + theme + '-' + i ,themeColor);
       document.querySelector(':root').style.setProperty('--on-' + theme + '-' + i ,onthemeColor);
       document.querySelector(':root').style.setProperty('--dm-' + theme + '-' + i , dmthemeColor);
       document.querySelector(':root').style.setProperty('--dm-on-' + theme , dmonthemeColor);
       i = i + 100
     }
   }



   function themePrimary(name, hex, onColor){
     primaryName        =  name
     var primary0Name   =  name.split('-')[0];
     setThemeShades('primary', primary0Name )
     showThemeOptions(name)
     var bgScale = chroma.scale(['#FFFFFF',rgb2hex(window.primary0)]).correctLightness(true).colors(5);
     primaryHalf    = bgScale[1]
     primaryQuarter = bgScale[2]
     primary            = hex;
     onPrimary          = onColor
     document.querySelector(':root').style.setProperty('--primary' , primary);
     document.querySelector(':root').style.setProperty('--on-primary' , onPrimary);
     document.querySelector(':root').style.setProperty('--primary-half' , primaryHalf);
     document.querySelector(':root').style.setProperty('--primary-quarter' , primaryQuarter);
     var bgScale = chroma.scale([rgb2hex(window.primary900),'#000000']).correctLightness(true).colors(5);
     primaryDarkBG          = bgScale[2]
     secondaryDarkBG        = bgScale[3]
     dmbackgroundTertiary   = window.primary700
     document.querySelector(':root').style.setProperty('--primaryDarkBG' , primaryDarkBG);
     document.querySelector(':root').style.setProperty('--secondaryDarkBG' , secondaryDarkBG);
     var i = 0
     updateNames(primary0Name, 'primary')
     buttonHexColors();
   }


   function showThemeOptions(name){
     var theme0Name   =  name.split('-')[0];
     // make the secondary colors available as a gradient color //
     $('#gradient1-a-' +theme0Name ).removeClass('hidden')
     $('#gradient1-b-' +theme0Name).removeClass('hidden')
     $('#gradient2-a-' +theme0Name).removeClass('hidden')
     $('#gradient2-b-' +theme0Name).removeClass('hidden')
     $('#themeGradientText-a-' +theme0Name).removeClass('hidden')
     $('#themeGradientText-b-' +theme0Name).removeClass('hidden')
     // make the secondary  colors available as a button colors //
     $('#themeButtons-' +theme0Name).removeClass('hidden')
     // make the secondary  colors available as a button colors //
     $('#themeIcons-' +theme0Name).removeClass('hidden')
     // make the secondary  colors available as an accent color //
     $('#themeAccent-' +theme0Name).removeClass('hidden')
   }


   function themeBackground(name, hex, onColor) {
     $('#themeBackground').find('button .Hex').attr('class','Hex')
     if (hex.replace(/\s/g, '') == 'rgb(255,255,255)') {
       $('#themeBackground').find('button .Hex').eq(0).removeClass('primary-half-bg');
       $('#themeBackground').find('button .Hex').eq(0).css('background', '#ffffff')
       $('#themeBackground').find('button .Hex').eq(1).addClass('gray-050-bg');
       $('.for-black-bg').removeClass('active');
       $('.for-color-bg').removeClass('active');
       $('.for-white-bg').addClass('active');
       backgroundSecondary = primaryQuarter
       onbackgroundPrimary = black
       onbackgroundSecondary = black
       document.querySelector(':root').style.setProperty('--background' , 'var(--white)'  );
       document.querySelector(':root').style.setProperty('--on-background' , 'var(--black)' );
       document.querySelector(':root').style.setProperty('--background-secondary' , 'var(--gray-0)' );
       document.querySelector(':root').style.setProperty('--on-background-secondary' , 'var(--black)' );
     } else if (hex.replace(/\s/g, '') == 'rgb(35,35,63)') {
       $('#themeBackground').find('button .Hex').eq(0).removeClass('primary-half-bg');
       $('#themeBackground').find('button .Hex').eq(0).css('background', 'rgb(34,34,34)')
       $('#themeBackground').find('button .Hex').eq(1).addClass('gray-900-bg');
       $('.for-white-bg').removeClass('active');
       $('.for-color-bg').removeClass('active');
       $('.for-black-bg').addClass('active');
       backgroundPrimary     = nearblack
       backgroundSecondary   = black
       onbackgroundPrimary   = white
       onbackgroundSecondary = white
       document.querySelector(':root').style.setProperty('--background' , 'var(--nearblack)' );
       document.querySelector(':root').style.setProperty('--on-background' , 'rgba(255,255,255,.85)' );
       document.querySelector(':root').style.setProperty('--background-secondary' , 'var(--black)' );
       document.querySelector(':root').style.setProperty('--on-background-secondary' , 'rgba(255,255,255,.85)' );
     } else {
       if (name.split('-')[1] == 'half') {
         $('#themeBackground button .Hex').eq(0).addClass('primary-half-bg');
         $('#themeBackground button .Hex').eq(1).addClass('primary-quarter-bg');
         backgroundPrimary = primaryHalf
         backgroundSecondary = primaryQuarter
         onbackgroundPrimary = black
         onbackgroundSecondary = black
         document.querySelector(':root').style.setProperty('--background' , 'var(--primary-half)' );
         document.querySelector(':root').style.setProperty('--on-background' , 'var(--black)' );
         document.querySelector(':root').style.setProperty('--background-secondary' , 'var(--primary-quarter)' );
         document.querySelector(':root').style.setProperty('--on-background-secondary' , 'var(--black)' ) ;

       } else {
         $('#themeBackground').find('button .Hex').eq(0).addClass('primaryDarkBG');
         $('#themeBackground').find('button .Hex').eq(1).addClass('secondaryDarkBG');
         backgroundPrimary = primaryDarkBG
         backgroundSecondary = secondaryDarkBG
         onbackgroundPrimary = white
         onbackgroundSecondary = white
         document.querySelector(':root').style.setProperty('--background' , 'var(--primaryDarkBG)' );
         document.querySelector(':root').style.setProperty('--on-background' , 'rgba(255,255,255,.85)' );
         document.querySelector(':root').style.setProperty('--background-secondary' , 'var(--secondaryDarkBG)' );
         document.querySelector(':root').style.setProperty('--on-background-secondary' , 'rgba(255,255,255,.85)' );
       }
       $('.for-black-bg').removeClass('active');
       $('.for-white-bg').removeClass('active');
       $('.for-color-bg').addClass('active');

     }

     buttonHexColors()
     loadHotlinks();
   }

   function themeDarkmodeBG(name, hex, onColor) {
     dmbackgroundPrimaryName = name;
     if (name == 'nearblack-bg' || name == 'nearblack') {
       dmbackgroundPrimary  = nearblack
       $('#themeDarkmodeBG').find('button .Hex').eq(1).removeClass('primaryDarkBG').addClass('nearblack-bg').attr('name', 'nearblack-bg')
       $('#themeDarkmodeBG').find('button .Hex').eq(1).removeClass('secondaryDarkBG').addClass('black-bg').attr('name', 'black-bg')
       var color   = 'rgba(255,255,255,'+dmOpacity+')';
       dmbackgroundSecondary      = black
       dmbackgroundPrimary        = nearblack
       dmbackgroundPrimaryName    = 'nearblack'
       dmbackgroundSecondaryName  = 'black'
       document.querySelector(':root').style.setProperty('--dm-background' , 'var(--nearblack)');
       document.querySelector(':root').style.setProperty('--dm-background-secondary' , 'var(--black)');
     } else {
       $('#themeDarkmodeBG').find('button .Hex').eq(1).removeClass('nearblack-bg').addClass('primaryDarkBG').attr('name', 'primaryDarkBG')
       $('#themeDarkmodeBG').find('button .Hex').eq(1).removeClass('black-bg').addClass('secondaryDarkBG').attr('name', 'secondaryDarkBG')
       dmbackgroundPrimary  = primaryDarkBG
       var color   = 'rgba(255,255,255,'+dmOpacity+')';
       dmbackgroundSecondary     = secondaryDarkBG
       dmbackgroundPrimaryName   = 'primaryDarkBG'
       dmbackgroundSecondaryName = 'secondaryDarkBG'
       document.querySelector(':root').style.setProperty('--dm-background' , 'var(--primaryDarkBG)' );
       document.querySelector(':root').style.setProperty('--dm-background-secondary' , 'var(--secondaryDarkBG)' ) ;
     }
     dmonbackgroundPrimary    = 'rgba(255,255,255,'+dmOpacity+')';
     dmonbackgroundSecondary  = 'rgba(255,255,255,'+dmOpacity+')';
     dmbackgroundTertiary     = $(document).find('#' + primaryName.split('-')[0] + '-dark-' + 700 + ' .Hex').css('backgroundColor');
     dmonbackgroundTertiary   = $(document).find('#' + primaryName.split('-')[0] + '-dark-' + 700 + ' .Hex').css('color');
     dmbackgroundTertiaryName = 'dmprimary700'
     $('#' + system).find(system + '-dm-background').html(name);
     document.querySelector(':root').style.setProperty('--dm-on-background-secondary' , color);
     //color = rgb2hex(color);
     if (dmbackgroundPrimary.indexOf('rgb') > 0 ) {
        var bgcolor = rgb2hex(dmbackgroundPrimary)
     } else {
        var bgcolor = dmbackgroundPrimary
     }
     elevation0 = bgcolor;
     elevation1 = elevationShades(bgcolor,.05)
     elevation2 = elevationShades(bgcolor,.07)
     elevation3 = elevationShades(bgcolor,.08)
     elevation4 = elevationShades(bgcolor,.09)
     elevation5 = elevationShades(bgcolor,.11)
     elevation6 = elevationShades(bgcolor,.12)
     elevation7 = elevationShades(bgcolor,.14)
     elevation8 = elevationShades(bgcolor,.15)
     elevation9 = elevationShades(bgcolor,.16)
     $(document).find('#' +  system + ' .default-elevation-bg-1 .Hex').css('background', elevation1)
     $(document).find('#' +  system + ' .default-elevation-bg-2 .Hex').css('background', elevation2)
     $(document).find('#' +  system + ' .default-elevation-bg-3 .Hex').css('background', elevation3)
     $(document).find('#' +  system + ' .default-elevation-bg-4 .Hex').css('background', elevation4)
     $(document).find('#' +  system + ' .default-elevation-bg-5 .Hex').css('background', elevation5)
     $(document).find('#' +  system + ' .default-elevation-bg-6 .Hex').css('background', elevation6)
     $(document).find('#' +  system + ' .default-elevation-bg-7 .Hex').css('background', elevation7)
     $(document).find('#' +  system + ' .default-elevation-bg-8 .Hex').css('background', elevation8)
     $(document).find('#' +  system + ' .default-elevation-bg-9 .Hex').css('background', elevation9)
     document.querySelector(':root').style.setProperty('--elevation-bg-0' , elevation0);
     document.querySelector(':root').style.setProperty('--elevation-bg-1' , elevation1);
     document.querySelector(':root').style.setProperty('--elevation-bg-2' , elevation2);
     document.querySelector(':root').style.setProperty('--elevation-bg-3' , elevation3);
     document.querySelector(':root').style.setProperty('--elevation-bg-4' , elevation4);
     document.querySelector(':root').style.setProperty('--elevation-bg-5' , elevation5);
     document.querySelector(':root').style.setProperty('--elevation-bg-6' , elevation6);
     document.querySelector(':root').style.setProperty('--elevation-bg-7' , elevation7);
     document.querySelector(':root').style.setProperty('--elevation-bg-8' , elevation8);
     document.querySelector(':root').style.setProperty('--elevation-bg-9' , elevation9);

   }

    function elevationShades(color, opacity) {
      if (color.indexOf('rgb') > 0) {
          rgb2hex(color)
      }
      var r = '0x' + color.slice(1, 3);
      var g = '0x' + color.slice(3, 5);
      var b = '0x' + color.slice(5, 7);
      // mix with white background:
      var a = 1 - opacity;
      var r = Math.floor(r * a + 0xff * (1 - a));
      var g = Math.floor(g * a + 0xff * (1 - a));
      var b = Math.floor(b * a + 0xff * (1 - a));
      var elevationColor = "#" + (r<<16 | g<<8 | b).toString(16);
      return elevationColor
    }

    function dmShades(color, color2, opacity) {
      if (color.indexOf('rgb') > 0) {
          rgb2hex(color)
      }
      var r = '0x' + color.slice(1, 3);
      var g = '0x' + color.slice(3, 5);
      var b = '0x' + color.slice(5, 7);

      var r2 = '0x' + color2.slice(1, 3);
      var g2 = '0x' + color2.slice(3, 5);
      var b2 = '0x' + color2.slice(5, 7);
      // mix with white background:
      var a = 1 - opacity;
      var r = Math.floor(r * a + r2 * (1 - a));
      var g = Math.floor(g * a + g2 * (1 - a));
      var b = Math.floor(b * a + b2 * (1 - a));
      var elevationColor = "#" + (r<<16 | g<<8 | b).toString(16);
      return elevationColor
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


   function themeGradient1a(name, hex, onColor) {
     gradient1aName          = name;
     gradient1a              = hex;
     ongradient1a            = onColor;
     document.querySelector(':root').style.setProperty('--gradient1-a' , 'var(--'+name+')' );
     document.querySelector(':root').style.setProperty('--on-gradient1-a' , 'var(--on-'+name+')' );
   }

   function themeGradient1b(name, hex, onColor) {
     gradient1bName          = name;
     gradient1Name           = gradient1aName + gradient1bName
     gradient1b              = hex;
     ongradient1b            = onColor;
     // darkmode gradient 1 //

     var dmgradient1aName     = gradient1aName.split('-')[0]
     var dmgradient1aShade    = gradient1aName.split('-')[1]
     var dmgradient1b         = $('#themeGradient1-b button .Hex').attr('name');
     var dmgradient1bName     = dmgradient1b.split('-')[0]
     var dmgradient1bShade    = dmgradient1b.split('-')[1]
     /// in dark mode we want the gradients to be made of darker colors and want the same on color//
     /// we will look for colors 400+ with a light text to make sure they are accessible
     /// check to see if the colors and shades are the same //
     /// build an array of shades that meet this criteria for the dark mode color //
     var i = 600;
     var gradient1aArray = [];
     while ( i  < 1000) {
        var onColor =  window['dmon' + dmgradient1aName + i];
        onColor = onColor.replace(/\s/g, '');
        if (onColor == 'rgba(255,255,255,'+dmOpacity+')') {
          gradient1aArray.push(i);
        }
        i = i + 100;
     }
     var arrayCount = gradient1aArray.length
     var change
     if (dmgradient1aName == dmgradient1bName) {
       if (dmgradient1aShade > dmgradient1bShade) {
         change = (dmgradient1aShade  - dmgradient1bShade)/100;
         if (change >= arrayCount) {
           change = arrayCount - 1
         }
         dmgradient1aShade = gradient1aArray[0];
         dmgradient1bShade = gradient1aArray[change];
       } else {
         change = (dmgradient1bShade - dmgradient1aShade)/100;
         if (change >= arrayCount) {
           change = arrayCount
         }
         dmgradient1bShade = gradient1aArray[0];
         dmgradient1aShade = gradient1aArray[change];
       }
     } else {
       dmgradient1aShade = gradient1aArray[0];
       var i = 600;
       var gradient1bArray = [];
       while ( i  < 1000) {
          var onColor =  window['dmon' + dmgradient1bName + i];
          onColor = onColor.replace(/\s/g, '');
          if (onColor == 'rgba(255,255,255,'+dmOpacity+')') {
            gradient1bArray.push(i);
          }
          i = i + 100;
       }
       dmgradient1bShade = gradient1bArray[0];
     }
     document.querySelector(':root').style.setProperty('--gradient1-b' , 'var(--'+name+')');
     dmongradient1a  = window['dmon' + dmgradient1aName + dmgradient1aShade]
     dmgradient1Name = dmgradient1aName + '-' + dmgradient1aShade  + ',' + dmgradient1bName + '-' + dmgradient1bShade
     document.querySelector(':root').style.setProperty('--dm-gradient1-a' , 'var(--dm-' +  dmgradient1aName + '-' + dmgradient1aShade + ')' ) ;
     document.querySelector(':root').style.setProperty('--dm-on-gradient-1' , dmongradient1a);
     document.querySelector(':root').style.setProperty('--dm-gradient1-b' , 'var(--dm-' + dmgradient1bName + '-' + dmgradient1bShade + ')');
     $(document).find('#' + activeTheme + ' .darkmode .default-gradient-1').attr('name', dmgradient1Name );

   }

   function themeGradient2a(name, hex, onColor) {
     gradient2aName          = name;
     gradient2a              = hex;
     ongradient2a            = onColor;
     document.querySelector(':root').style.setProperty('--gradient2-a' , 'var(--'+name+')' );
     document.querySelector(':root').style.setProperty('--on-gradient2-a' , 'var(--on-'+name+')');
   }

   function themeGradient2b(name, hex, onColor) {
     gradient2bName          = name;
     gradient2Name           = gradient2aName + gradient2bName
     gradient2b              = hex;
     ongradient2b            = onColor;
     // darkmode gradient 1 //
     var dmgradient2a         = gradient2aName
     var dmgradient2aName     = gradient2aName.split('-')[0]
     var dmgradient2aShade    = gradient2aName.split('-')[1]
     var dmgradient2b         = name;
     var dmgradient2bName     = name.split('-')[0];
     var dmgradient2bShade    = name.split('-')[1];
     /// in dark mode we want the gradients to be made of darker colors and want the same on color//
     /// we will look for colors 400+ with a light text to make sure they are accessible
     /// check to see if the colors and shades are the same //
     /// build an array of shades that meet this criteria for the dark mode color //
     var i = 600;
     var gradient2aArray = [];
     while ( i  < 1000) {
        var onColor =  window['dmon' + dmgradient2aName.replace('-','') + i];
        onColor = onColor.replace(/\s/g, '');
        if (onColor == 'rgba(255,255,255,'+dmOpacity+')') {
          gradient2aArray.push(i);
        }
        i = i + 100;
     }
     var arrayCount = gradient2aArray.length
     if ( gradient2aName == gradient1bName  || gradient2bName == gradient1bName ) {
       if (arrayCount > 2) {
         gradient2aArray.shift();
         arrayCount = arrayCount - 1
       }
     }
     var change
     if (dmgradient2aName == dmgradient2bName) {
       if (dmgradient2aShade > dmgradient2bShade) {
         change = (dmgradient2aShade  - dmgradient2bShade)/100;
         if (change >= arrayCount) {
           change = arrayCount - 1
         }
         dmgradient2aShade = gradient2aArray[0];
         dmgradient2bShade = gradient2aArray[change];
       } else {
         change = (dmgradient2bShade - dmgradient2aShade)/100;
         if (change >= arrayCount) {
           change = arrayCount
         }
         dmgradient2bShade = gradient2aArray[0];
         dmgradient2aShade = gradient2aArray[change];
       }
     } else {
       dmgradient2aShade = gradient2aArray[0];
       var i = 600;
       var gradient2bArray = [];
       while ( i  < 1000) {
          var onColor =  window['dmon' + dmgradient2bName + i];
          onColor = onColor.replace(/\s/g, '');
          if (onColor == 'rgba(255,255,255,'+dmOpacity+')') {
            gradient2bArray.push(i);
          }
          i = i + 100;
       }
       dmgradient2bShade = gradient2bArray[0];
     }
     dmongradient2a  = window['dmon' + dmgradient2aName + dmgradient2aShade]
     dmgradient2Name = dmgradient2aName + '-' + dmgradient2aShade  + ',' + dmgradient2bName + '-' + dmgradient2bShade

     // set gradient 2b root ///
     document.querySelector(':root').style.setProperty('--gradient2-b' ,  'var(--'+name+')' );
     // set dark mode gradient 2 root values///
     document.querySelector(':root').style.setProperty('--dm-gradient2-a' , 'var(--dm-' +  dmgradient2aName + '-' + dmgradient2aShade + ')' ) ;
     document.querySelector(':root').style.setProperty('--dm-on-gradient-2' , dmongradient2a);
     document.querySelector(':root').style.setProperty('--dm-gradient2-b' , 'var(--dm-' + dmgradient2bName + '-' + dmgradient2bShade + ')');
     $(document).find('#' + activeTheme + ' .darkmode .default-gradient-2').attr('name', dmgradient2Name );

   }


   function themeButtons(name, hex, onColor) {
     buttonsName  = name
     buttons      = hex;
     onButtons    = onColor
     buttonHalf   = hextoRGBArray(hex);
     buttonHalf   = 'rgba(' + buttonHalf + ',.5)'
     document.querySelector(':root').style.setProperty('--button' , 'var(--'+buttonsName+')' );
     document.querySelector(':root').style.setProperty('--button-half' , buttonHalf);
     document.querySelector(':root').style.setProperty('--on-button' , 'var(--on-'+buttonsName+')');
     // get the contrast ration of the color against the suggested text color //
     var color               = rgb2hex(buttons);
     var buttonArray         = hextoRGBArray(color);
     var primeColor          = rgb2hex(primary);
     var primeArray          = hextoRGBArray(primeColor);
     if (dmbackgroundPrimary.indexOf('rgb') > 0) {
       var testdmbackground     = rgb2hex(dmbackgroundPrimary.toString());
     } else {
       var testdmbackground         = dmbackgroundPrimary
     }
     testdmbackground           = hextoRGBArray(testdmbackground);
     // Get a button color with a contrast ratio of 3.1 or higher //
     var dmButtonShade          = getDMShade(buttonsName ,testdmbackground, 3.1)
     dmbuttons                  = window['dm' + name.split('-')[0] + dmButtonShade]
     dmonbuttons                = window['dmon' + name.split('-')[0] + dmButtonShade]
     dmbuttonHalf               = dmbuttons.replace('rgb','rgba').replace(')','.5)');

     document.querySelector(':root').style.setProperty('--dm-button' , dmbuttons);
     document.querySelector(':root').style.setProperty('--dm-buttonHalf' , dmbuttonHalf);
     document.querySelector(':root').style.setProperty('--dm-on-button' , dmonbuttons);
     document.querySelector(':root').style.setProperty('--dm-button-half' ,  dmbuttonHalf);
     /// set on white button color ///
     var contrastRation      = contrast(buttonArray, '255,255,255'); // 1.0736196319018405
     if (contrastRation >= 3.1) {
       buttonOnWhite         = buttons
       buttonHalfOnWhite     = buttonHalf
       onbuttonOnWhite       = onButtons
       document.querySelector(':root').style.setProperty('--buttonOnWhite' , 'var(--button)' );
       document.querySelector(':root').style.setProperty('--onbuttonOnWhite' , 'var(--on-button)' );
       document.querySelector(':root').style.setProperty('--buttonHalfOnWhite' , 'var(--button-half)' );
     } else {
       buttonOnWhite         = black
       buttonHalfOnWhite    = blackHalf
       onbuttonOnWhite       = white
       document.querySelector(':root').style.setProperty('--buttonOnWhite' , 'var(--black)' );
       document.querySelector(':root').style.setProperty('--onbuttonOnWhite' , 'var(--white)' );
       document.querySelector(':root').style.setProperty('--buttonHalfOnWhite' , 'var(--black-half)' );
     }

     /// set on black button color ///
     var contrastRation      = contrast(buttonArray, darkTextArray); // 1.0736196319018405
     if (contrastRation >= 3.1) {
       buttonOnBlack         = buttons
       buttonHalfOnBlack    = buttonHalf
       onbuttonOnBlack       = onButtons
       document.querySelector(':root').style.setProperty('--buttonOnBlack' ,  'var(--button)' );
       document.querySelector(':root').style.setProperty('--onbuttonOnBlack' , 'var(--button-half)');
       document.querySelector(':root').style.setProperty('--buttonHalfOnBlack' , 'var(--on-button)' );
     } else {
       buttonOnBlack         = white
       buttonHalfOnBlack     = whiteHalf
       onbuttonOnBlack       = black
       document.querySelector(':root').style.setProperty('--buttonOnBlack' , 'var(--white)'  );
       document.querySelector(':root').style.setProperty('--onbuttonOnBlack' , 'var(--black)' );
       document.querySelector(':root').style.setProperty('--buttonHalfOnBlack' , 'var(--white-half)');
     }

     /// set on prime button color ///
     var contrastRation      = contrast(buttonArray, primeArray); // 1.0736196319018405
     if (contrastRation >= 3.1) {
       buttonOnTertiary        = buttons
       buttonHalfOnTertiary    = buttonHalf
       onbuttonOnTertiary      = onButtons
     } else {
       buttonOnTertiary        = onPrimary
       if (onPrimary == '#121212' || onPrimary.replace(/\s/g, '') == 'rgb(35,35,63)') {
         onbuttonOnTertiary     = white
         buttonHalfOnTertiary  = blackHalf
         document.querySelector(':root').style.setProperty('--buttonOnTertiary' , 'var(--black)');
         document.querySelector(':root').style.setProperty('--onbuttonOnTertiary' , 'var(--white)'  );
         document.querySelector(':root').style.setProperty('--buttonHalfOnTertiary' , 'var(--black-half)'  );
       } else {
         onbuttonOnTertiary     = black
         buttonHalfOnTertiary  = whiteHalf
         document.querySelector(':root').style.setProperty('--buttonOnTertiary' , 'var(--white)');
         document.querySelector(':root').style.setProperty('--onbuttonOnTertiary' , 'var(--black)'  );
          document.querySelector(':root').style.setProperty('--buttonHalfOnTertiary' , 'var(--white-half)'  );
       }
     }

     /// set on gradient1 button color ///
     var buttonOnGradient1     = ongradient1a
     if (ongradient1a == '#121212' || ongradient1a.replace(/\s/g, '') == 'rgb(35,35,63)') {
       onbuttonOnGradient1         = white
       buttonHalfOnGradient1       = blackHalf
       document.querySelector(':root').style.setProperty('--buttonOnGradient1' ,  'var(--black)' );
       document.querySelector(':root').style.setProperty('--onbuttonOnGradient1' ,  'var(--white)');
       document.querySelector(':root').style.setProperty('--buttonHalfOnGradient1' , 'var(--black-half)'  );
     } else {
       onbuttonOnGradient1         = black
       buttonHalfOnGradient1       = whiteHalf
       document.querySelector(':root').style.setProperty('--buttonOnGradient1' ,  'var(--white)' );
       document.querySelector(':root').style.setProperty('--onbuttonOnGradient1' ,  'var(--black)');
       document.querySelector(':root').style.setProperty('--buttonHalfOnGradient1' , 'var(--white-half)'  );
     }

     /// set on gradient1 button color ///
     ongradient1b            = $('#themeGradient1-b button .Hex').css('color');
     var buttonOnGradient2     = ongradient2a
     if (ongradient2a == '#121212'  || ongradient2a.replace(/\s/g, '') == 'rgb(35,35,63)') {
       onbuttonOnGradient2         = white
       buttonHalfOnGradient2       = blackHalf
       document.querySelector(':root').style.setProperty('--buttonOnGradient2' , 'var(--black)' );
       document.querySelector(':root').style.setProperty('--onbuttonOnGradient2' , 'var(--white)' );
       document.querySelector(':root').style.setProperty('--buttonHalfOnGradient2' , 'var(--black-half)');
     } else {
       onbuttonOnGradient2         = black
       buttonHalfOnGradient2       = whiteHalf
       document.querySelector(':root').style.setProperty('--buttonOnGradient2' , 'var(--white)' );
       document.querySelector(':root').style.setProperty('--onbuttonOnGradient2' , 'var(--black)' );
       document.querySelector(':root').style.setProperty('--buttonHalfOnGradient2' , 'var(--black-white)');
     }

     /// set on gradient3 button color ///
     var contrastRation      = contrast(buttonArray, '227,227,228'); // 1.0736196319018405
     if (contrastRation >= 3.1) {
       buttonOnGradient3        = buttons
       onbuttonOnGradient3      = onButtons
       buttonHalfOnGradient3   = buttonHalf
       document.querySelector(':root').style.setProperty('--buttonOnGradient3' , 'var(--button)' );
       document.querySelector(':root').style.setProperty('--onbuttonOnGradient3' , 'var(--on-button)' );
       document.querySelector(':root').style.setProperty('--buttonHalfOnGradient3' , 'var(--button-half)');
     } else {
       buttonOnGradient3        = black
       onbuttonOnGradient3      = white
       buttonHalfOnGradient3   = blackHalf
       document.querySelector(':root').style.setProperty('--buttonOnGradient3' , 'var(--black)' );
       document.querySelector(':root').style.setProperty('--onbuttonOnGradient3' , 'var(--white)' );
       document.querySelector(':root').style.setProperty('--buttonHalfOnGradient3' , 'var(--black-half)');
     }

     /// set dark mode on white button color ///
     var contrastRation      = contrast(buttonArray, '255,255,255') * dmOpacity; // 1.0736196319018405
     if (contrastRation >= 3.1) {
       dmbuttonOnWhite         = dmbuttons
       dmonbuttonOnWhite       = dmonbuttons
       dmbuttonHalfOnWhite    = buttonHalf
       document.querySelector(':root').style.setProperty('--dmbuttonOnWhite' , 'var(--dm-button)');
       document.querySelector(':root').style.setProperty('--dmonbuttonOnWhite' , 'var(--dm-on-button)');
       document.querySelector(':root').style.setProperty('--dmonbuttonHalfOnBlack' , 'var(--dm-button-half)' );
     } else {
       dmbuttonOnWhite         = black
       dmonbuttonOnWhite       = dmwhite
       dmbuttonHalfOnWhite     = blackHalf
       document.querySelector(':root').style.setProperty('--dmbuttonOnWhite' , 'var(--black)' );
       document.querySelector(':root').style.setProperty('--dmonbuttonOnWhite' , 'var(--dm-white)' );
       document.querySelector(':root').style.setProperty('--dmonbuttonHalfOnBlack' , 'var(--black-half)' );
     }

     /// set dark mode  on black button color ///
     var contrastRation      = contrast(buttonArray, darkTextArray); // 1.0736196319018405
     if (contrastRation >= 3.1) {
       dmbuttonOnBlack         = dmbuttons
       dmonbuttonOnBlack       = dmonbuttons
       dmbuttonHalfOnBlack     = buttonHalf
       document.querySelector(':root').style.setProperty('--dmbuttonOnBlack' , 'var(--dm-button)' );
       document.querySelector(':root').style.setProperty('--dmonbuttonOnBlack' ,  'var(--dm-on-button)' );
       document.querySelector(':root').style.setProperty('--dmonbuttonHalfOnBlack' , 'var(--dm-button-half)');
     } else {
       dmbuttonOnBlack         = dmwhite
       dmonbuttonOnBlack       = black
       dmbuttonHalfOnBlack     = dmwhiteHalf
       document.querySelector(':root').style.setProperty('--dmbuttonOnBlack' , 'var(--dm-white)' );
       document.querySelector(':root').style.setProperty('--dmonbuttonOnBlack' , 'var(--black)' );
       document.querySelector(':root').style.setProperty('--dmonbuttonHalfOnBlack' , 'var(--dm-white-half)' );
     }

     /// set dark mode on tertiary bg/ primary button color ///
     dmbuttonOnTertiary     = dmonbackgroundTertiary
     if (dmonbackgroundTertiary == '#121212'  || dmonbackgroundTertiary.replace(/\s/g, '') == 'rgb(35,35,63)') {
       dmonbuttonOnTertiary     = dmwhite
       dmbuttonHalfOnTertiary   = dmwhiteHalf
       document.querySelector(':root').style.setProperty('--dmbuttonOnTertiary' , 'var(--white)'  );
       document.querySelector(':root').style.setProperty('--dmonbuttonOnTertiary' , 'var(--black)'  );
       document.querySelector(':root').style.setProperty('--dmonbuttonHalfOnTertiary' , 'var(--dm-white-half)'  );
     } else {
       dmonbuttonOnTertiary     = black
       dmbuttonHalfOnTertiary   = blackHalf
       document.querySelector(':root').style.setProperty('--dmbuttonOnTertiary' , 'var(--black)'  );
       document.querySelector(':root').style.setProperty('--dmonbuttonOnTertiary' , 'var(--dm-white)'  );
       document.querySelector(':root').style.setProperty('--dmonbuttonHalfOnTertiary' , 'var(--black-half)'  );
     }

     /// set dark mode on gradient1 button color ///
     dmbuttonOnGradient1     = dmongradient1a
     if (dmongradient1a == '#121212'  || ongradient1a.replace(/\s/g, '') == 'rgb(35,35,63)') {
       dmonbuttonOnGradient1    = black
       dmbuttonHalfOnGradient1  = dmwhiteHalf
       document.querySelector(':root').style.setProperty('--dmbuttonOnGradient1' , 'var(--dm-white)'  );
       document.querySelector(':root').style.setProperty('--dmonbuttonOnGradient1' , 'var(--black)'  );
       document.querySelector(':root').style.setProperty('--dmonbuttonHalfOnGradient1' ,'var(--dm-white-half)' );
     } else {
       dmonbuttonOnGradient1     = dmwhite
       dmbuttonHalfOnGradient1   = blackHalf
       document.querySelector(':root').style.setProperty('--dmbuttonOnGradient1' , 'var(--black)' );
       document.querySelector(':root').style.setProperty('--dmonbuttonOnGradient1' , 'var(--dm-white)' );
       document.querySelector(':root').style.setProperty('--dmonbuttonHalfOnGradient1' ,'var(--black-half)' );
     }

     /// set  dark mode  on gradient1 button color ///
     dmbuttonOnGradient2     = dmongradient2a
     if (ongradient2a == '#121212' || ongradient2a.replace(/\s/g, '') == 'rgb(35,35,63)') {
       dmonbuttonOnGradient2    = black
       dmbuttonHalfOnGradient2  = dmwhiteHalf
       document.querySelector(':root').style.setProperty('--dmbuttonOnGradient2' , 'var(--dm-white)'  );
       document.querySelector(':root').style.setProperty('--dmonbuttonOnGradient2' , 'var(--black)'  );
       document.querySelector(':root').style.setProperty('--dmonbuttonHalfOnGradient2' , 'var(--dm-white-half)'  );
     } else {
       dmonbuttonOnGradient2     = dmwhite
       dmbuttonHalfOnGradient2  = blackHalf
       document.querySelector(':root').style.setProperty('--dmbuttonOnGradient2' , 'var(--black)'  );
       document.querySelector(':root').style.setProperty('--dmonbuttonOnGradient2' , 'var(--dm-white)'  );
       document.querySelector(':root').style.setProperty('--dmonbuttonHalfOnGradient2' , 'var(--black-half)'  );
     }

     /// set  dark mode on gradient3 button color ///
     var contrastRation      = contrast(buttonArray, '24,24,24'); // 1.0736196319018405
     if (contrastRation >= 3.1) {
       dmbuttonOnGradient3        = dmbuttons
       dmonbuttonOnGradient3      = dmonbuttons
       dmbuttonHalfOnGradient3   = dmbuttonkHalf
       document.querySelector(':root').style.setProperty('--dmbuttonOnGradient3' , 'var(--dm-button)' );
       document.querySelector(':root').style.setProperty('--dmonbuttonOnGradient3' , 'var(--dm-on-button)' );
       document.querySelector(':root').style.setProperty('--dmonbuttonHalfOnGradient3' , 'var(--dm-button-half)' );
     } else {
       dmbuttonOnGradient3        = dmwhite
       dmonbuttonOnGradient3      = black
       dmbuttonHalfOnGradient3    = dmwhiteHalf
       document.querySelector(':root').style.setProperty('--dmbuttonOnGradient3' , 'var(--dm-white)' );
       document.querySelector(':root').style.setProperty('--dmonbuttonOnGradient3' , 'var(--black)' );
       document.querySelector(':root').style.setProperty('--dmonbuttonHalfOnGradient3' , 'var(--dm-white-half)'  );
     }

     loadFocus()
   }

   function themeIcons(name, hex, onColor) {
     iconsName  = name;
     icons      = hex;
    // onIcons    = onColor
     document.querySelector(':root').style.setProperty('--icons' , 'var(--'+name+') ');
    // document.querySelector(':root').style.setProperty('--on-icons' , 'var(--on-'+name+') ');
     // get the contrast ration of the color against the suggested text color //
     var color               = rgb2hex(icons);
     var iconArray           = hextoRGBArray(color);
     var primeColor          = rgb2hex(primary);
     var primeArray          = hextoRGBArray(primeColor);
     if (dmbackgroundPrimary.indexOf('rgb') > 0) {
       var testdmbackground     = rgb2hex(dmbackgroundPrimary);
     } else {
       var testdmbackground         = dmbackgroundPrimary
     }
     testdmbackground        = hextoRGBArray(testdmbackground);
     // Get a icon color with a contrast ratio of 3.1 or higher //
     var dmIconShade          = getDMShade(iconsName,testdmbackground, 3.1)

     dmicons                  = $(document).find('#' + iconsName.split('-')[0]   + '-dark-' + dmIconShade  + ' .Hex').css('backgroundColor')
     document.querySelector(':root').style.setProperty('--dm-icon' , 'var(--dm-'+iconsName.split('-')[0]+ '-' + dmIconShade + ')' );
     /// set on white icon color ///
     var contrastRation      = contrast(iconArray, '255,255,255'); // 1.0736196319018405
     if (contrastRation >= 3.1) {
       iconOnWhite         = icons
       document.querySelector(':root').style.setProperty('--iconOnWhite' , 'var(--icon)' );
     } else {
       document.querySelector(':root').style.setProperty('--iconOnWhite' , 'var(--black)'  );
     }

     /// set on black icon color ///
     var contrastRation      = contrast(iconArray, darkTextArray); // 1.0736196319018405
     if (contrastRation >= 3.1) {
       iconOnBlack         = icons
       document.querySelector(':root').style.setProperty('--iconOnBlack' , 'var(--icon)' );
     } else {
       iconOnBlack         = white
       document.querySelector(':root').style.setProperty('--iconOnBlack' , 'var(--white)' );
     }


     /// set on prime icon color ///
     var contrastRation      = contrast(iconArray, primeArray ); // 1.0736196319018405
     if (contrastRation >= 3.1) {
       iconOnTertiary        = icons
       document.querySelector(':root').style.setProperty('--iconOnTertiary' , 'var(--icon)' );
     } else {
       iconOnTertiary        =  onPrimary
       document.querySelector(':root').style.setProperty('--iconOnTertiary' , 'var(--on-primary)' );
     }


    /// set on gradient3 icon color ///
     var contrastRation      = contrast(iconArray, '227,227,228'); // 1.0736196319018405
     if (contrastRation >= 3.1) {
       iconOnGradient3        = icons
       document.querySelector(':root').style.setProperty('--iconOnGradient3' , 'var(--icon)' );
     } else {
       buttonOnGradient3        = black
       document.querySelector(':root').style.setProperty('--iconOnGradient3' , 'var(--black)' );
     }

     /// set dark mode on white icon color ///
     var contrastRation      = contrast(iconArray, '255,255,255') * dmOpacity; // 1.0736196319018405
     if (contrastRation >= 3.1) {
       dmiconOnWhite         = dmicons
       document.querySelector(':root').style.setProperty('--dmiconOnWhite' , 'var(--dm-icon)' );
     } else {
       dmiconOnWhite         = black
       document.querySelector(':root').style.setProperty('--dmiconOnWhite' , 'var(--black)' );
     }

     /// set dark mode  on black icon color ///
     var contrastRation      = contrast(iconArray, darkTextArray); // 1.0736196319018405
     if (contrastRation >= 3.1) {
       dmiconOnWhite         = dmicons
       document.querySelector(':root').style.setProperty('--dmiconOnBlack' , 'var(--dm-icon)' );
     } else {
       dmiconOnWhite         = dmwhite
       document.querySelector(':root').style.setProperty('--dmiconOnBlack' , 'var(--dm-white)' );
     }


     /// set  dark mode on gradient3 icon color ///
     var contrastRation      = contrast(iconArray, darkTextArray); // 1.0736196319018405
     if (contrastRation >= 3.1) {
       dmiconOnGradient3        = dmicons
       document.querySelector(':root').style.setProperty('--dmiconOnGradient3' , 'var(--dm-icon)' );
     } else {
       dmbuttonOnGradient3        = black
       document.querySelector(':root').style.setProperty('--dmiconOnGradient3' , 'var(--black)'  );
     }


   }

    function themeAccent(name, hex) {
      accent      = hex;
      document.querySelector(':root').style.setProperty('--accent' , 'var(--'+name+')' );
      dmaccent    = window[name.split('-')[0] + '-' + 300]
      document.querySelector(':root').style.setProperty('--dm-accent' , 'var(--'+ name.split('-')[0] + '-' + 300   +')'  );
    }

   // select theme //
   $(document).on('click', '.theme-dropdown .dropdown-item', function() {
     $(this).parents('.theme-dropdown').removeClass('no-selection')
     var hex     = $(this).find('.Hex').css('backgroundColor');
     var onColor = $(this).find('.Hex').css('color');
     var name    = $(this).find('.Hex').attr('class').replace('Hex ', '')
     $(this).parents('.theme-dropdown').find('button .Hex').eq(0).css('background', hex);
     $(this).parents('.theme-dropdown').find('button .Hex').eq(0).css('color', onColor);
     $(this).parents('.theme-dropdown').find('button .Hex').eq(0).attr('name', name);

     if ($(this).parents('.theme-dropdown').attr('id') == 'themePrimary') {
       themePrimary(name,hex,onColor)
     } else if ($(this).parents('.theme-dropdown').attr('id') == 'themeSecondary') {
       showThemeOptions(name)
       setThemeShades('secondary', name.split('-')[0] )
     } else if ($(this).parents('.theme-dropdown').attr('id') == 'themeTertiary') {
       showThemeOptions(name)
       setThemeShades('tertiary', name.split('-')[0] )
     } else if ($(this).parents('.theme-dropdown').attr('id') == 'surfaceBG') {
        buildInput()
     } else if ($(this).parents('.theme-dropdown').attr('id') == 'themeBackground') {
        themeBackground(name, hex, onColor)
     } else if  ($(this).parents('.theme-dropdown').attr('id') == 'themeDarkmode-BG') {
        themeDarkmodeBG(name, hex, onColor)
     } else if ($(this).parents('.theme-dropdown').attr('id') == 'themeButtons') {
         themeButtons(name, hex, onColor)
     } else if ($(this).parents('.theme-dropdown').attr('id') == 'themeIcons') {
         themeIcons(name, hex, onColor)
     } else if ($(this).parents('.theme-dropdown').attr('id') == 'themeAccent') {
         themeAccent(name, hex)
     } else if ($(this).parents('.theme-dropdown').attr('id') == 'themeGradient1-a') {
        themeGradient1a(name, hex, onColor)
     } else if ($(this).parents('.theme-dropdown').attr('id') == 'themeGradient1-b') {
       themeGradient1b(name, hex, onColor)
     } else if ($(this).parents('.theme-dropdown').attr('id') == 'themeGradient2-a') {
        themeGradient2a(name, hex, onColor)
     } else if ($(this).parents('.theme-dropdown').attr('id') == 'themeGradient2-b') {
       themeGradient2b(name, hex, onColor)
     } else if ($(this).parents('.theme-dropdown').attr('id') == 'themeGradientText-a') {
       textgradient1aName      = name;
       textgradient1a          = hex;
       document.querySelector(':root').style.setProperty('--text-gradient-a',  'var(--'+textgradient1aName+')'  );
     } else if ($(this).parents('.theme-dropdown').attr('id') == 'themeGradientText-b') {
       textgradient1bName      = name;
       textgradient1b          = hex;
       document.querySelector(':root').style.setProperty('--text-gradient-b', 'var(--'+textgradient1bName+')'  );
     }
     getSorted()
   });

  // kick off the changing of the rendered themesbased on user selection in the drop down//
  $(document).on('click', '#selectedTheme .dropdown-item', function() {
    $(document).find('.theme-container').removeClass('active');
    $(this).find('.theme-container').addClass('active');
    setTheme()
  });

  //// APPLYING ACCESSIBILTY MODES ////
  // COLOR BLIND //
  $('#ColorBlindMode').click(function() {
    if ($(this).is(':checked')) {
      cbStates()
    } else {
      systemStates()
    }
    $('#chart-color button').html('Color Blind');
    build_ChartColors()
  });
  /// On click apply color blind accessibility mode ///
  $('#cb-states').click(function() {
    cbStates()
  });

  function cbStates() {
    buildStates('#F3B33E', 'warning');
    buildStates('rgb(0, 77, 64)', 'success');
    buildStates('rgb(216, 27, 96)', 'danger');
    buildStates('rgb(30, 136, 229)', 'info');
  }

  function colorBlindPallet() {
    $('#buildColor .light-mode .subtitle').remove();
    $('#buildColor .light-mode .colorRow').remove();
    $('#buildColor .dark-mode .subtitle').remove();
    $('#buildColor .dark-mode .colorRow').remove();
    addtoTheme('Periwinkle', '#50A6FF');
    addtoTheme('Blue', '#7C4DEF');
    addtoTheme('Rose', '#D02670');
    addtoTheme('Orange', '#EC6B29');
    addtoTheme('Yellow', '#FCB116');
  }

  $('#reset-states').click(function() {
    resetStates()
  });

  function resetStates() {
    buildStates('#B37E1B', 'warning');
    buildStates('#327D35', 'success');
    buildStates('#D62B2B', 'danger');
    buildStates('#0066EF', 'info');
  }

  function systemStates() {
    var system = $(document).find('.system.active').attr('id');
    var info = $('#' + system + ' .background .' + system  +'-info').html();
    var success = $('#' + system + ' .background .' + system  +'-success').html();
    var warning = $('#' + system + ' .background .' + system  +'-warning').html();
    var danger = $('#' + system + ' .background .' + system  +'-danger').html();
    buildStates(warning, 'warning');
    buildStates(success, 'success');
    buildStates(danger, 'danger');
    buildStates(info, 'info');
  }

  $('#colorBlind').click(function() {
     colorBlindPallet()
  });

  // DYSLEXIA //
  $('#DyslexicMode').click(function() {
    if ($(this).is(':checked')) {
      ///  Change the font family to OpenDyslexic   /////
      document.querySelector(':root').style.setProperty('--headerFamily', 'OpenDyslexic');
      document.querySelector(':root').style.setProperty('--bodyFamily', 'OpenDyslexic');
      //// change the font weights to reflect only those avaiable in the Font Family of OpenDyslexic  ///
      document.querySelector(':root').style.setProperty('--fontWeight0', 400);
      document.querySelector(':root').style.setProperty('--fontWeight1', 400);
      document.querySelector(':root').style.setProperty('--fontWeight2', 400);
      document.querySelector(':root').style.setProperty('--fontWeight3', 700);
      document.querySelector(':root').style.setProperty('--fontWeight4', 700);
      /// increase the line heights ////
      document.querySelector(':root').style.setProperty('--standard-LineHeight', '180%');
      document.querySelector(':root').style.setProperty('--sm-LineHeight', '150%');
    } else {
      var system     = $(document).find('.system.active').attr('id');
      var primaryFont     = $('#' + system + ' .' + system  +'-primaryFont').html();
      var secondaryFont   = $('#' + system + ' .' + system  +'-secondaryFont').html();
      var fontWeight0 = $('#' + system + ' .' + system  +'-fontweight0').html();
      var fontWeight1 = $('#' + system + ' .' + system  +'-fontweight1').html();
      var fontWeight2 = $('#' + system + ' .' + system  +'-fontweight2').html();
      var fontWeight3 = $('#' + system + ' .' + system  +'-fontweight3').html();
      var fontWeight4 = $('#' + system + ' .' + system  +'-fontweight4').html();
      document.querySelector(':root').style.setProperty('--headerFamily', primary);
      document.querySelector(':root').style.setProperty('--bodyFamily', secondary);
      document.querySelector(':root').style.setProperty('--fontWeight1',fontWeight0);
      document.querySelector(':root').style.setProperty('--fontWeight1',fontWeight1);
      document.querySelector(':root').style.setProperty('--fontWeight2',fontWeight2);
      document.querySelector(':root').style.setProperty('--fontWeight3',fontWeight3);
      document.querySelector(':root').style.setProperty('--fontWeight4',fontWeight4);
      document.querySelector(':root').style.setProperty('--standard-LineHeight', '160%');
      document.querySelector(':root').style.setProperty('--sm-LineHeight', '130%');
    }
  });


  // OTHE FUNCTIONS //
  function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


   $('.baseButton button').click(function() {
     name = $(this).attr('name');
     $(this).parent().find('button').removeClass('active');
     $(this).addClass('active');
     $('.mobile-main').removeClass('active');
     $('#' + name).addClass('active');
   });

   function buttonHexColors() {
     // remove the 'for-color-bg' class for all colors in the icons, buttons, text gradient a and b dropdown menus //
     // loop through all the colors and in the following dropdown menus //
     // if the color contrasts agains the background then add the 'for-color-bg' class'
     $('#themeIcons .colorGroup li').each(function() {
        $(this).removeClass('active').removeClass('for-color-bg')
        /// if the color is light you need to find the darker color the backgroundSecondary to get the contrast against //
        /// if the color is dark you need to get the lighter color background the backgroundPrimary to get the contrast agains //
        if (backgroundPrimaryName == 'white-bg' || backgroundPrimaryName  == 'primary-Half') {
          var halfBG  = rgb2hex(backgroundSecondary)
        } else {
          var halfBG  = rgb2hex(backgroundPrimary)
        }
        var bgArray = hextoRGBArray(halfBG);
        var color = $(this).find('.Hex').css('backgroundColor');
        color = rgb2hex(color);
        color = hextoRGBArray(color);
        if (contrast(bgArray, color) >= 3.1) {
          $(this).addClass('for-color-bg active')
        }
    });
    $('#themeButtons .colorGroup li').each(function() {
       $(this).removeClass('active').removeClass('for-color-bg')
       if (backgroundPrimaryName == 'white-bg' || backgroundPrimaryName  =='primary-Half') {
         var halfBG  = rgb2hex(backgroundSecondary)
       } else {
         var halfBG  = rgb2hex(backgroundPrimary)
       }
       var bgArray =hextoRGBArray(halfBG);
       var color = $(this).find('.Hex').css('backgroundColor');
       color = rgb2hex(color);
       color = hextoRGBArray(color);
       if (contrast(bgArray, color) >= 3.1) {
         $(this).addClass('for-color-bg active')
       }
    });
    $('#themeGradientText-a .colorGroup li').each(function() {
       $(this).removeClass('active').removeClass('for-color-bg')
       if (backgroundPrimaryName == 'white-bg' || backgroundPrimaryName  =='primary-Half') {
         var halfBG  = rgb2hex(backgroundSecondary)
       } else {
         var halfBG  = rgb2hex(backgroundPrimary)
       }
       var bgArray =hextoRGBArray(halfBG);
       var color = $(this).find('.Hex').css('backgroundColor');
       color = rgb2hex(color);
       color = hextoRGBArray(color);
       if (contrast(bgArray, color) >= 3.1) {
         $(this).addClass('for-color-bg active')
       }
     });
     $('#themeGradientText-b .colorGroup li').each(function() {
       $(this).removeClass('active').removeClass('for-color-bg')
       if (backgroundPrimaryName == 'white-bg' || backgroundPrimaryName  =='primary-Half') {
         var halfBG  = rgb2hex(backgroundSecondary)
       } else {
         var halfBG  = rgb2hex(backgroundPrimary)
       }
       var bgArray =hextoRGBArray(halfBG);
       var color = $(this).find('.Hex').css('backgroundColor');
       color = rgb2hex(color);
       color = hextoRGBArray(color);
       if (contrast(bgArray, color) >= 3.1) {
         $(this).addClass('for-color-bg active')
       }
     });

   }

     // Sort List by Order //
       function getSorted() {
         $('.colorGroup').each(function() {
          var id = $(this).attr('id')
          $(function() {
            $('#' + id + '> li').sort(sort_li).appendTo('#' + id );
            function sort_li(a, b) {
              return ($(b).data('order')) < ($(a).data('order')) ? 1 : -1;
            }
          })
       });
     }

     // Sort List by Order //
       function sortSpacing() {
         $('.sortList').each(function() {
          var id = $(this).attr('id')
          $(function() {

            $('#' + id + '> li').sort(sort_li).appendTo('#' + id );
            function sort_li(a, b) {
              return ($(b).data('order')) < ($(a).data('order')) ? 1 : -1;
            }
          })
       });
     }

     $('.system-setting').blur(function() {
       var setValue = $(this).val();
       var setName = $(this).attr('id')
       var functionName = $(this).attr('name')
       if (functionName) {
         // find object
         var fn = window[functionName];
         // is object a function?
         if (typeof fn === "function") fn();
       } else {
         if (functionName ) {
           this[functionName] = setValue
         }
       }
       $(document).find('#' + system + ' .default-' + setName).html(setValue)
       document.querySelector(':root').style.setProperty('--'+ setName , setValue);
     });




      $('input[name="dropdownFocus"]').click(function() {
        var onButtonColor = $('#' + system + 'Default .default-button').css('color');
        if ($(this).val() == 'leftBorder') {
          document.querySelector(':root').style.setProperty('--dropdown-focus-theme', '4px');
          document.querySelector(':root').style.setProperty('--on-dropdown-focus-bg', onbackgroundPrimary);
        } else {
          document.querySelector(':root').style.setProperty('--dropdown-focus-theme', '100%');
          document.querySelector(':root').style.setProperty('--on-dropdown-focus-bg', onButtonColor);
        }
      });

     // Assign //
     $('.text-style  .dropdown-item').click(function(e) {
       var update = $(this).html();
       var id = $(this).parents('.text-style').attr('id');
       $('#' + id + ' .dropdown-toggle').html(update);
       $(this).parents('.text-style').addClass('editted');
       updateText()
      });

    function updateText(){
      var family       = $(document).find('#text-family button').html()
      var weight       = $(document).find('#text-weight button').html()
      var lh           = $(document).find('#text-line-height button').html()
      var spacing      = $(document).find('#text-letter-spacing-info span').html();
      var size         = $(document).find('#text-size-info span').html();
      var style = weight + ' ' + size + '/' + lh + ' ' + family + ' , sans-serif'
      $('#sample-text .new').css('letter-spacing', spacing);
      $('#sample-text .new').css('font', style);
    }

    // pick color theory for charts //
    $('#chart-color .dropdown-item').click(function(e) {
      var update = $(this).html();
      $(this).parents('.dropdown').find('.dropdown-toggle').html(update);
      var system = $('.system.active').attr('id');
      $('#' + system + ' .default-chart-theory').html(update);
      build_ChartColors()
     });





      function css(a) {
          var sheets = document.styleSheets, o = {};
          for (var i in sheets) {
              var rules = sheets[i].rules || sheets[i].cssRules;
              for (var r in rules) {
                  if (a.is(rules[r].selectorText)) {
                      o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
                  }
              }
          }
          return o;
      }

      function css2json(css) {
          var s = {};
          if (!css) return s;
          if (css instanceof CSSStyleDeclaration) {
              for (var i in css) {
                  if ((css[i]).toLowerCase) {
                      s[(css[i]).toLowerCase()] = (css[css[i]]);
                  }
              }
          } else if (typeof css == "string") {
              css = css.split("; ");
              for (var i in css) {
                  var l = css[i].split(": ");
                  s[l[0].toLowerCase()] = (l[1]);
              }
          }
          return s;
      }

});
