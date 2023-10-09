---
title: "[Study Note] Linux Essentials"
date: 2023-07-04T20:56
thumb: "linux.jpg"
tags: 
    - ❮Study Note❯
    - Linux
---

# 1. File Systems and Disk Management

## 1-1. File System
- A file system is a method that is used by an operating system to store, retrieve, organize, and manage files and directories on mass storage devices. 
    - A file system maintains information, such as the date of creation and modification of individual files, their file size, file type, and permissions. 
        - It also provides a structured form for data storage. 
    - A file system by itself does not interpret the data contained in files because this task is handled by specific applications.
- ext4 
    - The newest default file system for Linux distributions. 
    - It is backwards-compatible with the ext2 and ext3 file systems. 
    - Among ext4’s improvements over ext3 are journaling, support of volumes of up to one exbibyte (EiB), and files up to 16 TiB in size. 
    - Ext4 is the default filesystem for CentOS/RHEL 7 and Ubuntu installations. 
- swap
    - This is not a true file system, but rather is a portion of the hard disk that is used in situations when Linux runs out of physical memory and needs more of it. 
    - Linux pushes some of the unused files from RAM to “swap” to free up memory. 

### File System Label
- File system labels are assigned to file systems for easy identification.
    - The labels may be up to 16 characters long and can be displayed or changed using the `e2label` command.
    - The syntax for setting file system labels is `e2label /dev/{device name}{partition number} [label name]`. 
    - They can also be set using the `tune2fs -L [volume label] [device]` command.

### Journaling
- A journaling file system is a method that is used by an operating system to quickly recover after an unexpected interruption, such as a system crash. 
    - Journaling file systems can remove the need for a file system check when the system boots. 
    - By using journaling file systems, the system does not write modified files directly on the disk. 
        - Instead, a journal is maintained on the disk. 
    - The journaling file system process involves the following phases.
        1. The journal describes all the changes that must be made to the disk.
        2. A background process makes each change as and when it is entered in the journal.
        3. If the system shuts down, pending changes are performed when it is rebooted.
        4. Incomplete entries in the journal are discarded.
- A journaled file system works well with small files and small drives. 
    - With the growth of file and drive sizes, performance will suffer.
    - Some of the reasons for poor performance include
        - Filesystem recovery time after a power failure or improper shutdown
        - Bitmap method of tracking the filesystem
        - Wasted space and fragmentation


## 1-2. Partitions
- A partition is a section of the hard disk that logically acts as a separate disk. 
    - Partitions enable you to convert a large hard disk to smaller manageable chunks, leading to better organization of information. 
    - A partition must be formatted and assigned a filesystem before data can be stored on it. 
    - Partitions are identified using a partition table, which is stored in the boot record. 
        - The partition table can contain entries for a maximum of four primary partitions. 
        - The size of each partition can vary but cannot exceed the total free space of the hard disk.

### Partition Size
    - / 
	    - Minimum 1 GB. 
    - /boot
	    - 100 MB. 
    - swap 
	    - Double the RAM size. 
    - /var
	    - Minimum 250 MB. 
        - If the possibility of the installation of many applications exists in the future, allocate the appropriate size. 
    - /home
	    - Varies based on the number of users. 
    
### Disk Partitions
- Primary 
    - A disk partition that can contain one filesystem or logical drive and is sometimes referred to as volumes.
    - A maximum of four primary partitions are allowed. 
    - The swap filesystem and the boot partition are normally created in a primary partition. 
- Extended 
    - An extended partition can contain several filesystems, which are referred to as logical disks or logical drives. 
    - There can be only one extended partition, which can be further subdivided. 
    - This partition type does not contain any data and has a separate partition table. 
- Logical 
    - A part of a physical disk drive that has been partitioned and allocated as an independent unit and functions as a separate drive.
    - A logical partition is created within an extended partition. 
    - There is no restriction on the number of logical partitions, but it is advisable to limit it to 12 logical partitions per disk drive.

### Swap Space
- Swap space is a partition on the hard disk that is used when the system runs out of physical memory. 
    - Linux pushes some of the unused files from the RAM to the swap space to free up memory. 
    - Usually, the swap space equals twice the RAM capacity.
    - Types
        - Device swap 
	        - Device swap space is configured when you partition the hard disk.
            - It is used by the operating system to run large applications. 
        - Filesystem swap 
	        - Filesystem swap space is configured primarily when you install Linux. 
            - It is utilized by the operating system as an emergency resource when the available swap space runs out. 
        - Pseudo-swap 
	        - Pseudo-swap space allows large applications to run on computers with limited RAM. 
- Swap file
    - Created for storing data that is to be transferred from a system’s memory to a disk
    - It is dynamic and changes in size when data is moved in and out of the memory. 
    - It is used as a medium to transfer data from RAM on to the hard disk.
- Swap partition
    - A swap partition is an area of virtual memory on a hard disk to complement the physical RAM in the computer. 
    - Swap partitions are created by Linux because they perform better than swap filesystems.
- `mkswap`
    - The mkswap command is a system administration command that is used to create swap space on a disk partition. 
    - The syntax of the mkswap command is `mkswap [options] {device} {size}`. 
        - The device argument of mkswap is generally a disk partition, such as /dev/hda2 or /dev/sdb3, but it can also be a file.
- `swapon` and `swapoff`
    - A number of commands are used to manage swap partitions. The most important commands are swapon and swapoff.
    - `swapon`
	    - Used to activate a swap partition on a specified device. 
        - It provides a number of options for specifying devices. 
    - `swapoff`
	    - Used to deactivate the swap space on devices. 


## 1-3. Partition Management
- fstab
    - The fstab file is a configuration file that stores information about storage devices and partitions and where and how the partitions should be mounted.
    - The fstab file is located in the /etc directory. 
        - It can be edited only by a root user. 
    - The fstab file consists of a number of lines—one for each filesystem. 
        - Each line in an fstab file has six fields that are separated by spaces.
            - Device or partition name 
                - Specifies the name of the device or filesystem that has to be mounted. 
            - Default mount point 
                - Indicates where the filesystem has to be mounted.
            - Filesystem type 
                - Specifies the type of filesystem used by the device or partition. 
            - Mount options 
                - Specifies a set of comma-separated options that will be activated when the filesystem is mounted. 
            - Dump options 
                - Indicates if the dump utility should back up the filesystem. Usually, zero is specified as the dump option to indicate that dump can ignore the filesystem. 
- `fdisk`
    - fdisk is a menu-driven utility program that is used for creating, modifying, or deleting partitions on a disk drive. 
    - Using fdisk, a new partition table can be created, or existing entries in the partition table can be modified. 
        - The fdisk utility understands the DOS and Linux type partition tables. 
            - Depending on the partition table created, the DOS FDISK or the Linux fdisk program is invoked. 
        - The fdisk utility also allows you to specify the size of partitions.
    - The syntax of the fdisk utility is `fdisk [options] {device name}`.
- `mkfs`
    - The mkfs command is used to build a Linux filesystem on a device, which is usually a hard disk partition. 
    - The syntax of the mkfs command is `mkfs [filesystem type] [options] {device}`.
        - e.g. `mkfs.ext4 /dev/hda{partition number}`
- `mke2fs`
    - The mke2fs utility is used to create ext2, ext3, and ext4 filesystems, and it has various options. 
    - This command is a more specific version of the mkfs command described previously, that may be used to create ext2, ext3, and ext4 filesystems only. 
    - The syntax of the mke2fs utility is `mke2fs [options] {device}`.
        - e.g. The command `mke2fs -t ext4 /dev/sda{partition number}` will allow you to build an ext4 filesystem. 
            - WARNING: Running this command will format your disk, deleting all contents!

## 1-4. File System Management

### Mount Point
- A mount point is an access point to information stored on a local or remote storage device. 
    - The mount point is typically an empty directory on which a filesystem is loaded, or mounted, to make the filesystem accessible to users. 
    - If the directory already has content, the content becomes invisible to the users until the mounted filesystem is unmounted.
    - Note: You can use the /etc/fstab file to list the filesystem to be mounted and unmounted when the Linux system boots and shuts down, respectively.
- `mount`
    - In Linux, a file system cannot be accessed directly. 
        - It has to be associated with a directory to make it accessible to users. 
        - This association is brought about by loading, or mounting, the filesystem in a directory by using the mount command.
    - Options
        - auto 
            - Specify that the device has to be mounted automatically. 
        - noauto
	        - Specify that the device need not be mounted automatically.
        - user 
	        - Specify that all users can mount a device or a filesystem. 
        - nouser
	        - Specify that only the root user can mount a device or a filesystem. 
        - exec 
	        - Allow binaries in a filesystem to be executed. 
        - noexec
	        - Prevent binaries in a filesystem from being executed. 
        - ro
	        - Mount a filesystem as read-only. 
        - rw
	        - Mount a filesystem with read and write permissions.
        - sync
            - Specify that input and output operations in a filesystem should be done synchronously. 
        - async
	        - Specify that input and output operations in a filesystem should be done asynchronously.      
- `unmount`        
    - After using the file system, it needs to be disassociated from the directory by unloading, or unmounting, the file system using the umount command.

