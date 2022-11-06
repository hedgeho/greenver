HOST = 'http://localhost:5000'


if (localStorage.getItem("product_id")) {
    fetch(`${HOST}/get_info?id=${localStorage.getItem("product_id")}`, {method: 'GET'})
        .then(res => res.json())
        .then(res => {
            let last_product_item = document.getElementsByClassName('ProductItem')
            last_product_item = last_product_item.item(last_product_item.length-1)

            const price = (0.8*parseFloat(res[0]['Price'].substring(0, res[0]['Price'].length-2))*localStorage.getItem('amount'))

            last_product_item.parentElement.insertBefore(
                get_return_product_row(res[0], localStorage.getItem('amount'), price.toFixed(2)),
                last_product_item.nextElementSibling)

            const subTotal = last_product_item.nextElementSibling.nextElementSibling.getElementsByClassName('SeparateColumn Money')[0]

            const oldTotalPrice = parseInt(subTotal.textContent.split(',')[0]) + parseInt(subTotal.textContent.split(',')[1].substring(0, 2))*0.01
            console.log(oldTotalPrice)
            console.log(price)
            subTotal.innerHTML = (oldTotalPrice - price).toFixed(2) + " €"
        })
}

function get_return_product_row(info, amount) {
    const return_product_row = document.createElement("tr")
    return_product_row.innerHTML =
        "<tr class=\"SeparateRow ProductItem\">\n" +
        "<td class=\"SeparateColumn AlignLeft AlignMiddle NoWrap\">" +
        "<input type=\"hidden\" name=\"LineItemID\" value=\"783663\">" +
        `<input class=\"ep-js ep-uiInput ep-uiInput-text ep-uiValidate ep-uiSpinner ep-uiSpinner-base\" data-js=\"\" name=\"Quantity\" value=\"${amount}\" size=\"4\" title=\"Quantity field of the order\" type=\"text\" style=\"padding-right: 25px;\">` +
        "<span class=\"ep-uiSpinner-unit\" style=\"margin-left: -25px;\">" +
        "<font style=\"vertical-align: inherit;\"><font style=\"vertical-align: inherit;\">pcs</font></font>" +
        "</span><span tabindex=\"0\" class=\"ep-uiInput ep-uiInput-button ep-uiSpinner-stepper ep-uiSpinner-stepper-base\">" +
        "<a href=\"javascript:;\" class=\"ep-uiSpinner-stepUp ep-uiSpinner-stepUp-base\" tabindex=\"-1\">" +
        "<font style=\"vertical-align: inherit;\"><font style=\"vertical-align: inherit;\">+</font></font></a><a href=\"javascript:;\" class=\"ep-uiSpinner-stepDown ep-uiSpinner-stepDown-base\" tabindex=\"-1\"><font style=\"vertical-align: inherit;\"><font style=\"vertical-align: inherit;\">–</font></font></a></span></td>\n" +
        "<td class=\"SeparateColumn AlignMiddle\">\n" +
        "<table class=\"productBasketImage\">\n" +
        "<tbody><tr>\n" +
        `<td class=\"AlignMiddle\"><img class=\"ThumbnailsInBasket\" src=\"${info['ImageURL']}\" alt=\"\" data-pagespeed-url-hash=\"3903608554\" onload=\"pagespeed.CriticalImages.checkImageForCriticality(this);\"></td>\n` +
        "<td class=\"AlignMiddle\">\n" +
        `<a href=\"?ObjectPath=/Shops/CronvallShop/Products/${info['Code']}\" style=\"color:green\"><font style=\"vertical-align: inherit;\"><font style=\"vertical-align: inherit;\">\n` +
        `${info['Name']}\n` +
        " </font></font></a>\n" +
        "<br>\n" +
        `<span class=\"ProductNo\"><font style=\"vertical-align: inherit;\"><font style=\"vertical-align: inherit;\">Product no.: ${info['Code']}</font></font></span>\n` +
        "<p class=\"SmallText DeliveryPeriodText\"><font style=\"vertical-align: inherit;\"><font style=\"vertical-align: inherit;\">Delivery time 3-6 days</font></font></p>\n" +
        "</td>\n" +
        "</tr>\n" +
        "</tbody></table>\n" +
        "</td>\n" +
        "<td class=\"SeparateColumn AlignMiddle Money\"><font style=\"vertical-align: inherit;\"><font style=\"vertical-align: inherit;\">\n" +
        `80% * ${info['Price'].substring(0, info['Price'].length-3)} € / kpl\n` +
        "</font></font></td>\n" +
        "<td class=\"SeparateColumn Money AlignMiddle\" style=\"display: none;\"></td>\n" +
        `<td class=\"SeparateColumn Money AlignMiddle\"><font style=\"vertical-align: inherit;\"><font style=\"vertical-align: inherit; color: green;\">-€${(0.8*parseFloat(info['Price'].substring(0, info['Price'].length-2))*amount).toFixed(2)}</font></font></td>\n` +
        "<td class=\"AlignCenter AlignMiddle\">\n" +
        "<button type=\"submit\" class=\"button-style-inherit ep-js ep-uiInput ep-uiInput-button\" data-js=\"\" form=\"RemoveItemFromBasketFormLineItemProduct_e73fb5cb5c10da23a17af23b40fea2a2\" name=\"Delete\" value=\"Poista kohde ostoskorista\" title=\"Remove the item from the shopping cart\"><span class=\"ep-sprite Icon TrashIcon\"></span><span class=\"extraTrash\"><font style=\"vertical-align: inherit;\"><font style=\"vertical-align: inherit;\">delete</font></font></span></button>\n" +
        "</td>\n" +
        "</tr>"
    return_product_row.className = "SeparateRow ProductItem"
    return return_product_row
}