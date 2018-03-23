import { binding, overlay } from '@aos/recon-reducers';
import autocomplete from '@aos/recon-reducers/autocomplete';
import storeLocator from '@aos/as-store-locator/src/storeLocator.jsx';
import textField from '@aos/as-textfield';
import { overlayClose } from '../overlayControls/overlayControls.jsx';
import inlineEditor from '../inlineEditor/inlineEditor.jsx';
import storeSearchErrorMsg from '../storeSearchErrorMsg/storeSearchErrorMsg.jsx';
import { shipping16, applestore16 } from '@aos/as-svgicons';

const clickApply = ({ store, state }, el, ev) => {
    state.isLoading = true;

    
};

const renderStoreLocatorOverlay = (context, id) => {
    const { store, globals: { assets, viewport } } = context;
    const { state } = context.initState(name, {
        isLoading: false
    });
    const deliveryContext = context.change("storeLocator");
    const submitting = deliveryContext.store._submitting;
    state.isLoading = state.isLoading && submitting;

    context.renderer.view.addToRoot(<div className="rs-overlay-container">
        {
            overlay.view(context.change("storeLocatorClicked"), {
                screen: viewport !== 'small',
                triggerSel: '#' + id + '-delivery-openStoreLocator',
                className: [
                    'as-overlay as-overlay-fixedwidth',
                    viewport === 'small' ? 'as-overlay-fullscreen' : ''
                ].join(' ')
            },
            <div className="as-store-locator as-storelocator-overlay-content">
                <div className="row rs-storelocator-searchsection">
                    <h2 className="rs-storelocator-header">{assets.storeLocatorHeader}</h2>
                    {deliveryContext.store.storeSearch ?
                        <div className={viewport === 'small' ?
                            "rs-storelocator-searchfield large-12" :
                            "rs-storelocator-searchfield large-offset-3"}>
                            <div>
                                {autocomplete.view(
                                    context.change('storeLocator.searchInput'),
                                    deliveryContext.store.
                                        retailStoreAutoComplete, {
                                        selectFirst: true,
                                        updateOnNavigation: true,
                                        highlightOnMatch: true,
                                        className: 'large-12',
                                        input: (
                                            storeLocatorOverlaySearch(context)
                                        )
                                    }
                                )}
                            </div>
                        </div> : ''
                    }
                </div>
                {
                    deliveryContext.store.isRsisErrorPresent &&
                        deliveryContext.store.isRsisErrorHeaderRequired
                        ? storeSearchErrorMsg.view(deliveryContext)
                        : deliveryContext.store.searchResults
                            ? storeLocator.view(deliveryContext,
                                {
                                    isDisplayOnly: true,
                                    onOverlay: true,
                                    storeDataAutom: 'bag-storeselector-store'
                                })
                            : ''
                }

                <div className="rs-storelocator-selectstore-section">{binding.view(
                    context.change("storeLocator.submitStore"),
                    { enabled: !(submitting && state.isLoading) },
                    <div className="large-6 rs-storelocator-selectstore-button">
                        <button
                            className={'button form-button' +
                                (submitting && !state.isLoading ? ' as-button-isloading' : '')}
                            data-autom="bag-storelocator-confirmstore">
                            <span aria-hidden="true">{assets.confirmStore}</span>
                            {!(submitting && !state.isLoading) ?
                                <span className="visuallyhidden">
                                    {assets.confirmStore}
                                </span>
                                : <span className="visuallyhidden">
                                    {assets.confirmingStoreA11y}
                                </span>
                            }
                        </button>
                    </div>
                )}</div>
                {overlayClose.view(context.change("storeLocatorClicked"))}
            </div>
            )}
    </div>
    );
};

const storeLocatorOverlaySearch = (context) => {
    const { store, state, globals: { assets, viewport } } = context;
    const deliveryContext = context.change("storeLocator");
    const submitting = deliveryContext.store._submitting;

    return <div className="form-element" data-trigger-context>
        {textField.view(
            context.change("storeLocator.searchInput"),
            {
                label: assets.storeLocatorLabel,
                type: 'text',
                errorType: 'submitvalid',
                inputClassName: 'form-icon-left',
                attrs: {
                    'data-trigger-return': "click .form-textbox-button",
                    'data-autom': 'bag-storelocator-input'
                }
            },
            [<div className={"form-icons-wrapper form-icons-wrapper-left " +
                "form-icons-focusable"}>
                <span className="form-icons form-icons-search15"></span>
            </div>,
            state.isLoading
                ? <div className="rs-inlineeditor-loading waitindicator waitindicator16-gray">
                    <span className="visuallyhidden">{assets.storeLocatorLabel}</span>
                </div>
                : binding.view(context.change("storeLocator.search"),
                    { enabled: !!deliveryContext.store.searchInput },
                    <button onClick={clickApply}
                        className="form-textbox-button"
                        data-autom="bag-storelocator-searchlink">
                        <span aria-hidden="true">{assets.searchStores}</span>
                        <span className="visuallyhidden">
                            {assets.storeLocatorSearchA11y}
                        </span>
                    </button>
                )
            ]
        )}
    </div>;
};