### Checkup and Repair
- `fsck`
    - The fsck command is used to check the integrity of a file system. 
        - File system integrity refers to the correctness and validity of a file system. 
        - Most systems automatically run the fsck command at boot time so that errors, if any, are detected and corrected before the system is used.
        - File system errors are usually caused by power failures, hardware failures, or improper shutdown of the system.
        - Note: The fsck command is similar in concept to the chkdsk and scandisk commands you may be familiar with from DOS and Windows-based systems.
    - The syntax of the fsck command is `fsck -t {filesystem type} [options]`.
    - You can use the `fsck -r/dev/{filesystem}` command to repair a file system. 
        - The command will prompt you to confirm your actions. 
        - If you are simultaneously checking multiple file systems, you should not use this option because it allows you to repair only a single file system at a time.
- `e2fsck`
    - The e2fsck command allows you to check ext2, ext3, and ext4 file systems.
        - It is identical to running the fsck command with ext2, ext3, or ext4 specified as the file system type. 
        - You need to unmount the file system before running the e2fsck command to prevent damage to the file system.
    - The syntax of the e2fsck command is `e2fsck /dev/{filesystem}`.
- `xfs_repair`
    - The xfs_repair command allows you to check an XFS file system. 
    - As with the fsck and e2fsck commands, you need to unmount the file system before running the xfs_repair command to prevent damage to the file system.
    - The syntax of the xfs_repair command is `xfs_repair [options]/dev/{filesystem}`.

### Tuning
- `tune2fs`
    - The tune2fs utility helps tuning parameters associated with a Linux file system. 
        - The tune2fs utility is available with most Linux distributions.
        - Using this utility, a journal can be added to an existing ext2 or ext3 file system. 
            - If the file system is already mounted, the journal will be visible in the root directory of the file system. 
            - If the file system is not mounted, the journal will be hidden. 
    - You can adjust the parameters of the extended file systems, such as ext2, ext3, and ext4, that can be tuned on a Linux machine even after installation. 
        - Tunable parameters allow you to,
            - Remove reserved blocks alter reserved block count
            - Specify the number of mounts between checks
            - The time interval between checks
            - The behavior of the kernel code
            - etc.
    - The syntax of the tune2fs utility is `tune2fs [options] {device name}`.
- `xfs_admin`
    - The xfs_admin command allows you to manage the parameters of an XFS file system. 
        - As with the tune2fs command, you need to unmount the file system before using the xfs_admin command to change parameters.
    - The syntax of the xfs_admin command is `xfs_admin [options] /dev/{filesystem}`.
- `dumpe2fs`
    - The dumpe2fs utility is used for managing ext2, ext3, and ext4 (extended) file systems. 
        - It dumps the status of the extended file system onto the standard output device and prints the block group information for the selected device.
    - The syntax of the dumpe2fs command is `dumpe2fs [options] [block size] {device name}`.
- `debugfs`
    - The debugfs utility allows you to examine and modify ext2, ext3, and ext4 file systems. 
    - When executed, the debugfs utility opens an interactive shell that can be used to examine and modify the extended file system.
- Tools for xfs file system
    - xfs_info
	    - Display details about the XFS file system. 
    - xfs_metadump
	    - Copy the metadata information of the XFS file system to a file. 
    - xfs_grow
	    - Expand the XFS file system to fill the disk size. 
    - xfs_repair
        - Repair and recover a corrupt XFS file system. 
    - xfs_db
	    - Debug the XFS file system.

## 1-5. Backup and Restore

### Archiving
- `tar`
    - The tar command allows you to create archives of data.
        - Files archives made with tar frequently have the .tar file extension.
        - By default it does not compress. However, it does compress the resulting archive with gzip with `-z` option.
    - You can use the command on previously created archives to extract files, store additional files, update files, and list files that were already stored. 
    - The tar command can also direct its output to available devices, files, or other programs using pipes.
    - The syntax of the tar command is `tar [options] [files | directories]`.
- `tar -xvf`
    - The command tar -xvf will restore the entire contents of the source file or directory structure. 
    - To restore a portion of a tar file, use the path and name of the file you wish to extract. 
        - You must use the exact path and name that was used when you created the tar file. 
    - You can also make restores interactive by using the command `tar -wxvf [destination] [source]`.

### Compression
- `gzip`
    - GNU zip (gzip) is a compression utility that reduces the size of selected files. 
        - Files compressed with gzip frequently have the .gz file extension. 
    - The syntax of the gzip command is `gzip [options] [file name]`
    - Options
        - `-d`: Decompresses the file. 
        - `-f`: Forces compression or decompression of a file even if it has multiple links or if the file exists. 
        - `-r`: Descends into the directory and compresses files recursively. 
        - `-v`: Displays the name and percentage reduction of the compressed or decompressed file. 
        - `-t`: Checks the compressed file for integrity. 
- `zip`
    - Most Linux distributions also include a zip command which may be used to compress files in the ZIP archive format.
- `unzip`
    - The unzip command is used to list, test, and extract compressed files in a ZIP archive. 
    - The syntax of the unzip command is `unzip [options] [file name] -d [directory]`.
    - Note: The unzip command extracts all files from the specified ZIP archive into the current working directory.
- File compression utilities, such as gzip, attempt to compress only regular files and ignore symbolic links. 
- Compressed files can be restored to their original form using `gzip -d`, `gunzip`, or `zcat`. 
- If the original file name saved in the compressed file is not suitable for its filesystem, a new name is provided from the original one.

### Dump & Restore
- `Dump`
    - The dump command “dumps” all files in a filesystem into a tape or another file. 
    - It can also be used to dump files modified after a specified date. 
    - The syntax of the dump command is `dump [-level #] -f [file] [filesystem/file/directory]`.
    - Options
        - `-0`: Make a full backup. 
        - `-1` to `-9`: Make incremental or partial backups.
        - `-b [maximum block size]`: Specify the number of kilobytes per dump record. 
        - `-f [location of the target file]`: Specify the target location. 
        - `-z [compression level]`: Specify the compression level in the range 1 to 9.
- `Restore`
    - The restore command enables you to restore files or filesystems from backups made using the dump command.
    - This command can be used across networks to restore data.
    - Options
        - `-C`: Compare the backup file with the source file. 
        - `-i`: Run the restore command in restore mode to restore backups partially. 
        - `-r`: Perform a complete recovery of the backed up files. 
        - `-f [/location of the backup file]`: Specify the location of the backup file. 

---

# 2. User Account Management

## 2-1. User Account
- A user account is a collection of information that defines a user on a system. It is the representation of the user on a computer. 
    - User account information includes the username, a password for the user to log in to the system, groups to which the user belongs, and rights and permissions that the user has to access the system and its resources.
    - When an account is created, it is assigned a unique number that is called a User ID (UID). Usernames and UIDs should be unique. That is, there should never be two users with the same name or UID on one computer.
- Default user accounts
    - Numerous user accounts are created by default upon system installation.
        - e.g. root, bin, daemon, ftp, sshd, nfsnobody, apache, rpc, gnome

### Password
- When you create a user account, you should immediately set a password for the user using the passwd command. 
    - In Linux, if a password is not set for the user account, the account gets locked automatically. This is to help prevent unauthorized access to the system.
- If you enter a password that is a real word made up solely of alphabetic characters, you will get a bad password message stating that it is based on a dictionary word. 
    - However, the password will still be assigned even though the message is displayed. It is strongly advised that you change it to a more secure password.
- When you add a new user, information about the user is saved in the /etc/passwd file. 
    - e.g. Test:x:1005:1005:Test User,3,333-555-444,:/home/Test:/bin/bash
        - A colon is used as a delimiter for each field. 
- There are various fields in the /etc/passwd file.
    - User name
        - Stores the user name with which the user logs in to the system. It is recommended to limit user names to eight alphanumeric characters. 
    - Password 
	    - Was used to store the password that is assigned to the user in an encrypted form. 
        - An “x” indicates that the encrypted password is stored in the /etc/shadow file.
    - User ID 
        - Stores the unique number that is assigned to each user. Linux tracks users by the UID rather than the user name. 
    - Group ID 
        - Group ID (GID) of the user’s primary group.
        - Stores the unique number that is assigned to each group. Users can be members of one or more groups. 
    - Comment field
        - Information in the comment field is separated by commas in the format: 
            - Full Name, Room, Home Phone, Work Phone, Other.
	    - Stores the real full name of the user. 
    - Home directory 
	    - Displays the default directory where the user is placed after logging in. 
    - Login shell 
	    - Displays the default shell that is started when the user logs in. 
        - The absolute path of the command shell that will be available to the user. 

### Shadow Passwords
- In earlier UNIX and UNIX-like systems including Linux, each user’s password is stored and encrypted in the /etc/passwd file. 
    - This file needs to be readable, which makes copies of users’ encrypted passwords easily obtainable to any person trying to attack the system. 
    - Then, by using various techniques, the attackers can decipher passwords. 
- Modern distributions have overcome this problem by using shadow passwords by default. 
    - Shadow passwords store the encrypted passwords in a separate highly protected file, the /etc/shadow file. 
    - This file is readable only by the root user. Therefore, it is less of a security risk compared to the /etc/passwd file because it becomes difficult for attackers to access the file, obtain the user passwords, and then decipher them. 
    - The /etc/ passwd file also contains the account or password expiration values.

