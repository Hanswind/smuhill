import requests
import json
import datetime
import time
import logging
import telegram
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackQueryHandler
from telegram import InlineKeyboardButton, InlineKeyboardMarkup


logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname) - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)


token = '821604164:AAExhkSPWgRv5aDVSh29zSaOJpmyIWHWcK8'




def build_button(text_list, callback_header = "") : # make button list
    button_list = []
    text_header = callback_header
    if callback_header != "" :
        text_header += ","

    for text in text_list :
        button_list.append(InlineKeyboardButton(text, callback_data=text_header + text))

    return button_list

def build_menu(buttons, n_cols, header_buttons=None, footer_buttons=None):
    menu = [buttons[i:i + n_cols] for i in range(0, len(buttons), n_cols)]
    if header_buttons:
        menu.insert(0, header_buttons)
    if footer_buttons:
        menu.append(footer_buttons)
    return menu
# 첫 시작
def start(bot, update):
   #사용자 name
    print(update.message.chat.username)
    t = ("안녕하세요 %s!, 상명대학교 챗봇입니다 " + "\n" + "아직 서비스 준비 중 입니다" + "\n" + "시작하려면 /test 를 눌러주세요.") % update.message.chat.first_name
    bot.sendMessage(chat_id=update.message.chat_id, text=t)

# 사용자가 반복하기 예상이외에 다른 답변을 했을 때, 처음 멘트로 제공
def echo(bot, update):
    print(update.message.chat.username)
    t = ("안녕하세요 %s!, 상명대학교 챗봇입니다 " + "\n" + "아직 서비스 준비 중 입니다" + "\n" + "시작하려면 /test 를 눌러주세요.") % update.message.chat.first_name
    bot.sendMessage(chat_id=update.message.chat_id, text=t)

def build_box(buttons, n_cols, header_buttons=None, footer_buttons=None):
    menu = [buttons[i:i + n_cols] for i in range(0, len(buttons), n_cols)]
    if header_buttons:
        menu.insert(0, header_buttons)
    if footer_buttons:
        menu.append(footer_buttons)
    return menu


# /test commend
def test(bot, update):
    t = "어떤 정보를 알고 싶으세요 ??"
    #bot.sendMessage(chat_id=update.message.chat_id, text=t)
    time.sleep(0.3)
    # image 값 입력
    bot.send_photo(chat_id=update.message.chat_id,
                   photo='https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Sangmyung_University.jpg/220px-Sangmyung_University.jpg')
    time.sleep(0.3)
    # 키보드에 대답 넣기
    time.sleep(0.3)
    button_list = build_button(["학교정보", "동아리", "학사일정", "취소"])  # make button list
    show_markup = InlineKeyboardMarkup(build_menu(button_list, len(button_list) - 1))  # make markup
    update.message.reply_text("어느 정보를 원하세요?", reply_markup=show_markup)  # reply text with markup

# callback

