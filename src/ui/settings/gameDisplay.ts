import h from 'mithril/hyperscript'
import i18n from '../../i18n'
import settings from '../../settings'
import * as helper from '../helper'
// import { dropShadowHeader, backButton } from '../shared/common'
import {backButton, dropShadowHeader} from '../shared/common'
import {onPieceNotationChange} from '../shared/round/view/replay'
import redraw from '../../utils/redraw'
import formWidgets from '../shared/form'
import layout from '../layout'

export default {
  oncreate: helper.viewSlideIn,

  view() {
    const header = dropShadowHeader(null, backButton(i18n('gameDisplay')))
    return layout.free(header, renderBody())
  }
} as Mithril.Component

function toggleSquareCoordSettings(show: boolean) {
    const el = document.getElementById('square-coords-settings-list')
    if (el) {
        el.className = show ? 'open' : 'closed'
    }
}

function renderBody() {
  return [
    h('ul.native_scroller.page.settings_list.multiChoices', [
      h('li.list_item',
        formWidgets.renderMultipleChoiceButton('Magnified dragged piece', formWidgets.booleanChoice, settings.game.magnified)
      ),
      h('li.list_item',
        formWidgets.renderMultipleChoiceButton(i18n('pieceAnimation'), formWidgets.booleanChoice, settings.game.animations)
      ),
      h('li.list_item',
        formWidgets.renderMultipleChoiceButton(i18n('boardHighlights'), formWidgets.booleanChoice, settings.game.highlights)
      ),
      h('li.list_item',
        formWidgets.renderMultipleChoiceButton(i18n('pieceDestinations'), formWidgets.booleanChoice, settings.game.pieceDestinations)
      ),
      h('li.list_item',
        formWidgets.renderMultipleChoiceButton(i18n('boardCoordinates'), formWidgets.booleanChoice, settings.game.coords)
      ),
      h('li.list_item', [
               formWidgets.renderCheckbox('Coordinates on every square', 'squareCoords', settings.game.squareCoords.enabled, toggleSquareCoordSettings),
               h('ul#square-coords-settings-list', {class: settings.game.squareCoords.enabled() ? 'open' : 'closed'}, [
                   h('li.list_item.square-coords-opacity-setting', [
                       formWidgets.renderSlider(
                           'White opacity', 'whiteOpacity', 0, 100, 1, settings.game.squareCoords.whiteSquaresOpacity,
                           redraw
                       )]),
                   h('li.list_item.square-coords-opacity-setting', [
                       formWidgets.renderSlider(
                           'Black opacity', 'blackOpacity', 0, 100, 1, settings.game.squareCoords.blackSquaresOpacity,
                           redraw
                       )]),
                   h('li.list_item.square-coords-opacity-setting', [
                       h('div', {className: 'overlay-coordinates-sample-wrapper'}, [
                               h('div', {className: 'overlay-coordinates-sample board'}),
                               h('div', {
                                   className: 'overlay-coordinates-sample white-squares',
                                   style: {opacity: (settings.game.squareCoords.whiteSquaresOpacity() / 100).toString(10)}
                               }),
                               h('div', {
                                   className: 'overlay-coordinates-sample black-squares',
                                   style: {opacity: (settings.game.squareCoords.blackSquaresOpacity() / 100).toString(10)}
                               })
                           ]
                       )]
                   )]
               )
           ]),
      h('li.list_item',
        formWidgets.renderMultipleChoiceButton(i18n('moveListWhilePlaying'), formWidgets.booleanChoice, settings.game.moveList)
      ),
      h('li.list_item',
        formWidgets.renderMultipleChoiceButton(
          i18n('landscapeBoardSide'), [
            { label: i18n('positionLeft'), value: 'left' },
            { label: i18n('positionRight'), value: 'right' },
          ],
          settings.game.landscapeBoardSide,
        ),
      ),
      h('li.list_item',
        formWidgets.renderMultipleChoiceButton(
          i18n('pgnPieceNotation'), [
            { label: i18n('chessPieceSymbol'), value: true },
            { label: i18n('pgnLetter'), value: false },
          ],
          settings.game.pieceNotation,
        )
      ),
      h('li.list_item', [
        formWidgets.renderMultipleChoiceButton(i18n('zenMode'), formWidgets.booleanChoice, settings.game.zenMode),
      ]),
      h('li.list_item', [
        formWidgets.renderMultipleChoiceButton(i18n('blindfoldChess'), formWidgets.booleanChoice, settings.game.blindfoldChess),
      ])
   ])
  ]
}