### Groups
- A group is a collection of system users having the same access rights. 
    - In Linux, users can be members of one primary group and multiple supplemental groups.
        - Every user must be a member of a group. 
        - Users can also be members of more than one group. 
- Group membership is used to limit access to files and system resources. 
- A User Private Group (UPG) is a unique group that is created by default whenever a new user account is created. 
    - This is the primary group of the new user account. Only the new user is a member of this group.
- Groups, like users, are identified by a system with a unique number known as GID. 
- `/etc/group`
    - The /etc/group file contains a list of groups, each on a separate line. Each line consists of four fields for attribute definition, separated by colons. The /etc/group file is also called the group database.
        - Note: The /etc/gpasswd file stores the encrypted passwords for groups.
    - Group name 
	    - Stores the name of the group. 
    - Group password 
	    - Stores the password of the group in an encrypted form. 
    - GID 
        - Stores the group identifier; similar to a UID for groups. The default GID value is 500. 
    - Members 
	    - Stores the names of the members of the group separated by commas.

### User Profile
- Global user profile
    - A global user profile is a set of options, preferences, bookmarks, stored messages, attributes, permissions, and other user items that users have access to, on whichever system they log in to.
    - Global user profiles are stored on the server. 
        - Each time a user logs in, data in the global profile is copied to the local system. 
        - While the user is logged in, any changes made to the settings affect only the local copy of the profile.
- Skeleton directory
    - The `/etc/skel` directory contains files and directories that are automatically copied over to a new user's home directory when such user is created by the useradd program. 
        - When a user is removed from the system by an administrator with the userdel command, that user's home directory, including the files and directories that have been copied into it from /etc/skel, remains intact.
    - Several user configuration files are placed in /etc/skel by default when the operating system is installed. 
        - e.g. .bash_profile, .bashrc, .bash_logout, dircolors, .inputrc and .vimrc.
    - It is usually better to keep /etc/skel as small as possible and put system-wide configuration items into global configuration files such as /etc/profile. 
        - This is because the latter makes it much easier to update existing users' files because its settings take effect as soon as the system is turned on and apply to new users and old uses alike.  

## 2-2. Manage User Accounts

### Check User Information
- `id`
    - The id command is used to display UID and group ID (GID) information. 
    - Entering the command with no options displays information about the user who is currently logged in. 
    - You can also specify a username as an option to display ID information about a specific user.
- `finger`
    - The finger command is used to display information about users, including login name, real name, terminal name, write status, idle time, login time, office location, and office phone number. 
        - Some of these fields may be empty if no information was included when the user account was created. 
    - You can also view information about a specific user by entering `finger [user name]`.
    - Many distributions of Linux do not have the finger command installed by default. 
        - To add support for finger use the `sudo apt install finger` command.

### Add Users
- `useradd`
    - The useradd command is used to add a new user to the operating system. You need to specify the username along with the command to create a new user account. 
    - The syntax of the useradd command is `useradd [options] [username]`.
    - When you create a user using the useradd command, it creates the user with the username specified. It also creates a user private group with the same name as the username specified.  
        - It does not set a password for the user, and it does not create a home directory for the user.
    - Special User Accounts
        - Special user accounts are required to run processes associated with certain services. 
            - e.g. daemon is a user account that is used to run the daemon service.
        - In special user accounts, the UID value for the users will be less than the default UID value, which is 500. 
            - Such special users will not have a home directory. 
        - You can create a special user account using the `useradd -r [special user name]` command.
- `useraddcommand`
    - If you want to create a user, the user private group, and the user’s home directory and set a password for the user, you should use the addusercommand. 
    - The syntax for the addusercommand is `adduser [options] [username]`.
- Adding User Accounts by Editing the Password File
    - Linux allows you to add user accounts by directly editing the /etc/passwd file which contains a list of all user accounts. 
        - However, this is not recommended because you may damage your system if you accidentally leave something out or alter existing user accounts. 
        - If the system is damaged, nobody will be able to log in — not even the root user. 
            - In such a case, you will have to reinstall your system and redefine the user accounts.

### Delete Users
- `userdel`
    - The userdel command allows you to modify the system account files, deleting all entries that refer to the login of an existing user. 
    - However, it will not allow you to remove an account if the user is currently logged in.
        - You must kill any running processes that belong to an account before deleting the account.
    - The syntax of the userdel command is `userdel [options] [username]`.

### Modify Users
- `usermod`
    - The usermod command has options that enable you to modify various user account parameters. You can change a user’s name, default groups, UID, or passwords. 
    - The syntax of the usermod command is `usermod [options] [username]`.
    - Options
        - `usermod -l [new username] [old username]`
	        - Modify the login name of the user. 
        - `usermod -c “First Last” username`
            - Modify the user’s full name. 
        - `usermod -f [number of days] [login]`
            - Modify the number of days for a password to expire and to disable the account permanently. 
        - `usermod -u [new unique user ID] [login]` 
            - Modify the numerical value of a user’s ID, which has to be unique. 
        - `usermod -d [new login directory] login`
	        - Modify the user’s default home directory. 
        - `usermod -L [user name]`
            - Lock the password and suspend the user account temporarily. 
                - However, if the user has some other authentication method configured, they will still be able to log in.
        - `usermod -U [user name]`
            - Unlock the password. 
        - `usermod -e [yyyy-mm-dd] [user name]`
            - Change the expiration date for the user account. 
            - After the expiration date, the account will be disabled. 
            - Expired accounts can be re-enabled by setting a new expiration date. 
            - If you use “” as the expiration date, the account will be enabled indefinitely with no expiration date. 
                - e.g. `usermod -e “” user` 
            - If you use 1 as the expiration date, the account will immediately expire and be disabled. 
                - e.g. `usermod -e 1 user`
        - `usermod -G [group name] [user name]`
            - Adds the user to the specified group.

### Change User Password
- `passwd`
    - You can change the password of your user account using the passwd command. 
    - You cannot change the password for any other user account because the password command does not allow you to specify any other username. 
    - Only the root user can change the password for other users by specifying the username with the passwd command.
    - The root user can create a password for a user by entering `passwd [user name]`, where [user name] is the name of the user for whom the password is set.

### Change User Password Policies
- `chage`
    - The chage command is used to change a number of settings that relate to the password and status of the user account.
    - The syntax of the chage command is `chage [options] [username]`.
    - When you run the chage command with no options, it will prompt you to set:
        - Minimum Password Age
	        - The minimum number of days that must pass after the user has changed their password before they are allowed to change it again. 
            - The default is 0 which means Minimum Password Age is disabled.
        - Maximum Password Age
            - The maximum number of days the user may use a password before they must change it. 
            - The default is 99999 which is over 200 years. Effectively, this means the Maximum Password Age is disabled.
        - Last Password Change
	        - The date on which the user last changed their password.
        - Password Expiration Warning
            - The number of days before the Maximum Password Age is reached when the user should be warned that their password is going to expire. 
                - This reminds the user to change the password a week before the Maximum Password Age is reached.
        - Password Inactive
            - This setting indicates whether the password is inactive. 
            - The default is -1 which means the password is not inactive. If the value is set to 1, the password is inactive and the account is disabled.
        - Account Expiration Date
            - The last date the account can be used. After the account expiration date has passed, the account is disabled.
    - Options
        - `chage -d [yyyy-mm-dd] [user name]`
	        - Sets the date of the last password change to the date specified. 
        - `chage -E [yyyy-mm-dd] [user name]`
            - Sets the date when the account should expire.
        - `chage -m [number] [user name]`
	        - Sets the Minimum Password Age to the number of days specified. Specifying zero will allow the user to change their password immediately.
        - `chage -M [number] [user name]`
            - Sets the Maximum Password Age to the number of days specified. Specifying 99999 will set the password to never expire.
        - `chage -I [number] [user name]`
            - Sets the number of days the account will be inactive after the password expires. 
            - During the inactive period, the user can use the expired password to log in to change the password. After the inactive period expires, the user will not be able to change their own password to reactivate the account.
        - `chage -W [number] [user name]`
            - Sets the warning period to the number of days specified. The user will be warned this number of days in advance of the password expiration date that they should change their password.
        - `chage -l [user name]`
	        - Lists the password aging information for the specified user.

### Lock User Login
- In Linux, you can lock a user’s login to temporarily prevent a user from logging in to a system. 
    - This is done by disabling the user’s password using the `passwd -l` or `usermod -L` command.
- The user’s login is usually locked as a security measure, to prevent unauthorized usage when the user is unavailable.

### Manage Groups
- `groupadd`
    - The groupadd command allows you to add a group without creating a new user.
    - The syntax of the groupadd command is `groupadd [group name]`.
        - e.g. To add a new group to the system with a name of print_users and a GID of 700, enter `groupadd -g 700 print_users` at the command line.
    - You can also use the `groupmod -a -G [group] [username]` command to add users to the group.
        - As with users, the group file can be directly edited to add groups. However, using the command is a better option as it avoids unnecessary errors that may occur by directly editing the file.
