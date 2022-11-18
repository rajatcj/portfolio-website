$nomention
$onlyIf[$checkContains[$customID;shoppages^^$authorID^^]==true;]

$removeButtons
$removeComponent[buy]
$var[ppage;$replaceText[$customID;shoppages^^$authorID^^;]]

$var[user;$authorID]


$title[🎒 • Shop]

$var[true;primary]
$var[false;secondary]

$var[truee;yes]
$var[falsee;no]

$addButton[yes;shoppages^^$authorID^^1;1;$var[$checkCondition[$var[ppage]==1]];$var[$checkCondition[$var[ppage]==1]e];;]
$addButton[no;shoppages^^$authorID^^2;2;$var[$checkCondition[$var[ppage]==2]];$var[$checkCondition[$var[ppage]==2]e];;]
$addButton[no;shoppages^^$authorID^^3;3;$var[$checkCondition[$var[ppage]==3]];$var[$checkCondition[$var[ppage]==3]e];;]
$addButton[no;shoppages^^$authorID^^4;4;$var[$checkCondition[$var[ppage]==4]];$var[$checkCondition[$var[ppage]==4]e];;]
$addButton[no;shoppages^^$authorID^^5;5;$var[$checkCondition[$var[ppage]==5]];$var[$checkCondition[$var[ppage]==5]e];;]


$try
$newSelectMenu[buy;1;1;Click to Buy Item]
$endtry
Hat 
$var[inline;no]

