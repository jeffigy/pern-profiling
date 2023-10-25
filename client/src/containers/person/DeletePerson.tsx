import React from 'react';

type DeletePersonProps = {
    
};

const DeletePerson:React.FC<DeletePersonProps> = () => {
    
    return  <Dialog>
    <DialogTrigger asChild>
      <Button>Delete</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</div>
}
export default DeletePerson;