- `groupdel`
    - The groupdel command deletes a group from the system. 
    - The syntax of the groupdel command is `groupdel [group name]`.
- `groupmod`
	- Change the group's name and the numerical value of the group's ID by modifying the system account files. 
    - The syntax of the groupmod command is `groupmod -g [GID]`.

---

# 3. Permissions and Ownership

## 3-1. Permissions
- Permissions are access rights assigned to users, which enable them to access or modify files and directories. 
- Permissions can be set at different levels and for different access categories. 
    - The `ls -l` command can be used to view the permissions of a file.
        - The ls -l command gives you a long list of the files and directories in your current working directory. Each item in the list contains seven columns. The contents of the columns are described in the following table.
            - Permission string
                - This identifies if the item is a file or directory, the user, group, and other permission assignment, and the access method. 
            - Number of links
                - Files generally have a link count of 1. 
                - For directories, the link count is the number of directories under it plus 2.
                    - 1 for the directory itself and 1 for the parent. 
                - Links are similar to Windows shortcuts.
                    - They point to the location where the file exists and allow you to access and view the file. 
            - The owner of the file or directory
            - The group to which the owner of the file belongs
                - All members of this group have the group permission listed in the permission string. 
                - The administrator adds users to a group so that permissions can be assigned to the group instead of to each user. 
            - The size (in bytes) of the file or directory
            - The date and time the file was created or last modified.
            - The file or directory name. 
    - Use the `ls -ld [directory name]` command to list directory entries of the specified directory. The contents of the directory will not be displayed.

### Permission String
- The first character indicates the type of file
    - d for directory and hyphen(-) for file.
- Characters at the second, third, and fourth positions denote permissions of the owner or user of the file or directory.
- Characters at the fifth, sixth, and seventh positions denote group permissions.
- Characters at the eight, ninth, and tenth positions denote permissions for others.
- The final character indicates the access method for the file.
    - Period (.) for SELinux security context 
    - Plus (+) for any other combination of alternate access methods

### Effective Permissions
- Effective permissions are the permissions the subject actually has to the object in a particular situation.
- In Linux, effective permissions are calculated as follows:
    - If the user is the user or owner listed on the file or directory, 
        - The user has the effective permissions of the permissions listed in the user portion of the permission string.
    - If the user is not the owner or user listed on the file but is a member of the group listed on the file, 
        - The user has the effective permissions of the permissions listed in the group portion of the permission string.
    - If the user is not the owner or user listed on the file, and is not a member of the group listed on the file,
        - The user has the effective permissions of the permissions listed in the other portion of the permission string.

### Access Categories
- Access categories in Linux permissions decide how Linux interprets the permissions of a file.
    - If a user’s UID matches the permissions of the file, the user level permissions are applied.
    - If the GID of the user matches the permissions, group permissions are granted. 
    - If neither of the permissions match, the general permissions for others are applied. 
- The symbols for the access categories are listed in the following table.
    - u 
	    - Modifies permissions at user level. 
    - g 
	    - Modifies permissions at group level. 
    - o 	
        - Modifies permissions for other users. 
    - a 
        - Modifies permissions for all users globally.

## 3-2. Modify Permissions
- `chmod`
    - The chmod command enables you to modify default permissions of a file or directory. Only the owner of the file or the system administrator can change the permissions of the file or directory.
    - The syntax of the chmod command is `chmod [options] [mode] [file name]`.
    - Options
        - `-c`
	        - Reports changes that are made in permissions. 
        - `-f` 
	        - Hides most error messages. 
        - `-v` 
	        - Displays a diagnostic entry for every file processed. 
        - `-R` 
	        - Modifies permissions of files and directories recursively. 
- chmod modes
    - Character mode 
        - `chmod [options] [access categories] [operators][permission levels] [file name or directory name].`
            - e.g. 
                - `chmod u+w, g-x, o+x example.txt`
                - `chmod u=rw, g=rx, o=r example.txt`
        - The character mode allows you to set permissions using three components,
            - Access categories such as u/g/o/a
            - Operators
                - `+` grants permissions. 
                - `-` denies permissions. 
                - `=` 
                    - Causes the permissions assigned to overwrite other existing permissions.
                    - Assigns permissions similar to those of the reference file.
            - Permission attributes
                - r (read) 
                - w (write) 
                - x (execute) 
                    - Run a file, if it is an executable program and is combined with the read attribute.
    - Numeric mode 
        - `chmod [number] [file name]`
            - e.g. `chmod 763 example.txt`
        - The numeric mode is represented by three-digit octal values.
        - By adding the octal numbers for the permissions you want to grant, you get the overall permission number to assign to a directory or file. 
            - Full permissions (read, write, and execute) are equivalent to 4 + 2 + 1, or 7. 
            - Read and write permissions are equivalent to 4 + 2, or 6. 
            - Complete permissions are expressed as a three-digit number, where each digit corresponds to the user, the group, and other permissions, respectively.
- `umask`
    - The umask command automatically alters the default permissions on newly created files and directories. 
        - The default permissions on newly created files and directories can be changed for security reasons.
            - umask affects only the current shell environment.
                - On most Linux distributions, the default system-wide umask value is set in the *pam_umask.so* or */etc/profile* file.
            - If you want to specify a different value on a per-user basis, edit the user’s shell configuration files such as *~/.bashrc*. 
        - Default permissions apply only to files and directories created AFTER the execution of the umask command.
    - The syntax of the umask command is `umask [octal values to 'mask' the default permission]`
        - If you enter umask without specifying any numbers, the command shows the current umask value.
        - The numbers given with the umask command specify the permissions that need to be cleared from the default settings.
            - The first digit allows you to protect the directory by setting advanced permissions. 
            - The other three digits allow you to set the normal permissions.
    - e.g. 
        - By default, the base permissions for directories in Linux are rwxrwxrwx or 0777. 
        - By entering `umask 0022`, the permissions assigned to all directories, created from that moment until the system is restarted, will be rwxr-xr-x (0755).

## 3-3. File Ownership
- File Owner
    - A file owner is the user who creates a file or directory. The file owner can set permissions to specify whether other users or groups have rights to read, write, or execute the file.

### Modify Ownership
- `chown`
    - The chown command can be used to change the owner, the group, or both for a file or directory. 
    - `chown [user name] [file name]`
	    - Changes the owner but not the group.
    - `chown [user name]:[group name] [file name]` 
        - Changes the owner and the group.  
    - `chown [user name]: [file name]` 
	    - Changes the owner and the group. 
        - The group will be changed to the specified user's login group.
    - `chown :[group name] [file name]`
        - Changes the group but not the owner. 
        - This is the same as using the `chgrp` command. 
    - You can combine the chown command with the `-R` option to recursively change ownership through a directory structure. 
    - You can also use metacharacters to change ownership of groups of files at the same time. 
    - By default, the root account has permission to change ownership. 
        - If logged in with a user account, you may need to use the `sudo` command with the chown command.
- `chgrp`
    - The chgrp command is used to change the group ownership of a file or directory. 
    - The syntax of the command is `chgrp [group name] [filename]`.
        - e.g. `sudo chgrp root example.txt`

## 3-4. Special Permissions
- SetUID
    - When the Set User ID (SUID), or setuid, is set, the file is always executed with the permissions of the owner or user listed on the file regardless of which user attempts to execute the file. 
        - A lower case “s” in the user permission string indicates that the SUID has been set and the user has the execute permission. 
        - An upper case “S” indicates that the SUID has been set but the user does not have the execute permission.
- SetGID
    - When the Set Group ID (SGID), or setgid, is set on a file, the file is always executed with the permissions of the group listed on the file regardless of which group attempts to execute the file. 
        - If the SGID is set on a directory, any files created in the directory will have their ownership set to the ownership of the directory.
- Sticky Bit
    - This permission does not affect files. It only affects directories. 
    - At the directory level, it restricts file deletion. 
        - Only the owner of a file (or the root user) can delete files in directories with the sticky bit set. 
    - The sticky bit appears as a lower case “t” in the place where normally the execute permission for others would appear in the permission string, at the tenth character, if the directory had the execute permission set for others. 
    - It appears as an upper case “T” in the tenth character if the directory did not have the execute permission set for others.
- Immutable Flag
    - The immutable flag is an extended attribute of a file or directory that prevents it from being modified. 
    - The immutable flag is not set on all files. 
        - It is set only on those files, such as configuration files, that should not be modified. 
    - A single directory can have a mix of mutable and immutable files and subdirectories. 
    - An immutable subdirectory can have mutable files.

## 3-5. Attributes
- `lsattr`
    - The lsattr command is used to list the attributes of a file on a Linux filesystem.
    - The syntax of the lsattr command is `lsattr [ -RVadv ] [file names]`
    - Options
        - `-R`
            - Recursively list the attributes of directories and their contents. 
        - `-V` 
            - Display the program version. 
        - `-a` 
            - List all files in directories. 
        - `-d` 
	        - List directories like files, instead of listing their contents. 
        - `-v` 
            - List the version number of the file. 
