function doProcess() {
	var folderPath = args['dir'];
	var ffe_user = args['user'];
	var ffe_pass = args['pass'] == null ? 'ffe_pass' : args['pass'];
	var roles = args['roles'];

	var ffeFolder = getFolder(folderPath);
	var userRoles = getUserRoles(roles);

	var ffeUser = people.getPerson(ffe_user);
	if (ffeUser == null) {
		ffeUser = people.createPerson(ffe_user, 'FFE', 'User', 'test@test.com', ffe_pass, true);
	}

	for (userRole in userRoles) {
		ffeFolder.setPermission(userRoles[userRole], ffe_user);
	}

	model.newuser = ffeUser;
	model.dir = ffeFolder;
}

function getFolder(dirPath) {
	folder = companyhome.childByNamePath(dirPath);
	if (folder == null) {
		folder = getLeafFolder(companyhome, dirPath.split('/'), 0);
	}
	return folder;
}

function getLeafFolder(parentDir, dirs, index) {
	if (dirs == null || dirs.length == 0 || index == dirs.length) {
		return parentDir;
	} else {
		dir = parentDir.childByNamePath(dirs[index]);
		if (dir == null) {
			dir = parentDir.createFolder(dirs[index]);
		}
		return getLeafFolder(dir, dirs, ++index);
	}
}

function getUserRoles(roles) {
	var userRoles = [];
	var allUsrRolesStr = 'Editor,Contributor,Coordinator,Consumer,Collaborator';
	
	if (roles == null || roles.length == 0) {
		userRoles = allUsrRolesStr.split(',');
	} else {
		var rolesArr = roles.split(',');
		for (role in rolesArr) {
			if (allUsrRolesStr.indexOf(rolesArr[role]) != -1) {
				userRoles.push(rolesArr[role]);
			}
		}
	}
	
	return userRoles;
}

doProcess();