const pickup = (context, id) => {
    const { store: { pickup }, globals: { assets } } = context;
    return <div
        className="column small-12 large-5 as-icondetails rs-bag-delivery-pickup">
        <div className="as-icondetails-icon as-svgicon-container"
            innerHTML={applestore16} />
        <div className="as-icondetails-detail">
            {pickup.showPickupLabel
                ? <span className="as-icondetails-label">
                    {assets.pickupLabel}
                </span>
                : ''}
            {pickup.quote
                ? <span
                    className="as-icondetails-value"
                    innerHTML={pickup.quote}
                />
                : ''}
            {pickup.hasRemoveGiftMessageLink
                ? binding.view(context.change('removeGifting.remove'), {},
                    <button type="button"
                        className="as-buttonlink as-icondetails-value"
                        data-autom="bag-giftmessage-remove">
                        <span>{assets.remove}</span>
                        <span className="visuallyhidden">
                            {assets.giftMsgLabel}
                        </span>
                    </button>
                )
                : ''
            }
            {pickup.enableStoreSelectorLink ?
                binding.view(context.change('storeLocatorView'), {},
                    <button type="button" id={context.store.id + '-openStoreLocator'}
                        className="as-buttonlink as-icondetails-value"
                        data-autom="bag-seemorestores-link">
                        <span aria-hidden="true">{assets.seeMoreStoresLink}</span>
                        <span className="visuallyhidden">
                            {assets.warmPickupLabelA11y}
                        </span>
                    </button>)
                : ''
            }
        </div>
    </div>;
};

const delivery = (context) => {
    const { store, globals: { assets } } = context;
    const delivers = store.delivers;
    return (
        !store.isElectronic
            ? <div
                className="column small-8 large-5 as-icondetails rs-bag-delivery-delivers">
                <div className="as-icondetails-icon as-svgicon-container"
                    innerHTML={shipping16} />
                <div className="as-icondetails-detail">

                    {delivers.showDeliveryLabel
                        ? <span className="as-icondetails-label">
                            {assets.deliversLabel}{' '}
                        </span>
                        : ''}

                    {delivers.quote
                        ? <span className="as-icondetails-value">
                            {delivers.quote}
                        </span>
                        : ''}
                    <span className="as-icondetails-value">
                        {delivers.shipMethod ? assets.byLabel + delivers.quote : ''}
                    </span>
                </div>
            </div>
            : delivers.quote
                ? <div className="rs-bag-delivery-delivers">
                    <span className="rs-bag-delivery-egc">{delivers.quote}</span>
                </div>
                : ''

    );
};

const shipping = (context, id) => {
    const { store: { ships, lineDeliveryOptions }, globals: { assets } } = context;
    const shipMthodQuotes = ships.shipMethodQuote;
    return <div
        className="column small-12 large-5 as-icondetails rs-bag-delivery-shipping">
        <div className="as-icondetails-icon as-svgicon-container"
            innerHTML={shipping16} />
        <div className="as-icondetails-detail">
            <span className="as-icondetails-label">
                {ships.showShipLabel
                    ? assets.deliveryLabel
                    : ships.resolvedShipLabel}
            </span>
            {shipMthodQuotes.map(function (quote) {
                return (
                    <span className="as-icondetails-value">
                        {quote.date}
                        {' '}
                        {quote.postfix ? '- ' + quote.postfix : ''}
                    </span>
                );
            })}
            {ships.shipPromo
                ? <span className="as-icondetails-value">
                    {ships.shipPromo}
                </span>
                : ''}
            {lineDeliveryOptions && lineDeliveryOptions.address
                ? deliveryZipcodeLabel(context.change('lineDeliveryOptions.address'), id)
                : ''}
        </div>
    </div>;
};