- `chattr`
    - The chattr command is used to change the attributes of a file on a Linux filesystem.
    - The syntax of the chattr command is `chattr [-RV] [-v version] [mode][file names]`.
    - Options 
        - `-R`
	        - Recursively change the attributes of directories and their contents. 
        - `-V` 
	        - Display the output of the chattr command and print the program version. 
        - `-v [version]` 
            - Set the version number of a file. 
- Mode strings
    - A mode string consists of an operator and one or more attributes.
    - The syntax of the mode string is `[operator][attribute]`
    - Operator
        - `+` 
            - Attributes listed are added to the file.
        - `-`
            - Attributes listed are removed from the file.
        - `=`
            - The attributes listed are added; any attributes omitted will be removed.
    - Attribute
        - a, A, c, C, d, D, e, i, j, s, S, t, T, u

---

# 4. System Operation

## 4-1. System Components

### Bootloader
- Boot Loader is a program that loads the kernel so that Linux and other operating systems can boot.
    - During the installation of Linux, the boot loader you choose will be put on the Master Boot Record (MBR). 
    - This is a part of the hard drive where the computer can look for an operating system when it boots. 
    - GRand Unified Bootloader (GRUB) is the Linux boot loader that loads and starts the kernel. 
        - Only one boot loader can be used on a system.

### System Initialization
- System initialization begins when a system is booted. 
    - It involves the loading of the operating system and its various components, including the boot process. 
    - System initialization is carried out by the init program in Linux. 
        - The init program refers to the configuration file and initiates the processes listed in it. 
        - This prepares the system to run the required software. 
    - Programs on the system will not run without system initialization. 
- The init.d directory found in the /etc directory stores initialization scripts for services. 
    - These scripts, called system V scripts, control the initiation of services in a particular runlevel. 
        - These runlevels are called system V runlevels. 
    - The scripts are invoked from the /etc/inittab file when the system initialization begins, using the symbolic links found in the file.
    - System V scripts are highly flexible and can be configured according to the needs of a user. 
        - Some of the services listed in the init.d directory are anacron, cups, and bluetooth.
- The syntax for running scripts of the services in the /etc/init.d directory is `/{service name} {start|stop|status|restart}`.

### Init 
- Init is the first process run on boot and is responsible for managing the runlevel of your system. 
    - The init is the system and session manager. 
    - In Ubuntu, the init is called the Upstart Init Daemon.
- Upstart Init Daemon 
    - Upstart Init Daemon is event-based, not runlevel-based.
        - Event-based means that jobs will be automatically started and stopped by changes to the system’s state. 
        - The Upstart Init Daemon doesn’t track runlevels. 
            - Runlevels are tracked by the runlevel event generated by `telinit` or `shutdown`. 
    - The init daemon sets two environment variables from the runlevel event: RUNLEVEL and PREVLEVEL. 
        - These environment variables are the current runlevel and the previous runlevel. 
    - Upstart’s list of configuration files is located in the /etc/init directory.
- systemd Init Daemon
    - systemd is a system and session manager used in some distributions of Linux, including Ubuntu. 
    - Its job is to start the rest of the system. 
        - If daemons and services were instruments in an orchestra, systemd would be the conductor.
- `systemctl`
    - The systemctl command enables control over the Systemd Init process. You can,
        - View running services
        - Manage (enable/disable) services to run at boot or in the current session
        - Determine the status of these services, and manage the system runlevel
    - The syntax of the systemctl command is `systemctl [options] [command]`.

### Runlevels
- The runlevel specifies the group of processes that are started, stopped, and otherwise managed on Linux systems. 
    - You can change the current runlevel by using the `telinit` command.
- Runlevels
    - 0 
	    - poweroff.target
        - Halts the system 
    - 1 
	    - rescue.target
	    - Single-user mode 
    - 2 
        - multi-user.target
	    - Multiuser mode without networking 
    - 3 
	    - multi-user.target
        - Multiuser mode with networking 
    - 4
        - multi-user.target
	    - User configurable 
    - 5 
        - graphical.target
	    - Used for the GUI (X11 multiuser mode) 
    - 6 
        - reboot.target
	    - Reboots the system

### Service
- A Linux service is an application or set of applications that perform tasks in the background. 
    - The services running on a Linux system range from basic services to server services. 
    - Services can be broadly classified as critical services and noncritical services. 
        - Critical services are the core services that are vital for the functioning of the Linux system. 
        - Noncritical services are services that are initiated by applications installed on the system.
- `service`
    - The service command allows you to manage services running on your system. 
    - The syntax of the service command is `service [service name] [options]`.

### Daemons
- A daemon is a program that runs in the background without the need for human intervention, often handling commands delivered for remote command execution. 
    - It lies dormant until an event triggers it into activity. 
    - Some daemons operate at regular intervals. 
    - Most daemons are started when the system boots. Daemons are started by the operating system, by applications, or manually.
- There are slight differences between services and daemons, but in practice they are usually the same thing. 
    - The term “service” is the only word used to describe these background applications in Microsoft Windows. 
    - The term “daemon” is exclusively used in Unix and Linux.
- e.g. lpd
    - The Line Printer Daemon, or lpd, controls the flow of print jobs to a printer. 
    - It works in the background and sends the output to the printer without affecting other processes that a user is working on at that time.

### systemd
- The purpose of an init system is to initialize the components that must be started after the Linux kernel is booted (traditionally known as “userland” components). 
    - The init system is also used to manage services and daemons for the server at any point while the system is running.
- systemd
    - systemd is a suite of basic building blocks for a Linux system. 
        - It provides a system and service manager that runs as PID 1 and starts the rest of the system, the target of most actions are “units”, which are resources that systemd knows how to manage. 
        - Units are categorized by the type of resource they represent and they are defined with files known as unit files. 
        - The type of each unit can be inferred from the suffix on the end of the file.
    - For service management tasks, the target unit will be service units, which have unit files with a suffix of .service. 
        - However, for most service management commands, you can actually leave off the .service suffix, as systemd is smart enough to know that you probably want to operate on a service when using service management commands.
- `systemctl`
    - `systemctl enable [service]`
	    - Enable a service to be started on boot. 
    - `systemctl list-unit-files`
	    - List configured system services and their boot configuration. 
    - `systemctl disable [service]`
        - Disable a service so that it is no longer started on boot. 
    - `systemctl start [service]` 
        - Start (activate) a service immediately. 
    - `systemctl stop [service]`
	    - Stop (deactivate) a service immediately. 
    - `systemctl restart [service]`
	    - Restart a service immediately. 

### Shutdown
- `shutdown`
    - The shutdown command is used to turn off a system. 
        - After certain installations or removal of hardware, it is necessary to shut down the Linux system. 
        - This closes files and performs other tasks necessary to safely shutdown the system. 
        - It warns all users that the system is going to shutdown and no one can log in after the command is issued. 
    - When you need to restart your Linux system, you should use the shutdown command with the appropriate options. 
    - The syntax of the shutdown command is `shutdown [-t seconds] [- options] time [warning message]`.
        - The -t option specifies how many seconds to wait before changing to another runlevel. 
    - Options
        - `-k`
            - Send warning messages to everyone, but does not really shutdown the system. 
        - `-r` 
	        - Reboot the system after shutdown. 
            - Upon reboot, if you are using a boot manager to load various operating systems, you can switch to another operating system or log in to Linux. 
        - `-h` 
	        - Halt the system after shutdown. At this point, you can safely turn off the power. 
        - `-n` 
	        - Shutdown the system without invoking init. 
            - It is recommended not to use this option. 
        - `-f` 
	        - Skip the filesystem check on reboot. 
        - `-F` 
            - Force the filesystem check on reboot. 
        - `-c` 
            - Cancel a shutdown in progress. 
            - This option does not use the time parameter, but can use the warning message option. 

## 4-2. Multitasking
- Multitasking
    - A method of allowing the operating system to run concurrent programs simultaneously without degrading system performance.
    - Multitasking enables several programs to share the same system resources. 
    - Processes spawned by multitasking are all active at the same time. 
        - They are not in a sequence or a suspended state waiting to be run. 
        - Processes placed in a multitasking state remain active until completed, unless terminated or suspended by the user. 
    - One or more users may run multiple tasks on a system.

## 4-3. Processes
- Process
    - A process is an instance of a running program that performs a data processing task. 
    - A process consists of a sequence of steps stored on a system.
        - These steps convert input data to output data. 
    - Processes can be subdivided into threads. 
    - Every process is assigned a unique Process ID (PID) and includes time limits, shared memory, or child processes. 
        - Process ID
            - Whenever a process is started, the system allocates a unique PID to identify the process. 
            - Every process inherits the User ID (UID) and Group ID (GID) of the user who starts the process. 
                - This is similar to the ownership of files and directories on the Linux filesystem.
    - Processes may run in the foreground or background of the system.
        - Foreground Processes
            - A foreground process is a program with which a user interacts at a particular time. 
            - Only one foreground process can be run at a time. 
                - As the user switches between programs, whatever program the user is interacting with becomes the foreground process. 
            - A foreground process is initiated by entering a command at the prompt or by clicking a shortcut in the Graphical User Interface (GUI).
        - Background Processes
            - A background process is a program that is not running in the foreground. 
            - Background processes enable Linux to run multiple processes at the same time. 
            - While the user is interacting with the foreground process, any number of programs can run as background processes. 
                - The shell does not have to wait for one process to end before it can run more. 
            - A process can be run in the background by adding an ampersand (&) separated by a space to the end of the command.