$addField[**BOT SHOP**;`This contains bot items`;$var[inline]]
$var[n;norob]
$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$addField[🏃 Rob Protection • 💵 $numberSeparator[$splitText[4];,];
>>> Get Rob protection.;$var[inline]]
$addSelectMenuOption[buy;Rob Protection ;item$var[n];;no;🏃]
$endif
$var[n;nick]
$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$addField[🏷️ Nickname Change • 💵 $numberSeparator[$splitText[4];,];
>>> Change Nickname for this server.;$var[inline]]
$addSelectMenuOption[buy;Nickname Change;item$var[n];;no;🏷️]
$endif
$var[n;partner]
$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$c[addField[🤝 Partner • 💵 $numberSeparator[$splitText[4];,];
>>> Join Bank Account with a user.;$var[inline]]
$c[addSelectMenuOption[buy;Partner;item$var[n];;no;🤝]
$endif



$addField[**SERVER SHOP**;`This contains bot items`;$var[inline]]


$var[n;1]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$getUserVar[item$var[n];$botID]£#@$getServerVar[item$var[n]];£#@]
$if[$splitText[4]!=]
$var[shop;$var[shop]($ • $)item$var[n]]
$endif
$var[n;$sum[$var[n];1]]

$textSplit[$var[shop];($ • $)]
$removeSplitTextElement[1]
$var[n;$calculate[$var[ppage]*5-4]]
$var[1item;$splitText[$var[n]]] $var[n;$sum[$var[n];1]]
$var[2item;$splitText[$var[n]]] $var[n;$sum[$var[n];1]]
$var[3item;$splitText[$var[n]]] $var[n;$sum[$var[n];1]]
$var[4item;$splitText[$var[n]]] $var[n;$sum[$var[n];1]]
$var[5item;$splitText[$var[n]]] $var[n;$sum[$var[n];1]]

$var[n;1]
$try
$textSplit[$getUserVar[$var[$var[n]item];$botID]£#@$getServerVar[$var[$var[n]item]];£#@]
$addField[$replaceText[$replaceText[$splitText[1];ITEM;<:icon_items:1042507464844771508>];ROLE;<:icon_role:1042507215711518783>] $splitText[3] $try@$roleName[$findRole[$splitText[2]]]$catch$splitText[2]$endtry • 💵 $numberSeparator[$splitText[4];,];$numberSeparator[$splitText[5];,] Remaining 
> $splitText[6]
** **;$var[inline]]
$addSelectMenuOption[buy;$try@$roleName[$findRole[$splitText[2]]]$catch$splitText[2]$endtry;$var[$var[n]item];;no;$replaceText[$replaceText[$splitText[1];ITEM;<:icon_items:1042507464844771508>];ROLE;<:icon_role:1042507215711518783>]]
$endtry
$var[n;$sum[$var[n];1]]

$try
$textSplit[$getUserVar[$var[$var[n]item];$botID]£#@$getServerVar[$var[$var[n]item]];£#@]
$addField[$replaceText[$replaceText[$splitText[1];ITEM;<:icon_items:1042507464844771508>];ROLE;<:icon_role:1042507215711518783>] $splitText[3] $try@$roleName[$findRole[$splitText[2]]]$catch$splitText[2]$endtry • 💵 $numberSeparator[$splitText[4];,];$numberSeparator[$splitText[5];,] Remaining 
> $splitText[6]
** **;$var[inline]]
$addSelectMenuOption[buy;$try@$roleName[$findRole[$splitText[2]]]$catch$splitText[2]$endtry;$var[$var[n]item];;no;$replaceText[$replaceText[$splitText[1];ITEM;<:icon_items:1042507464844771508>];ROLE;<:icon_role:1042507215711518783>]]
$endtry
$var[n;$sum[$var[n];1]]

$$try
$textSplit[$getUserVar[$var[$var[n]item];$botID]£#@$getServerVar[$var[$var[n]item]];£#@]
$addField[$replaceText[$replaceText[$splitText[1];ITEM;<:icon_items:1042507464844771508>];ROLE;<:icon_role:1042507215711518783>] $splitText[3] $try@$roleName[$findRole[$splitText[2]]]$catch$splitText[2]$endtry • 💵 $numberSeparator[$splitText[4];,];$numberSeparator[$splitText[5];,] Remaining 
> $splitText[6]
** **;$var[inline]]
$addSelectMenuOption[buy;$try@$roleName[$findRole[$splitText[2]]]$catch$splitText[2]$endtry;$var[$var[n]item];;no;$replaceText[$replaceText[$splitText[1];ITEM;<:icon_items:1042507464844771508>];ROLE;<:icon_role:1042507215711518783>]]
$endtry
$var[n;$sum[$var[n];1]]

try
$textSplit[$getUserVar[$var[$var[n]item];$botID]£#@$getServerVar[$var[$var[n]item]];£#@]
$addField[$replaceText[$replaceText[$splitText[1];ITEM;<:icon_items:1042507464844771508>];ROLE;<:icon_role:1042507215711518783>] $splitText[3] $try@$roleName[$findRole[$splitText[2]]]$catch$splitText[2]$endtry • 💵 $numberSeparator[$splitText[4];,];$numberSeparator[$splitText[5];,] Remaining 
> $splitText[6]
** **;$var[inline]]
$addSelectMenuOption[buy;$try@$roleName[$findRole[$splitText[2]]]$catch$splitText[2]$endtry;$var[$var[n]item];;no;$replaceText[$replaceText[$splitText[1];ITEM;<:icon_items:1042507464844771508>];ROLE;<:icon_role:1042507215711518783>]]
$endtry
$var[n;$sum[$var[n];1]]

$try
$textSplit[$getUserVar[$var[$var[n]item];$botID]£#@$getServerVar[$var[$var[n]item]];£#@]
$addField[$replaceText[$replaceText[$splitText[1];ITEM;<:icon_items:1042507464844771508>];ROLE;<:icon_role:1042507215711518783>] $splitText[3] $try@$roleName[$findRole[$splitText[2]]]$catch$splitText[2]$endtry • 💵 $numberSeparator[$splitText[4];,];$numberSeparator[$splitText[5];,] Remaining 
> $splitText[6]
** **;$var[inline]]
$addSelectMenuOption[buy;$try@$roleName[$findRole[$splitText[2]]]$catch$splitText[2]$endtry;$var[$var[n]item];;no;$replaceText[$replaceText[$splitText[1];ITEM;<:icon_items:1042507464844771508>];ROLE;<:icon_role:1042507215711518783>]]
$endtry
$var[n;$sum[$var[n];1]]










$addSelectMenuOption[buy;Get Premium;premium;;no;<a:diamond:1042520298945269900>]
$addField[**PREMIUM SHOP**;Run command `/get-premium`to subscribe.
>>> 💰 **Perks:**
1. Half cooldown for all the commands
2. `/marry` command and account partnership.
3. More money on earning commands.
4. More to come;$var[inline]]
$footer[Price : 1€ = 1 month, 2€ = 3 month and 5€ = Lifetime]

