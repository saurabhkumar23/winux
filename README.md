# winux

### what is winux?
- winux is a partial synchronous clone of commands available in bash but not in windows.

### wincat Command:
It reads data from the file and gives their content as output. It helps us to create, view, concatenate files.

#### 1) To view a single file 
##### Command:
    wincat filename

##### Output:
    It will show content of given filename

#### 2) To view multiple files  
##### Command:
    wincat file1 file2

##### Output:
    This will show the content of file1 and file2.

#### 3) Suppress repeated empty lines in output.  
##### Command:
    wincat -s test1.txt

##### Output:
    Will suppress repeated empty lines in output

#### 4) To view contents of a file preceding with line numbers.  
##### Command:
    wincat -n filename

##### Output:
    It will show content with line number
    example:- wincat -n test1.txt
    1 my name is saurabh
    2 I'm a web developer

#### 5) To view contents of a file preceding with line numbers to non-empty lines only.
##### Command:
    wincat -b filename

##### Output:
    It will show content with line numbers to non-empty lines only.
    example:- wincat -b test2.txt
    1 this is the content of test2 file.

    2 It contains lots of data.

#### 6) Create a file 
##### Command:
    wincat > newfile

##### Output:
    Will create and a file named newfile

#### 7) Copy the contents of one file to another file.  
##### Command:
    wincat [filename-whose-contents-is-to-be-copied] > [destination-filename]

##### Output:
    The content will be copied in destination file

#### 8) To append the contents of one file to the end of another file.   
##### Command:
    wincat file1 >> file2

##### Output:
    Will append the contents of one file to the end of another file

#### 9) To display the content of all text files in the folder.   
##### Command:
    wincat *.txt

##### Output:
    Will show the content of all text files present in the folder.

-----

### winwc Command:
It is used to find out number of lines, word count, characters count in the files specified in the file arguments. By default it displays four-columnar output. First column shows number of lines present in a file specified, second column shows number of words present in the file, third column shows number of characters present in file and fourth column itself is the file name which are given as argument.

#### syntax
    winwc [OPTION]... [FILE]...

#### 1) To prints all available options.
##### Command:
    winwc filename

##### Output:
    Passing only one file name in the argument.
        $wc state.txt
        5  7 63 state.txt

    Passing more than one file name in the argument.
    $ wc state.txt capital.txt
        5   7  63 state.txt
        5   5  45 capital.txt
        10  12 108 total

    Note : When more than file name is specified in argument then command will display four-columnar output for all individual files plus one extra row displaying total number of lines, words and characters of all the files specified in argument, followed by keyword total.

#### 2) To prints the number of lines present in a file.
##### Command:
    winwc -l filename

#### 3) To prints the number of words present in a file.  
##### Command:
    winwc -w filename

#### 4) To displays count of characters from a file. 
##### Command:
    winwc -m filename

#### 5) To print out the length of longest (number of characters) line in a file.
##### Command:
    winwc -L filename


-----

### wingrep Command:
The wingrep filter searches a file for a particular pattern of characters, and displays all lines that contain that pattern. The pattern that is searched in the file is referred to as the regular expression (grep stands for globally search for regular expression and print out). 

#### syntax
    wingrep [options] pattern [files]

Consider the below file as an input.

> wincat > file.txt

    unix is great os. unix is opensource. unix is free os.
    learn operating system.
    Unix linux which one you choose.
    uNix is easy to learn.unix is a multiuser os.Learn unix .unix is a powerful.

#### 1) Case insensitive search
##### Command:
    wingrep -i pattern filename

##### Input:
    wingrep -i "UNix" file.txt

##### Output:
    unix is great os. unix is opensource. unix is free os.
    Unix linux which one you choose.
    uNix is easy to learn.unix is a multiuser os.Learn unix .unix is a powerful.

#### 2) Checking for the whole words in a file
##### Command:
    wingrep -w pattern filename

##### Input:
    wingrep -w "unix" file.txt

##### Output:
    unix is great os. unix is opensource. unix is free os.
    uNix is easy to learn.unix is a multiuser os.Learn unix .unix is a powerful.

#### 3) Displaying the count of number of matches
##### Command:
    wingrep -c pattern filename

##### Input:
    wingrep -c "unix" file.txt

##### Output:
    2

#### 4) Show line number while displaying the output
##### Command:
    wingrep -n pattern filename

##### Input:
    wingrep -n "unix" file.txt

##### Output:
    1 unix is great os. unix is opensource. unix is free os.
    2 uNix is easy to learn.unix is a multiuser os.Learn unix .unix is a powerful.

#### 5) Matching the lines that start with a string
##### Command:
    wingrep ^pattern filename

##### Input:
    wingrep "^unix" file.txt

##### Output:
    unix is great os. unix is opensource. unix is free os.

#### 6) Matching the lines that end with a string 
##### Command:
    wingrep pattern$ filename

##### Input:
    wingrep "os.$" file.txt

##### Output:
    unix is great os. unix is opensource. unix is free os.