- The init Process
    - The first process, called init in Linux, is started by the kernel at boot time and never terminates. 
    - The PID of the init process is always 1. 
    - In modern Linux systems, the init is often systemd.
- Daemons
    - Daemons always run as background processes that never require user input. 
    - Other processes remain in the background temporarily, while the user is busy with the current foreground process.
- The Program and Process Relationship
    - A program is a set of instructions describing how to carry out a task. 
        - A command that resides on your system is a program.
    - When you enter a command at the prompt, a set of instructions perform a task. 
        - A process is a program that executes instructions. 
        - The operating system creates a process to carry out that task.
    - Processes have unique identities and exist until their tasks are completed. 
        - When the task is completed, the process is terminated.

### Process Table
- The process table is a record that summarizes the current running processes on a system. 
    - It enables the administrator to keep track of all processes run by different users. 
    - Some of the details displayed in the process table include the PID, the size of the program in memory, the name of the user who owns the process, and time.
- `ps`
    - The ps command invokes the process table. 
    - Different options may be used along with the command to filter the displayed fields or processes.
    - When the command is run without any option, it displays the processes run by the current shell with details such as,
        - PID
        - The terminal associated with the process
        - The accumulated CPU time
        - The command that started the process
        - etc.
    - The syntax of the ps command is `ps [options]`.
        - Note: Unlike many commands in Linux, the ps command supports options with and without a hyphen before them. 
            - However, the function of the same options with or without a hyphen may differ greatly.

### Process States
- A process state enables you to identify the current stage of a process. 
    - It is indicated by a single letter notation in the process table.
- States
    - Uninterruptible sleep (D) 
        - The process is permanently inactive. 
    - Running (R) 
        - The process may be running or ready to be run. 
    - Interruptible sleep (S) 
        - The process is waiting to be run after some specific trigger. 
    - Stopped (T) 
        - The process may be temporarily stopped by a job control tool or because it is being traced. 
    - Dead (X) 
        - The process has been killed. This state is never displayed. 
    - Defunct (Z) 
        - The process has ended, but only after its parent process. This implies that it has not been killed properly and it will remain as a “zombie.” 

### Child Process
- A process created by a running process is called a child process. 
- The process table contains both parent processes and child processes. 
    - There may be several levels of processes. 
- The parent process can spawn a child process, the child process can spawn another child process, and so on. 
- The parent process must be running for the child processes to run. Parent processes are assigned a unique Parent Process ID (PPID).
- Identifying child processes is not an easy task, especially if there are multiple processes and child processes running at the same time. 
    - By examining the order of the PIDs, you may be able to determine the order in which the processes were created and infer which processes are related.

### Process Analysis
- `pstree`
    - The pstree command enables you to list the processes running on a Linux system in a tree-like format. 
        - This helps you track parent and child processes. 
    - All processes are listed as child processes to init and this is represented by the initial branching. 
        - The processes started within a shell will branch out of the shell’s parent process.
- Process identification commands enable you to extract information about a process using its name or some other attribute associated with it.
    - `pidof`
	    - Displays the PID of the process whose name is specified and can be used only when the name of the process is known. 
            - However, it is recommended that a full path name of the process be given because more than one process could run with the same name. 
        - The syntax of this command is `pidof [options] {string}`.
            - Options
                - `-s`
                    - Instruct the program to display only one PID. 
                - `-c`
                    - Instruct the program to display the PIDs that are running from the same root directory. 
    - `pgrep`
	    - Displays the PID of processes that match any given criteria such as the name or UID of the user who invoked it, the start time, the parent PID, and so on. 
        - The syntax of this command is `pgrep [options] {process name}`. 
            - Options
                - `-f`
	                - Specify the full path name of the process. 
                - `-l`
                    - Print the name of the process along with its PID. 
                - `-u {userid}`
                    - Specify the UID of the user who started it.
                - `-G {groupid}`
	                - Specify the GID related to the process. 
                - `-n`
                    - Specify the most recent process. 
                - `-o`
	                - Specify the oldest process.

### Process Kill and Signals
- Kill commands
    - `kill`
        - Sends any specified signal, or by default the termination signal, to one or more processes. 
        - The PID must be specified as the argument. 
        - Note: The kill command accepts either the PID or the job number as an argument. 
                - This command can also be used as a job control tool.
        - When you use the kill command with the jobs table, you are working only with the jobs that you started. 
            - However, the process table may display processes that do not belong to you. 
                - As a user, you can use the kill command only with processes that you own. 
                - As root, you can kill anyone’s processes.
        - The syntax of this command is `kill [options] {PID}`. 
    - `pkill`
        - Signals processes based on the name and other identifiers as in the pgrep command. 
        - The syntax of this command is `pkill [options] {command}`.
    - `killall`
        - Kills all processes by the name specified. 
        - The syntax of this command is `killall [options] {command}`.
- Signals are messages sent to a process to perform certain actions. 
    - They are used to suspend or terminate processes. 
    - Signals may affect only the process specified and its child processes. 
    - Signals may be executed, caught, blocked, or ignored by processes.
- Kill signals
    - There are many options available with the kill command and these options are referred to as kill signals.
        - You can either use the kill signal option or its corresponding numerical value to send a signal to terminate a process. 
        - Some processes cannot be eliminated by the kill command. 
            - To terminate these processes, use the kill command with the -9 signal. This terminates the processes immediately.
    - Options
        - `SIGKILL` or `9` 
            - Send the kill signal to a process. 
        - `SIGTERM` or `15` 
            - Send the termination signal to a process. 
        - `SIGSTOP` or `19` 
            - Stop a process.

### Process Management
- `top`
    - The top command lists all tasks running on a Linux system. 
        - It acts as a process management tool by allowing users to prioritize, sort, or terminate processes interactively. 
        - It displays a dynamic process status, reflecting real-time changes. 
    - Different keystrokes within this tool execute process management actions.
        - Enter 
	        - Refreshes the status of all processes. 
        - Shift + n
	        - Sorts tasks in the decreasing order of their PID. 
        - u 
	        - Displays processes belonging to the user specified at the prompt. 
        - k 
	        - Terminates the process for which you specify the PID. 
        - n 
	        - Renices the process for which you specify the PID. 
        - h 
	        - Displays a help screen. 
        - q 
	        - Exits the task list.
- `nice`
    - The nice command allows you to assign a priority level to a process. 
        - The priority of a process is often called its nice value.
            - The nice value of a process indicates how “nice” the process is to others in sharing system resources.
            - The niceness of a process may range from -20 to 19, where -20 indicates the highest priority and 19 the lowest. 
            - By default, all processes in Linux have a nice value of zero.
        - In the absence of an increment value, the nice command assumes an increment of 10 by default.
        - Once lowered, the priority for any process cannot be increased by normal users, even if they own the process. 
    - You can run a command at a priority higher or lower than the command’s normal priority. 
    - You must have the root user authority to run a command at a higher priority. 
    - The syntax of the command is `nice -n {priority} [command]`, where the priority is specified by a number.
- `renice`
    - The renice command enables you to alter the scheduling priority of a running process. 
    - When you renice a process group, it causes all processes in the process group to have their scheduling priority altered. 
    - When you renice a user, it alters the scheduling priority of all processes owned by the user. 
    - By default, the processes affected are specified by their PIDs.
    - The syntax of the renice command is `renice {priority} {PID} [[-g] [groupid]] [[-u] [userid]]`.

## 4-4. Jobs
- A job is a process that the shell is managing and hasn't finished running.
    - Each job is assigned a sequential job ID.
    - Because a job is a process, each job has an associated PID.

### Job Status
- Running 
    - An active job. 
- Stopped 
    - A job that is suspended. 
- Terminated 
    - A job that is killed. 
- Done 
    - A completed job. 

### Jobs Table
- `jobs`
    - You can display the jobs table using the jobs command. 
    - The jobs table is a table containing information about jobs running in the background. 
    - It contains entries only for those jobs that are running in the current shell. 
    - The jobs table contains a numeric label for each job indicating the order in which the jobs were started. 
        - In addition, the jobs table includes,
            - A plus sign (+) to designate the current or the most recently started job.
            - A minus sign (-) to designate the job that was started just prior to the most recent job.
        - It also includes the status and name of each job.
            - Note: The job name listed in the jobs table is the command that initiated the job. 
                - The plus (+) and minus (-) signs indicate only the order in which jobs are started. 
                - All jobs, however, are run simultaneously.
- Jobs in a New Shell
    - Any job that a user placed in the background will appear in that user’s jobs table, but other users’ jobs will not appear. 
    - If you were to start a new shell, the jobs table for the new shell will be empty. 
        - However, the jobs started in the previous shell will continue to run.

### Process Table vs. Jobs Table differences
- The process table can display all processes running on the system irrespective of which user started it, including system processes started automatically at boot time. 
    - However, the jobs table shows only the processes started in a user’s current shell. 
- The unique PIDs of processes are displayed in the process table.
    - While the jobs table shows only their job number according to the order in which they were started. 
