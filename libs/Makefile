
LIB_DIR = properties mysql 

ifeq ($(CYGWIN_BUILD),0)
LIB_DIR  +=      z image application
endif

ALL:
	for dir in $(LIB_DIR); do \
		make -C $$dir WEBSOCKETS_THREADS=$(WEBSOCKETS_THREADS) USE_SELECT=$(USE_SELECT) NO_VALGRIND=$(NO_VALGRIND) CYGWIN_BUILD=$(CYGWIN_BUILD) FRIEND_PATH=$(FRIEND_PATH); \
	done

install:
	for dir in $(LIB_DIR); do \
		make -C $$dir install FRIEND_PATH=$(FRIEND_PATH);\
	done

setup:
	for dir in $(LIB_DIR); do \
		make -C $$dir setup WEBSOCKETS_THREADS=$(WEBSOCKETS_THREADS) USE_SELECT=$(USE_SELECT) NO_VALGRIND=$(NO_VALGRIND) CYGWIN_BUILD=$(CYGWIN_BUILD) FRIEND_PATH=$(FRIEND_PATH); \
	done

clean:
	for dir in $(LIB_DIR); do \
		make -C $$dir clean FRIEND_PATH=$(FRIEND_PATH); \
	done

compile:
	for dir in $(LIB_DIR); do \
		make -C $$dir compile DEBUG=1 WEBSOCKETS_THREADS=$(WEBSOCKETS_THREADS) USE_SELECT=$(USE_SELECT) NO_VALGRIND=$(NO_VALGRIND) CYGWIN_BUILD=$(CYGWIN_BUILD) FRIEND_PATH=$(FRIEND_PATH); \
	done

release:
	for dir in $(LIB_DIR); do \
		make -C $$dir WEBSOCKETS_THREADS=$(WEBSOCKETS_THREADS) USE_SELECT=$(USE_SELECT) NO_VALGRIND=$(NO_VALGRIND) CYGWIN_BUILD=$(CYGWIN_BUILD) FRIEND_PATH=$(FRIEND_PATH); \
        done


