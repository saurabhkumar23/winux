# winux

### what is winux?
- winux is a partial synchronous clone of commands available in bash but not in windows.

### Wincat Command:
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