- In the jobs table, only the original process is displayed as an entry.
    - But in the process table, the original process and all subsequent processes that were started are displayed. 
    - So, a single entry in the jobs table may have more than one corresponding entry in the process table. 
- Certain job control commands can be applied only by referring to processes by their job number.
- The process table has options that are different from the jobs table. 

### Job Handling
- Suspend
    - Suspend a job via,
        - Foreground: press Ctrl+Z
        - Background: Bring to foreground, then press Ctrl+Z
    - If you display the jobs table after you press Ctrl+Z to suspend a job, you will see that the current job is in a suspended state.
        - It will be labeled in the jobs table as “Stopped”.
    - Although the jobs table lists jobs running in the background, a foreground job that gets suspended appears in the jobs table to remind the user that there is a suspended job waiting to be restarted or terminated. 
- Terminate
    - Terminate a job via,
        - Foreground: press Ctrl+C
        - Background: `kill %[job number]`
- Send the specified process to the background (or restart the suspended background process)
    - `bg %[job number]`
        - This can be used to restart a specified background job that has been suspended as well.
        - If there is only one job running in the background, then you do not have to specify the number. 
            - You can type `bg %` to restart it.
- Bringing the specified process to the foreground
    - `fg %[job number]`
        - Bring a job from the background to the foreground
        - You do not have to enter a number after the percent sign if there is only one job running in the background.

### Delayed Jobs
- A delayed job is one that can be run at some specified time after you issue the command. 
    - e.g. a CPU-intensive job that can slow down the system is one that you may want to delay for off-peak work hours.
- `sleep`
    - To delay the start of a job, use the `sleep` command followed by the delay in seconds and the command name. 
    - The sleep command suspends any action upon the specified command for the specified number of seconds and then the command specified is executed. 
        - The delay can be up to 2,147,483,647 seconds. This is roughly 596,523 hours; 24,855 days; or 68 years so that the amount of time can easily be customized. 
- `at`
    - The at command executes a given set of commands at a specified date and time. 
        - This command is useful for executing a set of commands only once. 
        - Using either the `-f` option or input redirection, the at command reads the list of commands from a file. 
            - This file needs to be an executable shell script. 
    - The syntax of the at command is `at [options] {time}`.

### Detached Jobs
- A detached job is a job that can be set to run after you log out of the system.
    - If you have a task that cannot be completed until after you leave work, or if you have a task that is CPU-intensive and may slow the system, you can start the task before you leave and specify that it continues even after you log out of the system.
        - e.g. a task that will not be completed until after you leave can be set to continue running after you log out of the system.
- `nohup`
    - The nohup command tells a program to ignore the hangup signal that was sent while disconnecting.
        - The nohup command should run in the background so that it does not tie up your terminal. 
        - The *nohup.out* file stores the output of the nohup command, which will normally be displayed on the terminal.
    - To enable a command to run in the background after you have logged out, use the syntax `nohup [command] &`.
- `screen`
    - The screen command is another way that you can leave work running after you leave the system, which can then be resumed at a later point by reconnecting to your active screen session.
        - The screen command will continue to keep the interactive shell open and run your program in the background so that it does not tie up your terminal. 
    - When you next connect to your server, you can restore the active screen session via the `screen -r` command.
    - Note: The screen command is not installed by default. To install it, use the `sudo apt install screen` command.

### Cron and Cronjobs
- Cron 
    - Cron is a daemon that runs in the background on a Linux system and executes specified tasks at a designated time or date. 
    - Cron is normally used to schedule periodically executed tasks defined in the crontab file.
        - Under the */etc* directory, you will find directories such as,
            - cron.d
            - cron.hourly
            - cron.daily
            - cron.weekly
            - cron.monthly
        - Depending on the frequency of the execution of bash script, you need to place your script file in the corresponding directory. 
            - If you want to run a shell script for a frequency other than hourly, daily, weekly, or monthly, you need to place the script in the cron.d directory.
    - The syntax of the cron daemon is `cron [option] {mail command}`.
- Cronjobs
    - A task scheduled via cron is called a cron job. 
        - These jobs will run either at system level or at user level. 
        - The cron jobs that you create for users are stored in the */var/spool/cron/[user name]* file. 
        - System default cron jobs are stored in the */etc/crontab* file. 
        - Only a root user can add system level jobs
    - Scheduling a cron job is accomplished by adding the job to the system-wide */etc/crontab* file. 
        - The crontab file may also contain environment variables that will be passed to the commands at the time of execution. 
        - Jobs in the crontab file are called entries, and they include a time description, the user name to run the command, and the command.
            - The format of a crontab entry is: `{minute} {hour} {day of month} {month} {day of week} {user command}`. 
            - In addition to specifying a particular time and day, a pattern can be described by using asterisks (*) to specify all of a particular field. 
                - e.g. an asterisk in the minute field indicates that the command should be carried out every minute. 
            - In addition to asterisks, time ranges are permitted by separating values with a dash (-) and lists of values are specified by separating values with a comma (,).
- System crontab file
    - System crontab files are the configuration files for the cron utility. 
        - They are stored in the */etc/crontab* file. 
        - System crontab files can be edited by the root user.
    - The name of the user running the command is indicated in the sixth field of the file. 
        - When you create a crontab entry for a specific user, the sixth field contains the command that needs to be run at the specified time.
- User crontab file
    - Individual users can schedule cron jobs. 
        - Unlike the system-level crontab, users have their own crontab files. 
    - The format of entries in this file is the same as that of the system-level crontab, with the exception of the user field. 
        - Because the entire crontab file is dedicated to a single user, the user field is not included. 
    - While the /etc/crontab file can be edited directly, user crontab files are best edited via the crontab utility.
- Anacron
    - Anacron is a daemon that executes jobs at intervals, which are specified in days, without requiring the system to be running continuously.
    - Anacron is used to control the execution of daily, weekly, or monthly jobs.
    - The */etc/anacrontab* file is the configuration file for the anacron utility.
        - This file has four fields. 
            - The first field displays the number of days the job has not been run.
            - The second field displays the time after which the job has to be run (after reboot).
            - The third field displays the job identifier.
            - The fourth field displays the job to be run by the anacron utility.

### Common Scheduled Jobs
- `tmpreader`
    - The tmpreaper command can be run as a daily cron job that is used to delete files, such as the files in the /tmp directory, which have not been accessed for some time and are utilizing disk space. 
    - The syntax of the tmpreaper command is `tmpreaper [options] {hours}`.
- `logrotate`
    - The logrotate command is run as a daily cron job that is used to compress, delete, or mail log files. 
        - It may be configured to run on a weekly or monthly basis depending on the log size.
    - The configuration file for logrotate is */etc/logrotate.conf*.
- `logwatch`
    - The logwatch utility is run as a daily cron job that is used to monitor logs. 
        - It is fully customizable via the /etc/logwatch/conf/logwatch.conf file. 
    - The utility searches logs and reports suspicious messages, and enables you to set detail levels for reports. 
        - 10, 5, and 0, correspond to high, medium, and low level details, respectively.
    - The logwatch command may not be installed by default. 
        - In that case, you can use the command `sudo apt install logwatch` to install it.

## 4-6. System Time
- System time is the time maintained by a computer’s internal clock.
    - It is coordinated universal time with a resolution in milliseconds. 
- Clock drift is the gradual variation in time between the hardware clock and the system clock. 
    - The hardware clock is also known as the Real Time Clock (RTC). 
        - It keeps track of the time when the system is turned off and not when the system is on. 
    - The hardware and system clocks will drift at different rates, apart from each other and also away from the real time.
- A leap second is the adjustment made to UTC, to account for the irregularity in the earth’s rotation. 
- In Linux, you can use the `tzselect` command to access a menu driven utility that will allow you to select the time zone for your system according to your geographic location. 
    - You need to define an environment variable, TZ, in the /etc/profile file to set the time zone for your system.
    - /etc/timezone file is available with the Debian and Ubuntu distributions of Linux and is used to store the time zone information of the system. 
        - This file typically consists of a single line entry based on the continent/time zone format, such as `America/New_York`.
    - /usr/share/zoneinfo/ directory contains time zone details relating to different countries. 
        - When you export a time zone, details of that time zone are obtained from this directory.
    - The current time details of the system are stored in the /etc/localtime directory. 
        - If you make any change to your system time, the /etc/localtime directory gets updated.
- Epoch Time Format
    - Epoch Time, also known as Unix Time, is a system for describing a point in time based on the number of seconds that have passed since the Unix epoch, or 00:00:00 UTC on 1 January 1970. 
        - Leap seconds are ignored, and every day is treated as if it contains exactly 86400 seconds.