def callback_get(bot, update):
    data_selected = update.callback_query.data
    print("callback : ", data_selected)
    if update.callback_query.data == "학교정보":
        button_list = build_button(["학과정보", "각 부처 전화번호", "학교식당", "취소"])  # make button list
        show_markup = InlineKeyboardMarkup(build_menu(button_list, len(button_list) - 1))
        bot.edit_message_text(text="학교정보를 클릭하셨습니다. 어떤 정보를 원하세요?",
                              chat_id=update.callback_query.message.chat_id,
                              message_id=update.callback_query.message.message_id,
                              reply_markup=show_markup)

    if update.callback_query.data == "동아리":
        button_list = build_button(["학술동아리", "춤동아리", "봉사동아리", "취소"])  # make button list
        show_markup = InlineKeyboardMarkup(build_menu(button_list, len(button_list) - 1))
        bot.edit_message_text(text="동아리를 클릭하셨습니다. 어떤 동아리 정보를 원하세요?",
                              chat_id=update.callback_query.message.chat_id,
                              message_id=update.callback_query.message.message_id,
                              reply_markup=show_markup)

    if update.callback_query.data == "학사일정":
        bot.edit_message_text(text= "학사일정을 클릭하셨습니다.(추가예정)",
                        chat_id = update.callback_query.message.chat_id,
                        message_id = update.callback_query.message.message_id)

    if update.callback_query.data == "학술동아리":
        button_list = build_button(["SMUSC(코딩동아리)", "토론동아리", "취소"])  # make button list
        show_markup = InlineKeyboardMarkup(build_menu(button_list, len(button_list) - 1))
        bot.edit_message_text(text="학술 동아리를 클릭하셨습니다. 어떤 학술 동아리 정보를 원하세요?",
                              chat_id=update.callback_query.message.chat_id,
                              message_id=update.callback_query.message.message_id,
                              reply_markup=show_markup)

    if update.callback_query.data == "봉사동아리":
        button_list = build_button(["굿네이버스", "꾸러기방", "취소"])  # make button list
        show_markup = InlineKeyboardMarkup(build_menu(button_list, len(button_list) - 1))
        bot.edit_message_text(text="봉사 동아리를 클릭하셨습니다. 어떤 봉사 동아리 정보를 원하세요?",
                              chat_id=update.callback_query.message.chat_id,
                              message_id=update.callback_query.message.message_id,
                              reply_markup=show_markup)


    if update.callback_query.data == "SMUSC(코딩동아리)":
        button_list = build_button(["SMUSC(코딩동아리) 소개", "SMUSC(코딩동아리) 모집일정", "취소"])  # make button list
        show_markup = InlineKeyboardMarkup(build_menu(button_list, len(button_list) - 1))
        bot.edit_message_text(text=" SMUSC(코딩동아리) 클릭하셨습니다. SMUSC(코딩동아리)의 어떤 정보를 원하세요?",
                              chat_id=update.callback_query.message.chat_id,
                              message_id=update.callback_query.message.message_id,
                              reply_markup=show_markup)

    if update.callback_query.data == "SMUSC(코딩동아리) 소개":
        bot.edit_message_text(text="안녕하세요! 저희는 SMUSC라는 코딩동아리로 알고리즘을 전문적으로 공부하는 동아리 입니다. 자세한 문의는 SMUSC 오픈채팅에서 연락주세요 !",
                              chat_id=update.callback_query.message.chat_id,
                              message_id=update.callback_query.message.message_id)

    if update.callback_query.data == "SMUSC(코딩동아리) 모집일정":
        bot.edit_message_text(text="SMUSC(코딩동아리) 모집일정은 아직 미정입니다 ㅠㅠ ",
                              chat_id=update.callback_query.message.chat_id,
                              message_id=update.callback_query.message.message_id)

    if update.callback_query.data == "토론동아리":
        bot.edit_message_text(text="토론 동아리 준비 중",
                              chat_id=update.callback_query.message.chat_id,
                              message_id=update.callback_query.message.message_id)

    if update.callback_query.data == "굿네이버스":
        bot.edit_message_text(text="굿네이버스 준비 중",
                              chat_id=update.callback_query.message.chat_id,
                              message_id=update.callback_query.message.message_id)

    if update.callback_query.data == "꾸러기방":
        bot.edit_message_text(text="꾸러기방 준비 중",
                              chat_id=update.callback_query.message.chat_id,
                              message_id=update.callback_query.message.message_id)

    if update.callback_query.data == "학과정보":
        button_list = build_button(["인문사회과학대학", "사범대학", "경영경제대학","융합공과대학", "문화예술대학", "취소"])  # make button list
        show_markup = InlineKeyboardMarkup(build_menu(button_list, len(button_list) - 1))
        bot.edit_message_text(text="학과정보를 클릭하셨습니다. 어떤 단과대학교 정보를 알고 싶으세요?",
                              chat_id=update.callback_query.message.chat_id,
                              message_id=update.callback_query.message.message_id,
                              reply_markup=show_markup)

    if update.callback_query.data == "융합공과대학":
        button_list = build_button(["컴퓨터과학과", "전기공학과", "융합전자공학과", "생명공학과", "휴먼정보지능공학", "취소"])  # make button list
        show_markup = InlineKeyboardMarkup(build_menu(button_list, len(button_list) - 1))
        bot.edit_message_text(text="융합공과대학을 선택하셨습니다. 어떤 단과대학교 정보를 알고 싶으세요?",
                              chat_id=update.callback_query.message.chat_id,
                              message_id=update.callback_query.message.message_id,
                              reply_markup=show_markup)

    if update.callback_query.data == "컴퓨터과학과":
        button_list = build_button(["컴퓨터과학과 소개", "컴퓨터과학과 시험일정", "컴퓨터과학과 학생회소식", "취소"])  # make button list
        show_markup = InlineKeyboardMarkup(build_menu(button_list, len(button_list) - 1))
        bot.edit_message_text(text="컴퓨터과학를 선택하셨습니다. 어떤 단과대학교 정보를 알고 싶으세요?",
                              chat_id=update.callback_query.message.chat_id,
                              message_id=update.callback_query.message.message_id,
                              reply_markup=show_markup)
    if update.callback_query.data == "각 부처 전화번호":
        a = "교무처 전화번호 02-124-1345"
        b = "입학처 전화번호 02-124-1345"
        bot.edit_message_text(text=a+"\n"+b,
                              chat_id=update.callback_query.message.chat_id,
                              message_id=update.callback_query.message.message_id)

    if update.callback_query.data == "취소":
        bot.edit_message_text(text="취소하였습니다.",
                              chat_id=update.callback_query.message.chat_id,
                              message_id=update.callback_query.message.message_id)
        return



# error 처리
def error(bot, update, error):
    logger.warning('Update "%s" caused error "%s"', update, error)

# command & function 활성화 하기
def main():
    updater = Updater(token=token)
    dp = updater.dispatcher
    dp.add_handler(CommandHandler('start', start))
    #echo function은 Messagehandler
    dp.add_handler(MessageHandler(Filters.text, echo))
    #dp.add_handler(CommandHandler('beer', beer, pass_args=True))
    dp.add_handler(CommandHandler('test', test))
    dp.add_handler(CallbackQueryHandler(callback_get))

    # log all errors
    dp.add_error_handler(error)
    # polling시작, 걸리는 시간 최대치 정해줌 너무 낮은 경우는 poll이 제대로 작동이 안됨
    # clean=true 기존의 텔레그램 서버에 저장되어있던 업데이트 사항 지우기
    updater.start_polling(timeout=3)
    # idle은 updater가 종료되지 않고 계속 실행
    updater.idle()


if __name__ == '__main__':
    main()