const fulfillment = (context, id) => {
    const { store, globals: { assets, viewport } } = context;
    return (
        store.sthEnabled
            ? <div>
                <div className="row rs-bag-fulfillment-options">
                    {store.ships ? shipping(context, id) : ''}
                    {store.lineDeliveryOptions &&
                        store.lineDeliveryOptions.address &&
                        viewport === 'small'
                        ? <div className="column small-12">
                            {warmStateDeliveryWarmer(context.change('lineDeliveryOptions.address'))}
                        </div>
                        : ''
                    }
                    {store.delivers ? delivery(context) : ''}
                    {store.pickup ? pickup(context, id) : ''}
                    {store.storeLocator ? renderStoreLocatorOverlay(context, id) : ''}
                </div>
                {store.lineDeliveryOptions &&
                    store.lineDeliveryOptions.address &&
                    viewport !== 'small'
                    ? warmStateDeliveryWarmer(context.change('lineDeliveryOptions.address'), id)
                    : ''
                }
            </div>
            : <div
                className="column small-12 large-5 as-icondetails rs-bag-delivery-shipping">
                <div className="as-icondetails-icon as-svgicon-container"
                    innerHTML={shipping16} />
                <div className="as-icondetails-detail">
                    <span className="as-icondetails-label">
                        {assets.availableToShip}
                    </span>
                    <span className="as-icondetails-value">
                        {assets.deliveryDisabled}
                    </span>
                </div>
            </div>
    );
};

const deliveryZipcodeLabel = (context, id) => {
    const { store, globals: { assets } } = context;
    const { was } = store;

    return (
        was && was.postalCode !== '' ?
            <span className="as-icondetails-value">{assets.warmDeliveryLabel + ' '}
                {!store._editing
                    ? binding.view(context.change('edit'), {},
                        <button type="button"
                            id={id + '-enterzipcode'}
                            className="as-buttonlink"
                            data-autom="bag-zipcode-edit">
                            <span className="visuallyhidden">{assets.wasPostalCodeA11y}</span>
                            <span>{was.postalCode}Test</span>
                            <span
                                className="icon icon-after icon-chevrondown"
                                aria-hidden="true">
                            </span>
                        </button>
                    )
                    : ''}
            </span>
            : ''
    );
};

const warmStateDeliveryWarmer = (context, id) => {
    const { store, globals: { assets } } = context;
    return (
        store.was && store.was.postalCode
            ? inlineEditor.view(context, {
                input: 'postalCode',
                label: assets.taxZipCode,
                apply: 'calculate',
                applyText: assets.apply,
                applyTextA11y: assets.zipCodeA11y,
                applyDataAutom: 'bag-zipcode-apply',
                cancel: '_editing',
                cancelTextA11y: assets.zipCodeA11y,
                cancelText: assets.cancel,
                cancelDataAutom: 'bag-zipcode-cancel',
                inputDataAutom: 'bag-zipcode-input',
                triggerOpen: '#' + id + '-enterzipcode'
            })
            : ''
    );
};

const coldStateDeliveryWarmer = (context, id) => {
    const { store, globals: { assets } } = context;
    return (
        !(store.was && store.was.postalCode)
            ? <div>
                <p className="rs-bag-delivery-coldtitle">{assets.coldDeliveryTitle + ' '}
                    {!store._editing
                        ? binding.view(context.change('edit'), {},
                            <button type="button"
                                id={id + '-enterzipcode'}
                                className="as-buttonlink"
                                data-autom="bag-zipcode-edit-cold"
                                aria-controls={context.key}
                            >
                                <span aria-label={assets.coldDeliveryTitle}>
                                    {assets.taxZipCode}
                                </span>
                                <span className="icon icon-after icon-chevrondown"
                                    aria-hidden="true">
                                </span>
                            </button>
                        )
                        : ''
                    }
                </p>
                {
                    inlineEditor.view(context, {
                        input: 'postalCode',
                        label: assets.taxZipCode,
                        apply: 'calculate',
                        applyText: assets.apply,
                        applyTextA11y: assets.zipCodeA11y,
                        applyDataAutom: 'bag-zipcode-apply',
                        cancel: '_editing',
                        cancelTextA11y: assets.zipCodeA11y,
                        cancelDataAutom: 'bag-zipcode-cancel',
                        inputDataAutom: 'bag-zipcode-input',
                        cancelText: assets.cancel,
                        triggerOpen: '#' + id + '-enterzipcode'
                    })
                }
            </div>
            : ''
    );
};
const name = 'fulfillmentOptions';

const fulfillmentOptions = {
    name: name,
    components: [binding, inlineEditor, textField, storeLocator, storeSearchErrorMsg,
        autocomplete, overlay, overlayClose],
    reducers: { clickApply },
    view: (context, id) => {
        const { store, globals: { assets } } = context;
        return <div className="rs-iteminfo-child">
            <div className="row rs-iteminfo-child-content">
                <div className="rs-bag-fulfillment">
                    {store.lineDeliveryOptions && store.lineDeliveryOptions.address
                        ? coldStateDeliveryWarmer(context.change('lineDeliveryOptions.address'), id)
                        : ''
                    }
                    {
                        fulfillment(context, id)
                    }
                </div>
            </div>
        </div>;
    }
};

export default fulfillmentOptions;