- Network Time Protocol (NTP)
    - NTP is a standard Internet protocol for synchronizing the internal system clock with the true time or the average time on a number of high accuracy clocks around the world.
        - The pool.ntp.org is a collection of servers on the Internet that provides accurate time to the Linux systems using NTP.
    - NTP is used for transmitting and receiving time on Transmission Control Protocol/Internet Protocol (TCP/IP) networks. 
        - NTP is also used to set the clock of one computer to match that of another and synchronize it with the network clock.
    - A drift file is a file found in the /etc/ntp directory. 
        - The NTP drift file is used by the ntpd daemon to reset the time when the system is restarted. 
        - The drift file synchronizes the system clock and the clock drift to display the time from the NTP server.
    - The ntp.conf file found in the /etc directory contains configuration options for the NTP server. 
        - The file contains settings for all hosts on local and public servers. 
        - The ntpd daemon reads the ntp.conf file for synchronization settings and then connects to the NTP server.

## 4-7. System Logs
- System logs are records of system activities that are tracked and maintained by the `syslogd` utility. 
    - The syslogd utility runs as a daemon. 
    - System logs are usually started at boot. 
    - System log messages include the date, the process that delivered the message, and the actual message.
- Logging service
    - A logging service is a daemon that is used to track logs or errors that are generated in a system. 
        - Log messages are stored in a separate file called the log file, which is stored in the /var/log directory. 
            - The main log file is /var/log/messages. 
            - In addition to this log file, some services create their own log files.
- Automated log analysis
    - During maintenance sessions, instead of manually parsing large log files, you can automate the log analysis by writing Perl or Bash scripts.
        - e.g. You can write a Perl script to automatically parse a mail log file and inform you about the rejected email messages.
    - Ensure that you make a crontab entry for the script.
- Automatic Rotation
    - Automatic rotation is a system of regular rotation of logs to maintain a minimum log file size.
    - The `logrotate` utility is used to perform automatic rotation. 
        - When executed, logrotate adds a .1 to the end of the file name of the current version of the log files. 
            - Previously rotated files are suffixed with .2, .3, and so on. 
            - Older logs have larger numbers at the end of their file names. 
    - Using automatic rotation, all copies of a file, with dates from when they were created, will be stored. 
    - Log files can be rotated on a daily, weekly, or monthly basis. 
    - Automatic rotation saves disk space because older log files are pushed out when a size limit is reached. 
        - This is important because a computer that runs out of free space on the hard drive will crash.
        - Automatic rotation prevents logs from using up all the available free space.

### Centralized Logging
- Central network log server 
    - A server that is used to implement centralized logging services
    - This server receives all syslog messages from Linux or Windows servers and from network devices such as routers, switches, firewalls, and workstations, across a network. 
        - The server logs data mining and online alerts, performs log analysis, and generates reports. 
    - Centralized logging allows computers to send their logs to a central location. 
        - This means the logs will be available even if the disk or computer where they were created crashes.
- `syslogd`
    - The syslogd utility tracks remote and local system logs. 
        - Logs are characterized by their hostname and program field. 
        - The settings for syslogd are configured using the /etc/syslog.conf file.
    - The syntax of the syslogd utility is `syslogd [options]`.
        - Note: The syslogd may not be installed by default. You can use the `sudo apt install inetutils-syslogd` to install it.
    - The */etc/syslog.conf* file controls the location where the syslogd information is recorded. 
        - This file consists of two columns. 
            - The first column lists the facilities and severities of the messages. 
            - The second column lists the files the messages should be logged to. 
            - By default, most messages are stored in the */var/log/messages* file.
        - Some applications maintain their own log files and directories independent of the syslog.conf file.
            - e.g. 
                - /var/log/syslog 
                    - Stores the system log file, which contains information about the system.
                - /var/log/maillog
                    - Stores mail messages. 
                - /var/log/samba 
                    - Stores Samba messages. 
                - /var/log/mrtg
                    - Stores Multi Router Traffic Grapher (MRTG) messages.
                    - Multi Router Traffic Grapher (MRTG) is free software, licensed under GNU General Public License (GPL), that is used to monitor and measure the traffic load on network links. 
                        - The traffic load on a network is represented in graphical form.
                - /var/log/httpd
                    - Stores Apache web server messages. 
- `logger`
    - The logger is the command interface to the system log module. 
    - The logger has options that allow you to customize the content that needs to be logged.
- `rsyslog`
    - The rsyslog utility tracks, forwards, and stores messages via the syslog protocol and local system logs, and is a more modern alternative to the older syslogd utility. 
        - Logs are characterized by their hostname and program field. 
        - The settings for rsyslog are configured using the /etc/rsyslog.conf file as well as multiple configuration files in the /etc/rsyslogd configuration directory.
    - The syntax of the rsyslog utility is `rsyslog [options]`.
        - Note: The rsyslog may not be installed by default. You can use the `sudo apt install rsyslog` to install it.
- `journalctl`
    - The journalctl utility is a component of systemd that manages and views log files created by the journal component of systemd. 
        - It may be used on its own but is often used in conjunction with a traditional syslog daemon such as syslogd or rsyslog. 
        - Log information is collected and stored via the systemdjournaldservice, and may be viewed with the journalctl utility. 
        - The settings for journald are configured in the /etc/systemd/journald.conf file.
    - The syntax of the journalctl utility is `journalctl [options]`.
    - In its default configuration, the Systemd Journal only stores logs in memory, and logs are cleared on each system reboot. 
        - The Systemd Journal logs may be persisted after a reboot by creating the directory */var/log/journal*. 
            - Systemd is configured to automatically persist logs into this directory if it exists.

### Log File Analysis
- The process of examining messages generated by logging daemons in log files is referred to as log file analysis. 
    - Log messages are created in a format that is specific to an application or a vendor and are arranged in chronological order. 
- During analysis, the format of log messages from different logging sources, such as operating systems, networks, and databases, is compared with a preset format. 
    - Also, log messages are categorized for each user with respect to the application, system, or system configuration accessed, to ensure user authentication.
- `lastlog`
    - The lastlog command utilizes data from the */var/log/lastlog* file to display the latest login details of all users. 
        - In addition to the login name, date, and time, it displays the terminal from where a user last logged in. 
    - The lastlog command is used by administrators to view user accounts that have never been used.

## 4-8. SELinux
- Security-Enhanced Linux (SELinux) is the default security enhancement feature provided with CentOS and Red Hat Enterprise Linux, and is available on other distributions. 
    - It was developed by the U.S. National Security Agency while implementing various security policies on Linux operating systems. 
    - It provides additional filesystem and network security so that unauthorized processes cannot access or tamper with data, bypass security mechanisms, violate security policies, or execute untrustworthy programs.
    - It enforces Mandatory Access Controls (MACs) on processes and resources and allows information to be classified and protected based on its confidentiality and integrity requirements.
        - This confines the damage caused to information by malicious applications.
    - Note: You can use the `sudo apt install policycoreutilsselinux-utils selinux-basics` command to install SELinux on Ubuntu.
- SELinux modes
    - Disabled 
	    - In this mode, SELinux is turned off. So, MAC will not be implemented and the default DAC method will be prevalent. 
    - Enforcing 
	    - In this mode, all the security policies are enforced. Therefore, processes cannot violate the security policies. 
    - Permissive 
	    - In this mode, SELinux is enabled, but the security policies are not enforced. So, processes can bypass the security policies. 
        - However, when a security violation occurs, it is logged and a warning message is sent to the user. 
- Security context
    - Security context is the collection of all security settings pertaining to processes, files, and directories. 
    - Security context consists of three elements,
        - User
        - Role
        - Type
    - Based on the security context attributes, SELinux decides how subjects access objects on the system.
    - Note: You activate SELinux using the `sudoselinux-activate` command.
- Access control
    - Discretionary Access Control (DAC) 
	    - In DAC, the system checks the resources over which a user has access rights. 
            - The rights of the user are identified using the authentication information such as user identity and password. 
        - Under DAC, there are two types of permissions.
            - Administrator permissions 
            - Non-administrator permissions
        - For application programs to run, administrator access has to be provided. 
        - Administrator access provides full discretion over the filesystem and exposes it to security threats. 
            - e.g. A malicious program or process started by a user having administrator access can damage data in a filesystem. 
        - DAC is the standard security strategy in Linux in which the User/Group/Other file permissions are managed.
    - Mandatory Access Control (MAC) 
	    - In MAC, the system checks the resources over which a user does not have access rights. 
            - MAC is applied through SELinux. 
            - The rights of the user are identified using authentication such as the SELinux user identity, role, and type of access. 
        - MAC is the opposite of DAC, where permissions have to be defined for all processes (known as subjects) as to how they access resources (known as objects) such as files, directories, devices, memory resources, and other processes. 
            - An action is an operation, such as append, write, read, create, execute, and rename, that a subject can perform on an object. 
                - This is implemented using security policies that control the interaction between the processes and the objects.
                - e.g. When a subject tries to access an object, the security policy is checked to verify whether the subject is authorized to access the object before granting the access.
- Security policies
    - A security policy defines access parameters for every process and resource on the system. 
    - Configuration files and policy source files located in the */etc/selinux* directory can be configured by the root user.
    - Types
        - Targeted 
	        - According to the targeted policy, except the targeted subjects and objects, all other subjects and objects will run in an unconfined environment. 
            - The untargeted subjects and objects will operate on the DAC method and the targeted ones will operate on the MAC method. 
            - A targeted policy is enabled by default. 
        - Strict 
	        - A strict policy is the opposite of a targeted policy, where every subject and object of the system is enforced to operate on the MAC method.